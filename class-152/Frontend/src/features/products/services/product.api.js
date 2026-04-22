import axios from "axios";


const productsApiInstance = axios.create({
    baseURL: "/api/products",
    withCredentials: true
})

// Add a request interceptor to include the token in headers
export const createProduct = async (formData) => {

    const response = await productsApiInstance.post("/", formData);
    return response.data;
}

// Get products for the authenticated seller
export const getSellerProducts = async () => {
    const response = await productsApiInstance.get("/seller");
    return response.data;
}

export const getAllProducts = async () => {
    const response = await productsApiInstance.get("/");
    return response.data;
}

export const getProductDetails = async (id) => {
    const response = await productsApiInstance.get(`/${id}`);
    return response.data;
}

export const createProductVariant = async (id, newProductVariant) => {
    console.log(newProductVariant);

    const formData = new FormData();

    // images
    newProductVariant.images.forEach((image) => {
        formData.append("images", image.file);
    });

    // other fields
    formData.append("stock", newProductVariant.stock);
    formData.append("priceAmount", newProductVariant.price.amount);
    formData.append("priceCurrency", newProductVariant.price.currency);
    formData.append("attributes", JSON.stringify(newProductVariant.attributes));

    const response = await productsApiInstance.post(
        `/${id}/variants`,
        formData
    );

    return response.data;
};