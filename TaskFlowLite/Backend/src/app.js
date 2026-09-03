import express from 'express'
import morgan from 'morgan';
import cookieParser from 'cookie-parser'
import {errorHandler} from './middlewares/errorHandler.js'
import authRoutes from './routes/auth.routes.js'
import taskRoutes from './routes/tasks.routes.js'


const app = express();



app.use(express.json())
app.use(morgan('dev'))
app.use(cookieParser())



app.use('/api/auth', authRoutes)
app.use('/api/tasks' , taskRoutes)



app.use(errorHandler)



export default app;