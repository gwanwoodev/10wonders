import path from "path";
import multer from "multer";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname === "image") {
            cb(null, "uploads/images");
        } else if (file.fieldname === "sheet") {
            cb(null, "uploads/datasheets");
        }
    },

    filename: (req, file, cb) => {
        cb(null, file.fieldname + Date.now() + path.extname(file.originalname))
    }
});

export const fileUpload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 30,
    }
});