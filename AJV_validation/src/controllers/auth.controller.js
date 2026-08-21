import userModel from "../model/user.model.js";
import config from "../config/config.js";
import jwt from 'jsonwebtoken'
import { comparePassword } from '../model/user.model.js'



export const registerUser = async (req, res) => {

    try {

        const { username, password, email } = req.body;


        // check if user already exists
        const userExits = await userModel.findOne(
            {
                $or: [
                    { username: username },
                    { email: email }
                ]
            }
        );


        if (userExits) {
            return res.status(400)
                .json({
                    message: 'User already exists'
                })
        }


        const user = await userModel.create({
            username,
            password,
            email
        })

        const token = jwt.sign(
            { id: user._id },
            config.jwtSecret,
            { expiresIn: '24h' }
        )



        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000
        });


        return res.status(201)
            .json({
                message: 'User created successfully',
                user
            })


    }
    catch (err) {
        return res.status(500)
            .json({
                message: 'Internal Server Error',
                err: err.message
            })
    }
}



export const loginUser = async (req, res) => {

    try {

        const { email, password } = req.body;
        console.log(password)


        const user = await userModel.findOne({ email: email }).select('+password');

        if (!user) {
            return res.status(400).json({
                message: 'Invalid email or password'
            })
        }

        const isPasswordValid = await comparePassword(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({
                message: 'Invalid email or password'
            })
        }


        const token = jwt.sign(
            { id: user._id },
            config.jwtSecret,
            { expiresIn: '24h' }
        )

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000
        })

        return res.status(200)
            .json({
                message: 'user logged In successfully',
                user: {
                    username: user.username,
                    email: user.email
                }
            })

    }
    catch (err) {
        return res.status(500).json({
            message: 'Internal Server Error',
            err: err.message
        })
    }



}





export const getUser = async (req, res) => {

    try {
        const user = await userModel.findOne({
            _id: req.user.id
        })

        if (!user) {
            return res.status(404)
                .json({
                    message: 'user not found'
                })
        }


        return res.status(200)
            .json({
                message: 'user fetch successfully',
                user
            })

    }
    catch (err) {
        return res.status(500)
            .json({
                message: "Internal server err",
                err: err.message
            })
    }
}