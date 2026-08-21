import 'dotenv/config'
import app from './src/app.js'
import db from './src/models/index.cjs'



const {sequelize} = db ;
const PORT = process.env.PORT;



const startServer = async () =>{
    try{
        await sequelize.authenticate();
        console.log('connect with PostgreSQL');

        app.listen(PORT , () =>{
            console.log(`server listen on PORT ${PORT}`);
            
        })
        
    }catch(err){
        console.error('unable to connect with DB' , err.message);
        process.exit(1);
        
    }
}

startServer();
