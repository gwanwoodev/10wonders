import express from "express";
import { createNewProduct, removeProduct, updateProduct } from "../controllers/apiController";
import { protectorApiMiddleware } from "../middlewares";
import { fileUpload } from "../utils/file";

const apiRouter = express.Router();

apiRouter.post("/product", protectorApiMiddleware, fileUpload.fields([{ name: 'image', maxCount: 1 }, { name: 'sheet', maxCount: 1 }]), createNewProduct);
apiRouter.put("/product", protectorApiMiddleware, fileUpload.fields([{ name: 'image', maxCount: 1 }, { name: 'sheet', maxCount: 1 }]), updateProduct);
apiRouter.delete("/product", protectorApiMiddleware, removeProduct);
export default apiRouter;