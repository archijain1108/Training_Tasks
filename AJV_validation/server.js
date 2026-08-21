import app from './src/app.js'
import connectToDB from './src/config/database.js';

connectToDB();



app.listen(8080 , () =>{
     console.log('app listen on PORT 3000');
     
})




