import app from './src/app.js'
import config from './src/config/config.js'
import pool from './src/config/database.js';

const PORT = config.port;







// testing postgres connection 

app.get('/' , async ( req , res) =>{    
    
    const result = await pool.query("SELECT current_database()");
    
    res.send(`The DB name is ${result.rows[0].current_database}`)
})



app.listen(PORT , () =>{
    console.log(`app listen on PORT ${PORT}`);
    
})

