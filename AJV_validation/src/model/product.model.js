import mongoose from "mongoose";


const productSchema = new mongoose.Schema({
    category :{
        type : String,
        required : [true, 'Category is required'],
        enum : ['Electronics' , 'Clothing' , 'Books' , 'Home Appliances' , 'Sports' , 'Toys']
    },
    title :{
        type : String,
        required : [true, 'Title is required'],
        length : [3 , 'Title must be at least 3 characters long'],

    },
    description :{
        type : String,
        required : [true , 'description is required'],
        length : [10 , 'Description must be at least 10 character long.']
    }
})



const productModel = mongoose.model('product' , productSchema);
export default productModel;