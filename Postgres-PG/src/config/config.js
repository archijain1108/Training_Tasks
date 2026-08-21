import dotenv from 'dotenv'
dotenv.config();


if(!process.env.DB_USER || !process.env.DB_PASSWORD){
    throw new Errow('Database user or password not define')
}

if(!process.env.DB_HOST || !process.env.DB_HOST || !process.env.DB_NAME){
    throw new Error('Database host, port or name not define')
}



const config = {
    port: process.env.PORT || 8080,
    db_user: process.env.DB_USER,
    db_password: process.env.DB_PASSWORD,
    db_host: process.env.DB_HOST,
    db_port: process.env.DB_PORT,
    db_name:process.env.DB_NAME

}


export default config ;