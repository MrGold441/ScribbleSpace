import multer from 'multer';
import dotenv from 'dotenv';
import { GridFsStorage } from 'multer-gridfs-storage';

dotenv.config();


const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;


const storage = new GridFsStorage({
    url: `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.qti5rpo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`,
    options: { useNewUrlParser: true },
    file: (request, file) => {
        const match = ["image/png", "image/jpg"];

        if (match.indexOf(file.memeType) === -1)
            return `${Date.now()}-blog-${file.originalname}`;

        return {
            bucketName: "photos",
            filename: `${Date.now()}-blog-${file.originalname}`
        }
    }
});

export default multer({ storage }); 