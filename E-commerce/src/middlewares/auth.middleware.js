import 'dotenv/config'
import jwt, { decode } from 'jsonwebtoken'


export const authMiddleware = (requiredRole) => {

    return (req, res, next) => {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401)
                .json({
                    message: "Unauthorized, token not found"
                })
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            if ( decoded.role != 'admin' && requiredRole  && (decoded.role != requiredRole)) {
                return res.status(401)
                    .json({
                        message: "Unauthorised"
                    })
            }

            req.user = decoded;
            next();
        }
        catch (err) {
            return res.status(400)
                .json({
                    message: "Invalid token"
                })
        }


    }

}

export default authMiddleware;