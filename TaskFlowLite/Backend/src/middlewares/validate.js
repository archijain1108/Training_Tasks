import ajv from '../../utils/ajv.js'

const validate = (schema) => {

    return (req, res, next) => {
        const validate = ajv.compile(schema)
        const valid = validate(req.body)

        
        if (!valid) {
            const errors = validate.errors.map((error) => {
                return {
                    message: `${error.instancePath.slice(1)} ${error.message}`
                }
            })
            return res.status(400).json({ errors })
        }
        next()
    }
}

export default validate
