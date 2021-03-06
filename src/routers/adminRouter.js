import express from "express";
import { login, logout, dashboard, addDashboard, updateDashboard, manageOrder, sendOrderEstimate, updateShippingInfo } from "../controllers/adminController.js";
import { protecterMiddleware } from "../middlewares";


const adminRouter = express.Router();

adminRouter.get("/login", login);
adminRouter.get("/logout", logout);
adminRouter.get("/dashboard", protecterMiddleware, dashboard);
adminRouter.get("/dashboard/new", protecterMiddleware, addDashboard);
adminRouter.get("/dashboard/update", protecterMiddleware, updateDashboard);
adminRouter.get("/order", protecterMiddleware, manageOrder);
adminRouter.get("/order/estimate", protecterMiddleware, sendOrderEstimate);
adminRouter.get("/order/shipping", protecterMiddleware, updateShippingInfo);
export default adminRouter;