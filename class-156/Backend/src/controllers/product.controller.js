import ProductModel from "../model/product.model.js";
import { uploadFile } from "../services/storage.service.js";


/**
 * @desc Create a new product
 * @route POST /products
 * @access Private (Seller only)
 * @body { title, description, priceAmount, priceCurrency, images }
 */


export const createProduct = async (req, res) => {
    const { title, description, priceAmount, priceCurrency } = req.body;
    const seller = req.user;

    const images = await Promise.all(req.files.map(async (file) => {
        return await uploadFile(file.buffer, file.originalname);
    }));

    const product = await ProductModel.create({
        title,
        description,
        price: {
            amount: priceAmount,
            currency: priceCurrency || "INR"
        },
        images,
        seller: seller._id
    })

    return res.status(201).json({
        message: "Product created successfully",
        success: true,
        product
    })
}


/**
 * @desc Get all products for the authenticated seller
 * @route GET /products/seller  
 * @access Private (Seller only)
 */


export const getSellerProducts = async (req, res) => {
    const seller = req.user;

    const products = await ProductModel.find({ seller: seller._id });

    return res.status(200).json({
        message: "Products retrieved successfully",
        success: true,
        products
    })
}

/**
 * @desc Get all products
 * @route GET /products
 * @access Public
 */
export const getAllProducts = async (req, res) => {
    const products = await ProductModel.find()

    return res.status(200).json({
        message: "Products retrieved successfully",
        success: true,
        products
    })

}

/**
 * @desc Get product details by ID
 * @route GET /products/:id 
 * @access Public
 * @params { id } - Product ID
 */
export const getProductDetails = async (req, res) => {
    const { id } = req.params;

    const product = await ProductModel.findById(id)

    if (!product) {
        return res.status(404).json({
            message: "Product not found",
            success: false
        })
    }

    return res.status(200).json({
        message: "Product details retrieved successfully",
        success: true,
        product
    })
}

export async function createProductVariant(req, res) {
    try {
        const productId = req.params.id;

        const product = await ProductModel.findOne({
            _id: productId,
            seller: req.user._id
        });

        if (!product) {
            return res.status(404).json({
                message: "Product not found",
                success: false
            });
        }

        const files = req.files;
        const images = [];

        if (files && files.length !== 0) {
            const uploadedImages = await Promise.all(
                files.map(async (file) => {
                    return await uploadFile(file.buffer, file.originalname);
                })
            );
            images.push(...uploadedImages);
        }

        const price = req.body.priceAmount;
        const stock = Number(req.body.stock);
        const attributes = JSON.parse(req.body.attributes || "{}");

        product.variants.push({
            images,
            price: {
                amount: Number(price) || product.price.amount,
                currency: req.body.priceCurrency || product.price.currency
            },
            stock,
            attributes
        });

        await product.save();

        return res.status(200).json({
            message: "Product variant added successfully",
            success: true,
            product
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: error.message,
            success: false
        });
    }
}