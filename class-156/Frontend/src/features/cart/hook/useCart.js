import { addItem, getCartItems, incrementCartItemApi, decrementCartItemApi, removeFromCartApi, createCartOrder, verifyCartOrder } from "../service/cart.api";
import { useDispatch } from "react-redux";
import { setCart, incrementCartItem, decrementCartItem, removeItem } from "../state/cart.slice";

export const useCart = () => {

    const dispatch = useDispatch();

    async function handleAddItem({ productId, variantId }) {
        try {
            const data = await addItem({ productId, variantId });
            await handleGetCart();
            return data;
        } catch (error) {
            const message = error.response?.data?.message || "Failed to add item to cart";
            throw new Error(message);
        }
    }

    async function handleGetCart() {
        try {
            const data = await getCartItems();
            dispatch(setCart(data.cart));
            return data;
        } catch (error) {
            console.error("Failed to fetch cart", error);
        }
    }

    async function handleIncrementCartItem({ productId, variantId }) {
        try {
            const data = await incrementCartItemApi({ productId, variantId });
            dispatch(incrementCartItem({ productId, variantId }));
            return data;
        } catch (error) {
            const message = error.response?.data?.message || "Failed to increment quantity";
            throw new Error(message);
        }
    }

    async function handleDecrementCartItem({ productId, variantId }) {
        try {
            const data = await decrementCartItemApi({ productId, variantId });
            dispatch(decrementCartItem({ productId, variantId }));
            return data;
        } catch (error) {
            const message = error.response?.data?.message || "Failed to decrement quantity";
            throw new Error(message);
        }
    }

    async function handleRemoveFromCart({ productId, variantId }) {
        try {
            const data = await removeFromCartApi({ productId, variantId });
            dispatch(removeItem({ productId, variantId }));
            return data;
        } catch (error) {
            const message = error.response?.data?.message || "Failed to remove item";
            throw new Error(message);
        }
    }

    async function handleCreateCartOrder() {
        const data = await createCartOrder();
        return data.order;
    }

    async function handleVerifyCartOrder(razorpay_order_id, razorpay_payment_id, razorpay_signature) {
        const data = await verifyCartOrder(razorpay_order_id, razorpay_payment_id, razorpay_signature);
        return data.success;
    }

    return { handleAddItem, handleGetCart, handleIncrementCartItem, handleDecrementCartItem, handleRemoveFromCart, handleCreateCartOrder, handleVerifyCartOrder };

}