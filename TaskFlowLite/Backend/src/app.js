import express from 'express'
import morgan from 'morgan';
import cookieParser from 'cookie-parser'
import {errorHandler} from './middlewares/errorHandler.js'
import authRoutes from './routes/auth.routes.js'
import taskRoutes from './routes/tasks.routes.js'
import cors from 'cors'


const app = express();

app.use(cors({
    origin : process.env.CLIENT_URL || 'http://localhost:5173',
    credentials : true
}))


app.use(express.json())
app.use(morgan('dev'))
app.use(cookieParser())



app.use('/api/auth', authRoutes)
app.use('/api/tasks' , taskRoutes)



app.use(errorHandler)



export default app;