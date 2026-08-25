import multer from 'multer'


const storage = multer.diskStorage({
    destination: "uploads/products",

    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName);        
    }
});



export const upload = multer({
    storage,
    limits: {
        fileSize: 3 * 1024 * 1024
    }

})


export const multerErrorHandler = (err, req, res, next) => {
    try {
        const files = req.files || []
        console.log('from err handler check', files);


        if (err instanceof multer.MulterError) {
            return res.status(400)
                .json({
                    message: 'multer error occured'
                })
        }

        else if (files.length < 1 || files.length > 50) {
            return res.status(400)
            .json({
                message : 'upload at least 1 image & at max 50'
            })
        }


        next()

    }
    catch (err) {
        next(err);
    }
}