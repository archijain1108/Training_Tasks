const formatProductData = (req, res, next) => {
  try {
    if (req.body.variants) {
      req.body.variants = JSON.parse(req.body.variants);
    }

    next();

  } catch (error) {
    return res.status(400).json({
      message: "Invalid variants JSON"
    });
  }
};


export default formatProductData ;