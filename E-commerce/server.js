import 'dotenv/config'
import db from './src/models/index.cjs'
import app from './src/app.js'


const PORT = process.env.PORT

const {sequelize} = db ;




const startServer = async () =>{
    try{
    
        await sequelize.authenticate()
        console.log('connected to db');
        

        app.listen(PORT , () =>{
            console.log(`server listen on PORT ${PORT}`);
        })

    }   
    catch(err){
        console.log('error occur in connecting with DB'  , err);
        
    } 
}


startServer();




