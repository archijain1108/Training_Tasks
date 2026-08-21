const errorHandler = async (err, req , res , next) =>{

    console.log(err.stack);

    return res.status(500)
    .json({
        message : 'something went wrong',
        error : err.message,

    })
    

}

export default errorHandler ;