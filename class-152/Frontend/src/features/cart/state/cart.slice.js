import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],

    },
    reducers: {
        setItems: (state, action) => {
            state.items = action.payload;
        },
        addItem: (state, action) => {
            state.items.push(action.payload);
        },
        incrementCartItem: (state, action) => {
            const { productId, variantId } = action.payload
            state.items = state.items.map(item => {
                const isMatch = item.product._id === productId && 
                               (variantId ? item.variant === variantId : !item.variant);
                if (isMatch) {
                    return { ...item, quantity: item.quantity + 1 }
                }
                return item
            })
        },
        decrementCartItem: (state, action) => {
            const { productId, variantId } = action.payload
            state.items = state.items.map(item => {
                const isMatch = item.product._id === productId && 
                               (variantId ? item.variant === variantId : !item.variant);
                if (isMatch) {
                    return { ...item, quantity: Math.max(0, item.quantity - 1) }
                }
                return item
            }).filter(item => item.quantity > 0)
        },
        removeItem: (state, action) => {
            const { productId, variantId } = action.payload
            state.items = state.items.filter(item => 
                !(item.product._id === productId && 
                  (variantId ? item.variant === variantId : !item.variant))
            )
        }
    }
});

export const { setItems, addItem, incrementCartItem, decrementCartItem, removeItem } = cartSlice.actions;

export default cartSlice.reducer;