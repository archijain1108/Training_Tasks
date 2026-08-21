const validate = (validator) => {

    return (req, res, next) => {

        const valid = validator(req.body);

        if (!valid) {
            return res.status(400).json({
                message: "Validation failed",
                errors: validator.errors
            });
        }

        next();
    };
};

export default validate;