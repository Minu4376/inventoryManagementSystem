const express=require('express')
const app=express()
const {productRouter}=require('./routers/productRouter')
app.use(express.json())

const port=3001



app.get("/",(req,res)=>{
  res.send("From The Server")
})

app.use("/",productRouter)


app.listen(port,()=>{
    console.log("Server started...");
    
})