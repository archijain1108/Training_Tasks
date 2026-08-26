import axios from "axios";


const categoryApi = axios.create ({
    baseURL : 'http://localhost:8080/api/category',
    withCredentials : true 
})




export const getCategories = async () => {
    const response = await categoryApi.get('/')
    return response.data    
}

export const getSubcategory = async ({categoryId}) => {
  const response = await categoryApi.get(`/${categoryId}/subcategory`)
  return response.data
}



export const createCategory = async ({categoryName}) => {
    const response = await categoryApi.post('/' , {categoryName});
    return response.data

}


export const createSubcategory = async ({categoryId , subcategory}) => {
    const response = await categoryApi.post(`/${categoryId}/subcategory` , {subcategory})
    return response.data
}


export const deleteSubcategory = async ({subcategoryId}) => {
    const response = await categoryApi.delete(`/subcategory/${subcategoryId}`)
    return response.data
}


