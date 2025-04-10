const mongoose = require("mongoose");
const ImageSchema = new mongoose.Schema({
  url: {
    //this url will be our image url that we are going to upload in our cloudinary and store back to our mongodb
    type: String,
    required: true,
  },
  publicId: {
    type: String,
    required: true,
  },
  uploadedBy: {   // here we are refering the "User" that which user has uploaded the image 
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required : true,
  },
},{timestamps : true });

module.exports = mongoose.model('Image',ImageSchema)
