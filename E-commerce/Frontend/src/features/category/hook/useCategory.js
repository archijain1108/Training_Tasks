import { getCategories, getSubcategory, createCategory, createSubcategory, deleteSubcategory } from '../services/category.api.js'
import { setCategories, setSubcategories, addCategory } from '../state/category.slice';
import { useDispatch } from 'react-redux';

export const useCategory = () => {

    const dispatch = useDispatch()


    const handleGetCategories = async () => {
        try {
            const data = await getCategories();
            dispatch(setCategories(data.categories))

            return {
                success: true,
                message: data.message
            }
        }
        catch (err) {
            return {
                success: false,
                message: err?.response?.data?.message
            }

        }

    }

    const handleGetSubcategories = async () => {
        try {
            const data = await getSubcategory();
            dispatch(setSubcategories(data.setSubcategories))

            return {
                success: true,
                message: data.message
            }
        }
        catch (err) {
            return {
                success: false,
                message: err?.response?.data?.message
            }
        }
    }


    const handleCreateCategory = async (categoryName) => {
        try {
            const data = await createCategory({ categoryName })
            dispatch(addCategory(data.category))

            return {
                success: true,
                message: data.message
            }
        }
        catch (err) {
            return {
                success: false,
                message: err?.response?.data?.message
            }
        }
    }



    
    const handleCreateSubcategory = async (subcategory) => {
        try {
            const data = await createSubcategory({ subcategory })
            return {
                success: true,
                message: data.message
            }
        }
        catch (err) {
            return {
                success: false,
                message: err?.response?.data?.message
            }
        }
    }

    const handleDeleteSubcategory = async (subcategoryId) => {
        try {
            const data = await deleteSubcategory({ subcategoryId })

            return {
                success : true ,
                message : data.message
            }
        }
        catch(err){
            return {
                success : false,
                message : err?.response?.data?.message
            }
        }
    }







    return {
        handleGetCategories,
        handleGetSubcategories,
        handleCreateCategory,
        handleCreateSubcategory,
        handleDeleteSubcategory
        
    }





}

