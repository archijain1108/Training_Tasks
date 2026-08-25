const errorHandler = ( err , req , res , next) =>{
    // console.log(err.stack);

    return res.status(500)
    .json({
        message : "Internal server error",
        error : err.message
    })

    next()
    
}

export default errorHandler