import cloudinary from "../config/cloudinary.js";
import { uploadToCloudinary } from "../helpers/cloudinary-helper.js";
import Image from "../models/image.js";
import fs from "fs";

export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.json({
        success: false,
        message: "No file selected, file is required",
      });
    }

    const { url, publicId } = await uploadToCloudinary(req.file.path);

    const newlyUploadImage = new Image({
      url,
      publicId,
      uploadedBy: req.userInfo.userId,
    });

    await newlyUploadImage.save();

    //delete file from local storage
    fs.unlinkSync(req.file.path);

    return res.status(201).json({
      success: true,
      message: "Image upload successfully",
      image: newlyUploadImage,
    });
  } catch (error) {
    console.log(error);
  }
};

export const fetchImagesController = async (req, res) => {
  try {

const images = await Image.find({});
if(images){
    res.status(200).json({
        success:true, 
        data:images
    })
}

  } catch (error) {
    console.log(error);
  }
};



export const deleteImageController = async (req, res)=>{
  try {
    
const getcurrentImageId = req.params.id;
const userId = req.userInfo.userId;

const image = await Image.findById(getcurrentImageId);
if(!image){
  return res.json({
    message:'Image not found'
  })
}


if(image.uploadedBy.toString() !== userId){
  return res.json({message:'Not authorized'})
}

//delete image in cloudinary
await cloudinary.uploader.destroy(image.publicId);

//delet image in database mongodb
await image.findByIdAndDelete(getcurrentImageId);

res.json({
  message:'Image deleted successfully!'
})

  } catch (error) {
    console.log(error)
  }
}