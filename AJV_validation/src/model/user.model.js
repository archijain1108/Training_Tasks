import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({

    username :{
        type : String,
        required : true,
        unique : true
    },

    password :{
        type : String,
        required : true,
        select : false
    },

    email :{
        type : String,
        required : true,
        unique : true
    },

})



userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return ;

    this.password = await bcrypt.hash(this.password, 10);

    next;
});



export const comparePassword = async (password , hashedPassword) => {
    return await bcrypt.compare(password , hashedPassword);
}





const userModel = mongoose.model('user' , userSchema );
export default userModel;



