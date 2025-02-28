import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./cloudinaryService";

const storage = new CloudinaryStorage({
    cloudinary,
    params: async (req, file) => {
      return {
        folder: "posts",
        format: file.mimetype.split("/")[1], 
        public_id: file.originalname.split(".")[0],
      };
    },
  });
  
  const upload = multer({ storage });
  
  export default upload;
  