import express from "express";
import { createNewProduct } from "../controllers/apiController";
import { protectorApiMiddleware } from "../middlewares";
import { fileUpload } from "../utils/file";

const apiRouter = express.Router();

apiRouter.post("/product", protectorApiMiddleware, fileUpload.fields([{ name: 'image', maxCount: 1 }, { name: 'sheet', maxCount: 1 }]), createNewProduct);
export default apiRouter;