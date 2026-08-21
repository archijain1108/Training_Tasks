import jwt from 'jsonwebtoken';
import config from '../config/config.js';



const authMiddleware = async (req, res, next) => {

    const token = req.cookies.token

    if (!token) {
        return res.status(404)
            .json({
                message: 'token not found'
            })
    }


    try {
        const decoded = await jwt.verify(token, config.jwtSecret)
        req.user = decoded;
        next() ;
    }
    catch (err) {
        return res.status(401)
            .json({
                message: 'unauthorised access'
            })
    }

}

export default authMiddleware;