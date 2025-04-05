//express is a web framework for nodeJs

//advantages or key features of expressJs
//=> routing,middleware concept , template engines like ejs or pug , static file serving , error handling and creating restful api development


const express = require('express')
const app = express()

const PORT = 3000

app.get('/',(req,res)=>{
    res.send("Hello World")
})

app.listen(PORT,()=>console.log(`Server is running on PORT : ${PORT}`))
