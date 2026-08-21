import 'dotenv/config'


if(! process.env.MONGO_URI){
    throw new Error('mongo URI missing');
}
if(! process.env.JWT_SECRET){
    throw new Error('JWT Secret missing');
}



const config = {
    mongoUri: process.env.MONGO_URI,
    jwtSecret: process.env.JWT_SECRET
}


export default config;