import express from 'express'
import errorHandler from './middlewares/errorHandler.js';
import authRouter from './routes/auth.routes.js'
import createUserTable from '../data/createUserTable.js';

const app = express();
app.use(express.json());


app.use('/api/auth/' , authRouter);



app.use(errorHandler)



createUserTable()



export default app ;