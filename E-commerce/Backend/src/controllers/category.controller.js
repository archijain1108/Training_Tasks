import { where } from 'sequelize';
import db from '../models/index.js'

const { Category, Subcategory } = db;



export const createCategory = async (req, res, next) => {

    try {
        const { categoryName } = req.body

        const category = await Category.create({
            name: categoryName,
        })


        res.status(200)
            .json({
                message: "category created successfully",
                category
            })

    } catch (err) {
        next(err)

    }

}



export const createSubCategory = async (req, res, next) => {

    try {
        const categoryId = req.params.categoryId
        const { subcategory } = req.body

        const alreadyExists = await Subcategory.findOne({
            where : { name : subcategory}
        })

        if(alreadyExists){
            return res.status(400)
            .json({
                message : 'subcategory already exists'
            })
        }

        const newsubcategory = await Subcategory.create({
            categoryId,
            name: subcategory,
        })


        res.status(200)
            .json({
                message: 'subcategory created successfully',
                newsubcategory
            })
    }
    catch (err) {
        next(err)
    }  


}

export const deleteSubcategory = async (req, res, next) => {
    try {
        const { subcategoryId } = req.params

        const subcategory= await Subcategory.findByPk(subcategoryId)

        if (! subcategory) {
            return res.status(404)
                .json({
                    message: 'subcategory no exists'
                })
        }

        await subcategory.destroy();

        return res.status(200)
            .json({
                message: 'subcategory deleted successfully',
            })

    }

    catch (err) {
        next(err)
    }
}


export const getAllCategories = async (req , res , next) => {
    try {
        const categories = await Category.findAll()

        return res.status(200)
        .json({
            message : 'all categories fetch successfully',
            categories : categories ?? []
        })
    }
    catch(err){
        next(err)
    }
}


export const getSubcategories = async (req , res , next) => {
  try{
    const categoryId = req.params.categoryId

    const subcategories = await Subcategory.findAll({
       where : {categoryId}
    });

    if(!subcategories){
        return res.status(404)
        .json({
            message : 'no subcategory found'
        })
    }

    res.status(200).
    json({
        message : 'subcategories fetched successfully',
        subcategories 
    })
  }   
  catch(err){
    next(err)
  }
}