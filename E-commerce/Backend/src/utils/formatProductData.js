const formatProductData = (req, res, next) => {
  try {

       console.log("BODY:", req.body);
    console.log("VARIANTS:", req.body.variants);
    console.log("TYPE:", typeof req.body.variants);

    
      if (req.body.price) {
      req.body.price = Number(req.body.price);
    }

    if (req.body.variants) {
      req.body.variants = JSON.parse(req.body.variants);
    }

     req.body.variants = req.body.variants.map(variant => ({
        ...variant,
        stock: Number(variant.stock),
        price: variant.price != undefined
          ? Number(variant.price)
          : undefined
      }));

   
    next();

  } catch (error) {
    return res.status(400).json({
      message: "Invalid variants JSON"
    });
  }
};


export default formatProductData ;