import express from 'express';
import cartModel from '../model/cart.model.js';
import { AuthenticateUser } from '../middleware/auth.middleware.js';
import { validateAddToCart } from '../validator/cart.validator.js';
import { addToCart ,getCart } from '../controllers/cart.controller.js';
import { get } from 'mongoose';


const router = express.Router();

/**
 * @route POST /cart/add/:productId/:variantId
 * @desc Add a product to the cart
 * @access Private
 * @arguments productId - ID of the product to add
 * @arguments variantId - ID of the product variant to add (optional)
 * 
 */
router.post('/', AuthenticateUser ,validateAddToCart, addToCart)

/**
 * @route GET /cart
 * @desc Get the user's cart
 * @access Private
 */
router.get("/", AuthenticateUser, getCart)

export default router;