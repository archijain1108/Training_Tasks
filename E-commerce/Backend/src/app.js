import express from 'express'
import errorHandler from './middlewares/errorHandler.js'
import cookieParser from 'cookie-parser'

import authRouter from './routes/auth.routes.js'
import productRouter from './routes/product.routes.js'
import cartRouter from './routes/cart.routes.js'
import categoryRouter from './routes/category.routes.js'
import paymentRouter from './routes/payment.routes.js'
import orderRouter from './routes/order.routes.js'


const app = express()
app.use(express.json())
app.use(cookieParser())



app.use('/api/auth', authRouter )

app.use('/api/product' , productRouter)

app.use('/api/cart' , cartRouter )


app.use('/api/category' , categoryRouter)

app.use('/api/payment' , paymentRouter)

app.use('/api/order' , orderRouter)


app.use(errorHandler)

export default app;