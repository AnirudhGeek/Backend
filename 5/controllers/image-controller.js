const { uploadToCloudinary } = require("../helpers/cloudinaryHelper");
const Image = require("../models/Image");
const fs = require("fs");
const cloudinary = require("../config/cloudinary");

const uploadImageController = async (req, res) => {
  try {
    //check if file is missing in req object
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "File is required. Please upload an image",
      });
    }

    //upload to cloudinary
    const { url, publicId } = await uploadToCloudinary(req.file.path);

    //store the image url and public id along with the uploaded user id in the database
    const newlyUploadedImage = new Image({
      url,
      publicId,
      uploadedBy: req.userInfo.userId,
    });

    await newlyUploadedImage.save(); //now this will store in our database

    //delete the file from local storage
    fs.unlinkSync(req.file.path);

    res.status(201).json({
      success: true,
      message: "Image uploaded successfully",
      image: newlyUploadedImage,
    });
  } catch (e) {
    console.log("Error => ", e);
    res.status(500).json({
      success: false,
      message: "Something went wrong! Please try again.",
    });
  }
};

//fetching the image
const fetchImagesController = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5; //by default we wamt ot render 5 images
    const skip = (page - 1) * limit;

    const sortBy = req.query.sortBy || "createdAt";
    const sortOrder = req.query.sortOrder == "asc" ? 1 : -1;
    const totalImgages = await Image.countDocuments();
    const totalPages = Math.ceil(totalImgages / limit);

    const sortObj = {};
    sortObj[sortBy] = sortOrder
    const images = await Image.find().sort(sortObj).skip(skip).limit(limit);
    if (images) {
      res.status(200).json({
        success: true,
        currentPage : page,
        totalPages : totalPages,
        totalImgages : totalImgages, 
        data: images,
      });
    }
  } catch (e) {
    console.log("Error => ", e);
    res.status(500).json({
      success: false,
      message: "Something went wrong! Please try again.",
    });
  }
};

//deleting the image
const deleteImageController = async (req, res) => {
  try {
    //1st step is getting the image id
    const getCurrentIdOfImageToBeDeleted = req.params.id;
    const userId = req.userInfo.userId;

    //find the current image
    const image = await Image.findById(getCurrentIdOfImageToBeDeleted);
    if (!image) {
      res.status(404).json({
        success: false,
        message: "Image not found",
      });
    }

    //check if the image is uploaded by the current user who is trying to delete the image
    if (image.uploadedBy.toString() !== userId) {
      res.status(403).json({
        success: false,
        message: "You are not authorized to delete this image.",
      });
    }

    //delete this image first form our cloudinary
    await cloudinary.uploader.destroy(image.publicId);

    //deleting this image from mongpDb database
    await Image.findByIdAndDelete(getCurrentIdOfImageToBeDeleted);

    res.status(200).json({
      success: true,
      message: "Image deleted Successfully",
    });
  } catch (e) {
    console.log("Error => ", e);
    res.status(500).json({
      success: false,
      message: "Something went wrong! Please try again.",
    });
  }
};

module.exports = {
  uploadImageController,
  fetchImagesController,
  deleteImageController,
};
