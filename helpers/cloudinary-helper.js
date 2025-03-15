
import cloudinary from "../config/cloudinary.js";


export const uploadToCloudinary = async (filePath)=>{
    try {
        const result = await cloudinary.uploader.upload(filePath, 
            {
                api_key:process.env.api_key,
                api_secret: process.env.api_secret,
                cloud_name: process.env.cloud_name,
                resource_type: "auto",
              })
        
        return {
            url:result.secure_url,
            publicId:result.public_id

        }
    } catch (error) {
        console.log("Error uploading to cloudinary", error);
    }
}

