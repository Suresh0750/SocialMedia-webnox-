import { CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, CLOUDINARY_CLOUD_NAME } from "@/config/env";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name:CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

export class CloudinaryService {
  static async uploadImage(imagePath: string): Promise<string> {
    try {
      const result = await cloudinary.uploader.upload(imagePath, {
        folder: "posts", 
      });
      return result.secure_url;
    } catch (error) {
      throw new Error("Error uploading image to Cloudinary");
    }
  }
}

export default cloudinary;
