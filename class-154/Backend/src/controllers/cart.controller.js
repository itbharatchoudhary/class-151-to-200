import cartModel from "../model/cart.model.js";
import ProductModel from "../model/product.model.js";
import { stockOfVariant } from "../dao/product.dao.js";

export const addToCart = async (req, res) => {

    const { productId, variantId } = req.params;
    const { quantity = 1 } = req.body;

    let product;
    if (variantId) {
        product = await ProductModel.findOne({ _id: productId, "variants._id": variantId })
    } else {
        product = await ProductModel.findById(productId)
    }

    if (!product) {
        return res.status(404).json({
            message: "Product or variant not found",
            success: false
        })
    }

    let stock = null;
    if (variantId) {
        stock = await stockOfVariant(productId, variantId)
    } else {
        stock = product.totalStock || 0
    }

    const cart = (await cartModel.findOne({ user: req.user._id })) || (await cartModel.create({ user: req.user._id }))

    const isProductAlreadyInCart = cart.items.some(item => 
        item.product.toString() === productId && 
        (item.variant ? item.variant.toString() === variantId : !variantId)
    )

    if (isProductAlreadyInCart) {
        const itemInCart = cart.items.find(item => 
            item.product.toString() === productId && 
            (item.variant ? item.variant.toString() === variantId : !variantId)
        )
        const quantityInCart = itemInCart.quantity

        if (stock !== null && quantityInCart + quantity > stock) {
            return res.status(400).json({
                message: "Cannot add more items to cart, stock limit reached",
                success: false
            })
        }

        await cartModel.findOneAndUpdate(
            { 
                user: req.user._id, 
                "items.product": productId, 
                "items.variant": variantId || null 
            },
            { $inc: { "items.$.quantity": quantity } },
            { new: true }
        )

        return res.status(200).json({
            message: "Cart updated successfully",
            success: true
        })
    }

    if (quantity > stock) {
        return res.status(400).json({
            message: "Cannot add items to cart, stock limit reached",
            success: false
        })
    }

    cart.items.push({ product: productId, variant: variantId, quantity , price: product.price })

    await cart.save()

    res.status(200).json({
        message: "Item added to cart successfully",
        success: true
    })

}

export const getCart = async(req,res) => {

    const user = req.user

    let cart = await cartModel.findOne({ user: user._id }).populate("items.product")

    if(!cart){
        cart = await cartModel.create({ user: user._id })
    }

    res.status(200).json({
        message: "Cart retrieved successfully",
        success: true,
        cart
    })

}

export const incrementCartItemQuantity = async (req, res) => {
    try {
        const { productId, variantId } = req.params;

        let product;
        if (variantId) {
            product = await ProductModel.findOne({ _id: productId, "variants._id": variantId });
        } else {
            product = await ProductModel.findById(productId);
        }

        if (!product) {
            return res.status(404).json({
                message: "Product or variant not found",
                success: false
            });
        }

        const cart = await cartModel.findOne({ user: req.user._id });

        if (!cart) {
            return res.status(404).json({
                message: "Cart not found",
                success: false
            });
        }

        let stock = null;
        if (variantId) {
            stock = await stockOfVariant(productId, variantId);
        } else {
            stock = product.totalStock || 0;
        }

        const itemInCart = cart.items.find(item => 
            item.product.toString() === productId && 
            (item.variant ? item.variant.toString() === variantId : !variantId)
        );

        if (!itemInCart) {
            return res.status(404).json({
                message: "Item not found in cart",
                success: false
            });
        }

        const quantityInCart = itemInCart.quantity;

        if (stock !== null && quantityInCart + 1 > stock) {
            return res.status(400).json({
                message: `Only ${stock} items left in stock. and you already have ${quantityInCart} items in your cart`,
                success: false
            });
        }

        await cartModel.findOneAndUpdate(
            { 
                user: req.user._id, 
                "items.product": productId, 
                "items.variant": variantId || null 
            },
            { $inc: { "items.$.quantity": 1 } },
            { new: true }
        );

        return res.status(200).json({
            message: "Cart item quantity incremented successfully",
            success: true
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

export const decrementCartItemQuantity = async (req, res) => {
    try {
        const { productId, variantId } = req.params;

        const cart = await cartModel.findOne({ user: req.user._id });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found", success: false });
        }

        const itemInCart = cart.items.find(item => 
            item.product.toString() === productId && 
            (item.variant ? item.variant.toString() === variantId : !variantId)
        );

        if (!itemInCart) {
            return res.status(404).json({ message: "Item not found in cart", success: false });
        }

        if (itemInCart.quantity <= 1) {
            // Remove item if quantity becomes 0
            cart.items = cart.items.filter(item => 
                !(item.product.toString() === productId && 
                  (item.variant ? item.variant.toString() === variantId : !variantId))
            );
            await cart.save();
            return res.status(200).json({ message: "Item removed from cart", success: true });
        }

        await cartModel.findOneAndUpdate(
            { 
                user: req.user._id, 
                "items.product": productId, 
                "items.variant": variantId || null 
            },
            { $inc: { "items.$.quantity": -1 } },
            { new: true }
        );

        return res.status(200).json({ message: "Cart item quantity decremented successfully", success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}

export const removeFromCart = async (req, res) => {
    try {
        const { productId, variantId } = req.params;

        const result = await cartModel.findOneAndUpdate(
            { user: req.user._id },
            { 
                $pull: { 
                    items: { 
                        product: productId, 
                        variant: variantId || null 
                    } 
                } 
            },
            { new: true }
        );

        if (!result) {
            return res.status(404).json({ message: "Cart not found", success: false });
        }

        res.status(200).json({ message: "Item removed from cart", success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}