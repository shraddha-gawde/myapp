const {mongoose} =require("mongoose")

const userSchema = mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    age:{
        type:Number
    },
    city:{
        type:String
    }
},{
    versionKey:false
})
const userModel = mongoose.model("user", userSchema)

module.exports={
    userModel
}