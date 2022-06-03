import express from "express";
import { createNewProduct, removeProduct, updateProduct, createNewOrder, getMyOrder, updateOrder, updateOrderProcess } from "../controllers/apiController";
import { protectorApiMiddleware } from "../middlewares";
import { fileUpload } from "../utils/file";

const apiRouter = express.Router();

apiRouter.post("/product", protectorApiMiddleware, fileUpload.fields([{ name: 'image', maxCount: 1 }, { name: 'sheet', maxCount: 1 }]), createNewProduct);
apiRouter.put("/product", protectorApiMiddleware, fileUpload.fields([{ name: 'image', maxCount: 1 }, { name: 'sheet', maxCount: 1 }]), updateProduct);
apiRouter.delete("/product", protectorApiMiddleware, removeProduct);
apiRouter.post("/order", createNewOrder);
apiRouter.put("/order", protectorApiMiddleware, updateOrder);
apiRouter.get("/order", getMyOrder);
apiRouter.put("/order/process", protectorApiMiddleware, updateOrderProcess);
export default apiRouter;