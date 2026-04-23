import express from 'express';
import cartModel from '../model/cart.model.js';
import { AuthenticateUser } from '../middleware/auth.middleware.js';
import { addToCart ,getCart, incrementCartItemQuantity, decrementCartItemQuantity, removeFromCart } from '../controllers/cart.controller.js';
import { validateAddToCart, validateIncrementCartItemQuantity } from '../validator/cart.validator.js';


const router = express.Router();

/**
 * @route POST /cart/add/:productId/:variantId
 * @desc Add a product to the cart
 * @access Private
 * @arguments productId - ID of the product to add
 * @arguments variantId - ID of the product variant to add (optional)
 * 
 */
router.post('/:productId', AuthenticateUser, validateAddToCart, addToCart);
router.post('/:productId/:variantId', AuthenticateUser, validateAddToCart, addToCart);

/**
 * @route GET /cart
 * @desc Get the user's cart
 * @access Private
 */
router.get("/", AuthenticateUser, getCart)


/**
 * @route PATCH /api/cart/quantity/increment/:productId/:variantId
 * @desc Increment item quantity in cart by one
 * @access Private
 * @argument productId - ID of the product to update
 * @argument variantId - ID of the variant to update
 */
router.patch("/quantity/increment/:productId", AuthenticateUser, validateIncrementCartItemQuantity, incrementCartItemQuantity)
router.patch("/quantity/increment/:productId/:variantId", AuthenticateUser, validateIncrementCartItemQuantity, incrementCartItemQuantity)

router.patch("/quantity/decrement/:productId", AuthenticateUser, decrementCartItemQuantity)
router.patch("/quantity/decrement/:productId/:variantId", AuthenticateUser, decrementCartItemQuantity)

router.delete("/remove/:productId", AuthenticateUser, removeFromCart)
router.delete("/remove/:productId/:variantId", AuthenticateUser, removeFromCart)

export default router;