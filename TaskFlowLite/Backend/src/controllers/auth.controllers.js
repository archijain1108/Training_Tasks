import { Op } from 'sequelize'
import db from '../models/index.js'
import jwt from 'jsonwebtoken'
const { User } = db

console.log(Object.keys(db));


function generateToken(user, res) {
    const token = jwt.sign({ id: user.id },
        process.env.JWT_SECRET,
        { expiresIn: '1h' })


    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 1000 * 24 
    })

}



export const registerUser = async (req, res, next) => {
    try {
        const { email, password, username } = req.body
        console.log(email , password , username)

        const UserExists = await User.findOne({
            where: {
            [Op.or] : ([
                { email: email },
                { username: username }
            ])
          }
        })

        if (UserExists) {
            return res.status(400).json({
                message: 'User already exists'
            })
        }

        const user = await User.create({
            email,
            password,
            username
        })

        generateToken(user, res)

        return res.status(201).json({
            message: 'User created successfully',
            user: {
                id: user.id,
                email: user.email,
                username: user.username
            }
        })


    }

    catch (err) {
        console.log(err)
        next(err)
    }

}


export const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body

        const user = await User.findOne({ where: { email } })

        if (!user) {
            return res.status(400).json({
                message: 'Invalid email or password'
            })
        }

        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            return res.status(400).json({
                message: 'Invalid email or password'
            })
        }

        generateToken(user, res)

        return res.status(200).json({
            message: 'User logged in successfully',
            user: {
                id: user.id,
                email: user.email,
                username: user.username
            }
        })
    }
    catch (err) {
        next({err})
    }

}






export const logoutUser = async (req, res, next) => {

    try {
        res.clearCookie('token')

        return res.status(200).json({
            message: 'User logged out successfully'
        })

    }
    catch (err) {
        next(err)
    }

}