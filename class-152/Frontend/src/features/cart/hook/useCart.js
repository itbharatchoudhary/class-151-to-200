import { addItem } from "../state/cart.slice";
import { useDispatch } from "react-redux";
import { addItem as addItemToCart } from "../service/cart.api";


export const useCart = () => {

    const dispatch = useDispatch();

    async function handleAddItem({ productId, variantId }) {
        const data = await addItemToCart({ productId, variantId })
       
        return data;
    }

    return { handleAddItem }
}