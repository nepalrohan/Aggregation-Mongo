import { uploadToCloudinary } from "../helpers/cloudinary-helper.js";
import Image from "../models/image.js";

export const uploadImage =  async (req, res)=>{
    try {
        

        if(!req.file){
            return res.json({
                success:false,
                message:'No file selected, file is required'
            })
        }


        const {url, publicId}= await uploadToCloudinary(req.file.path);



        const newlyUploadImage = new Image({
            url,
            publicId,
            uploadedBy:req.userInfo.userId,
        })

        await newlyUploadImage.save();

        return res.status(201).json({
            success:true, 
            message:'Image upload successfully',
            image:newlyUploadImage
        })

    } catch (error) {
        console.log(error);
    }
}