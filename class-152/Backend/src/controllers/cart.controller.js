import cartModel from "../model/cart.model.js";
import ProductModel from "../model/product.model.js";
import { stockOfVariant } from "../dao/product.dao.js";

export const addToCart = async (req, res) => {

    const { productId, variantId } = req.params;
    const { quantity = 1 } = req.body;

    const product = await ProductModel.findOne({ _id: productId, "variants._id": variantId })

    if (!product) {
        return res.status(404).json({
            message: "Product or variant not found",
            success: false
        })
    }

    const stock = await stockOfVariant(productId, variantId)

    const cart = (await cartModel.findOne({ user: req.user._id })) || (await cartModel.create({ user: req.user._id }))

    const isProductAlreadyInCart = cart.items.some(item => item.product.toString() === productId && item.variant.toString() === variantId)

    if (isProductAlreadyInCart) {
        const quantityInCart = cart.items.find(item => item.product.toString() === productId && item.variant.toString() === variantId).quantity

        if (quantityInCart + quantity > stock) {
            return res.status(400).json({
                message: "Cannot add more items to cart, stock limit reached",
                success: false
            })
        }

        await cartModel.findOneAndUpdate(
            { user: req.user._id, "items.product": productId, "items.variant": variantId },
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

    let cart = await cartModel.findOne({ user: user._id }).populate("items.product").populate("items.variant")

    if(!cart){
        cart = await cartModel.create({ user: user._id })
    }

    res.status(200).json({
        message: "Cart retrieved successfully",
        success: true,
        cart
    })

}