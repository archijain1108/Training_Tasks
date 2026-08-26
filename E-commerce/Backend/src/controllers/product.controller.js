import db from '../models/index.js'

const { Product, Variant, Subcategory , sequelize } = db;


export const createProduct = async (req, res, next) => {

    try {

        console.log('create product controller run..........')

        const result = await sequelize.transaction(async t => {

            const { title, description, price, variants } = req.body;
            const { subcategoryId } = req.params
            const sellerId = req.user.id


            const subcategory = await Subcategory.findByPk(subcategoryId,
                { transaction: t }
            );

            if (!subcategory) {
                throw new Error('Sub-category not exists')
            }


            console.log(req.files[0]);


            const imageByColor = {}

            req.files.forEach(file => {
                console.log(file);

                const col = file?.fieldname;

                if (!imageByColor[col]) {
                    imageByColor[col] = [];
                }

                imageByColor[col].push(file?.path);

            })


            const product = await Product.create({
                sellerId,
                title,
                description,
                price,
                subcategoryId,
                imageByColor
            },
                { transaction: t }
            )

            const variantsArr = []

            for (const v of variants) {
              
                    const eachVariant = await Variant.create({
                        productId: product.id,
                        color: v.color,
                        price: v.price ?? product.price,
                        stock: v.stock,
                        attributes: v.attributes ?? {}
                    },
                        { transaction: t }
                    )

                    variantsArr.push(eachVariant)

                }
        

            return { product, variantsArr }

        })

        
        return res.status(201)
            .json({
                message: 'product created with its variants',
                resObj: {
                    product: result.product,
                    variants: result.variantsArr
                }
            })

    }
    catch (err) {
        next(err);
    }


}


export const addVariant = async (req, res, next) => {
  const sellerId = req.user.id;
  const productId = req.params.id;
  const { variants } = req.body;
  const uploadedImages = req.files || [];

  try {
    const result = await sequelize.transaction(async t => {

      const product = await Product.findOne({
        where: {
          id: productId,
          sellerId
        },
        transaction: t
      });

      if (!product) {
        return res.status(404).json({
          message: "Product not found"
        });
      }

      const newVariants = [];

      const imageByColor = {
        ...(product.imageByColor || {})
      };

      for (const v of variants) {

        const eachVariant = await Variant.create(
          {
            productId: product.id,
            color: v.color,
            price: v.price ?? product.price,
            stock: v.stock,
            attributes: v.attributes ?? {}
          },
          {
            transaction: t
          }
        );

        newVariants.push(eachVariant);
      }

      for (const file of uploadedImages) {
        const color = file.fieldname;

        if (!imageByColor[color]) {
          imageByColor[color] = [];
        }

        imageByColor[color].push(file.path);
      }

      await product.update(
        {
          imageByColor
        },
        {
          transaction: t
        }
      );

      return newVariants;
    });

    return res.status(201).json({
      message: "Variant added",
      newVariants: result
    });

  } catch (err) {
    next(err);
  }
};





export const deleteProduct = async (req, res, next) => {
    try {
        const id = req.params.id

        const product = await Product.findOne({
            where: {
                id: id,
                sellerId: req.user.id
            }
        })

        if (!product) {
            return res.status(404)
                .json({
                    message: "product not found"
                })
        }

        await product.destroy();


        return res.status(200)
            .json({
                message: "product deleted successfully"

            })

    }
    catch (err) {
        next(err);
    }
}


export const deleteVariant = async (req, res, next) => {
    try {

        const variant = await Variant.findOne({
            where: {
                id: req.params.variantId,
            },
            
            include: [
                {
                    model: Product,
                    attributes: ["sellerId"]
                }
            ]
        });

        if (!variant || variant.Product.sellerId != req.user.id) {
            return res.status(404)
                .json({
                    message: "variant not found"
                })
        }

        await variant.destroy()


        return res.status(200)
            .json({
                message: 'Variant deleted successfully'
            })

    }
    catch (err){
        next(err)
    }
}




// add variant logic
export const editProduct = async (req, res, next) => {
    const sellerId = req.user.id;
    const productId = req.params.id;

    try {

        const { title, description, price } = req.body;

        const product = await Product.findOne({
            where: {
                sellerId,
                id: productId
            }
        })

        if (!product) {
            res.status(404)
                .json({
                    message: "product not found"
                })
        }

        await product.update({
            title,
            description,
            price
        })

        res.status(200)
            .json({
                message: "product updated successfully"
            })

    }
    catch (err) {
        next(err);
    }
}



/**
 * @access seller 
 * @description show seller product on seller dashboard
 */
export const getAllSellerProducts = async (req, res, next) => {
    try {
        const sellerId = req.user.id

        const sellerProducts = await Product.findAll({
            where: { sellerId }
        })

        return res.status(200)
            .json({
                message: "fetch seller products successfully",
                products: sellerProducts || []
            })
    }
    catch (err) {
        next(err);
    }
}




/**
 * @access public
 * @description get products to show on home page
 */

export const getAllProducts = async (req, res, next) => {

    try {
        const limit = Number(req.query?.limit) || 20;
        const offset = Number(req.query?.offset) || 0;

        const allProducts = await Product.findAll({
            attributes: [
                "id",
                "title",
                "description",
                "price",
                "createdAt",
                "imageByColor",
                "subcategoryId"
            ],
            include: [
                {
                    model: Subcategory,
                    attributes: ['name']
                }
            ],

            order: [["createdAt", "DESC"]],
            limit,
            offset

        }) || [];


        const products = allProducts.map((p, idx) => {
            const firstColor = Object.keys(p.imageByColor || {})?.[0]

            return {
                id: p.id,
                title: p.title,
                description: p.description,
                category: p.subcategory?.name,
                price: p.price,
                thumbnail: p.imageByColor[firstColor]?.[0] || null,
            }

        })

        return res.status(200)
            .json({
                message: "all products fetch successfully",
                products
            })




    } catch (err) {
        next(err);
    }

}

/** 
 * @access public 
 */

export const getProductDetails = async (req, res, next) => {

    const productId = req.params.id;
    try {

        const product = await Product.findOne({
            where : {id : productId}, 
            include : [  {
                    model: Variant,
                    attributes: [
                        "id",
                        "color",
                        "price",
                        "stock",
                        "attributes"
                    ]
                }]
        });

        if (!product) {
            return res.status(404)
                .json({
                    message: "product not found"
                })
        }

        return res.status(200)
            .json({
                message: "product details fetched successfully",
                product
            })


    }
    catch (err) {
        next(err);
    }


}