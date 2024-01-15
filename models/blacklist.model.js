const {mongoose} =require("mongoose")

const blacklistSchema = mongoose.Schema({
    access_token:{
        type:String
    },
    refresh_token:{
        type:String
    }
},{
    versionKey:false
})
const blacklistModel = mongoose.model("blacklist", blacklistSchema)

module.exports={
    blacklistModel
}