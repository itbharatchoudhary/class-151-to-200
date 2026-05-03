import axios from "axios";


const cartApiInstance = axios.create({
    baseURL: "/api/cart",
    withCredentials: true
})

export const addItem = async ({ productId, variantId }) => {
    const url = variantId ? `/${productId}/${variantId}` : `/${productId}`
    const response = await cartApiInstance.post(url, { quantity: 1 })
    return response.data
}

export const getCartItems = async () => {
    const response = await cartApiInstance.get(`/`)
    return response.data
}


export const incrementCartItemApi = async ({ productId, variantId }) => {
    const url = variantId ? `/quantity/increment/${productId}/${variantId}` : `/quantity/increment/${productId}`
    const response = await cartApiInstance.patch(url)
    return response.data
}

export const decrementCartItemApi = async ({ productId, variantId }) => {
    const url = variantId ? `/quantity/decrement/${productId}/${variantId}` : `/quantity/decrement/${productId}`
    const response = await cartApiInstance.patch(url)
    return response.data
}

export const removeFromCartApi = async ({ productId, variantId }) => {
    const url = variantId ? `/remove/${productId}/${variantId}` : `/remove/${productId}`
    const response = await cartApiInstance.delete(url)
    return response.data
}