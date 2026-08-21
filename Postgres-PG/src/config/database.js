import { Pool } from "pg";
import config from "./config.js";

const pool = new Pool({
    user: config.db_user,
    host: config.db_host,
    port: config.db_port,
    database: config.db_name,
    password: config.db_password,

    max: 20,
    idleTimeoutMillis: 30000,        // if no query for 30s pool close connetion, free resource
    connectionTimeoutMillis: 40000

});


pool.on('connect' , () =>{
    console.log('pool connection establish');
    
})

pool.on('error' , (err) =>{
    console.log('pool connection error ' , err);
    
})



export default pool;