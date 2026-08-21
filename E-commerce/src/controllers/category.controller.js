import db from '../models/index.cjs'
import subcategory from '../models/subcategory.cjs';

const {Category , Subcategory} = db ;



export const createCategory = async (req , res , next) =>{

    try {
        const adminId = req.user.id;
        const {categoryName} = req.body

        const category = await Category.create({
            adminId,
            name : categoryName,
        })


        res.status(200)
        .json({
            message : "category created successfully",
            category
        })

    }catch(err) {
        next(err)

    }

}



export const createSubCategory = async (req , res , next) => {

    try{
        const categoryId = req.params.categoryId
        const {categoryName} = req.body

        const newsubcategory = await  Subcategory.create({
            categoryId,
            name : categoryName,
        })
        

        res.status(200)
        .json({
            message : 'subcategory created successfully',
            newsubcategory
        })
    }
    catch(err){
        next(err)
    }
    

}

export const deleteSubcategory = async (req , res , next) => {
    try {
        const {categoryId} = req.params

        const category = await Subcategory.findByPk(categoryId)

        if(! category){
            return res.status(404)
            .json({
                message : 'category no exists'
            })
        }

        return res.status(200)
        .json({
            message : 'category deleted successfully',
        })

    }

    catch(err){
        next(err)
    }
}