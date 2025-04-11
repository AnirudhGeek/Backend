const express = require("express");
const authMiddleware = require("../middlewares/auth-middleware");
const adminMiddleware = require("../middlewares/admin-middleware");
const uploadMiddleware = require("../middlewares/uploadMiddleware");
const { uploadImageController, fetchImagesController  } = require("../controllers/image-controller");

const router = express.Router();

//route to upload the Image
router.post(
  "/upload",
  authMiddleware,   // gives req.info 
  adminMiddleware,  //checking if the user is  an admin user
  uploadMiddleware.single("image"),  //then we are uploading a single file
  uploadImageController  //then we are storing it in our database
);

//to get all the image
router.get('/get',authMiddleware,fetchImagesController)

module.exports = router;
