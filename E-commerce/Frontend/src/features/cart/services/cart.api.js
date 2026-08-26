import axios from "axios";


const cartApi = axios.create({
    baseURL : 'http://localhost:8080/api/cart',
    withCredentials : true 
})


export async function getCart() {
    const response = await cartApi.get('/')
    return response.data
}


export async function addToCart({productId , variantId , quantity }) {
    const response = await cartApi.post(`/item/${productId}/${variantId}` , {quantity : quantity ?? 1})
    return response.data 
    
}

export async function increaseQuantity ({itemId}) {
    const response = await cartApi.patch(`/item/${itemId}/increase`)
    return response.data
    
}

export async function decreaseQuantity({itemId}) {
    const response = await cartApi.patch(`/item/${itemId}/decrease`)
    return response.data
    
}

export async function removeItem({itemId}) {
    const response = await cartApi.patch(`/item/${itemId}`)
    return response.data
}