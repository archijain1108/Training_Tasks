import express from 'express'
import errorHandler from './middlewares/errorHandler.js'

import authRouter from './routes/auth.routes.js'
import productRouter from './routes/product.routes.js'
import cartRouter from './routes/cart.routes.js'
import categoryRouter from './routes/category.routes.js'

const app = express()
app.use(express.json())



app.use('/api/auth/', authRouter )

app.use('/api/product' , productRouter)

app.use('/api/cart' , cartRouter )


app.use('/api/category/' , categoryRouter)




app.use(errorHandler)

export default app;