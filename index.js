const express = require("express")
const { connection } = require("./db")
const { userRouter } = require("./routes/user.route")
const { postRouter } = require("./routes/post.route")


const cors = require("cors")
const app = express()

app.use(cors())

app.use(express.json())

app.get("/",(req,res)=>{
    res.json("this is home page")
})
app.use("/users", userRouter)

app.use("/posts", postRouter)

app.listen(4040,async()=>{
    try{
        await connection
        console.log("connected to db")
        console.log("connected to port 4040")
    }catch(err){
        console.log(err)
    }
})