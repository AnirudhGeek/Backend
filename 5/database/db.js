const mongoose = require('mongoose')

const connectToDb = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("MongoDb connected successfully ")
    }catch(e){
        console.log("MongoDb connnection error => ",e)
    }
}

module.exports = connectToDb