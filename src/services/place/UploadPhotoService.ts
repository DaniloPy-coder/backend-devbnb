import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
});

export class UploadService {
    async uploadFiles(files: Express.Multer.File[]): Promise<string[]> {
        const uploadedUrls: string[] = [];

        for (const file of files) {
            const url = await new Promise<string>((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    { folder: "places" },
                    (error, result) => {
                        if (error) return reject(error);
                        if (result?.secure_url) resolve(result.secure_url);
                        else reject(new Error("Upload falhou sem URL"));
                    }
                );
                streamifier.createReadStream(file.buffer).pipe(uploadStream);
            });

            uploadedUrls.push(url);
        }

        return uploadedUrls;
    }
}
