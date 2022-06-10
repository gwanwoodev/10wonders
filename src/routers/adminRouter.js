import express from "express";
import { login, logout, dashboard, addDashboard, updateDashboard } from "../controllers/adminController.js";
import { protecterMiddleware } from "../middlewares";


const adminRouter = express.Router();

adminRouter.get("/login", login);
adminRouter.get("/logout", logout);
adminRouter.get("/dashboard", protecterMiddleware, dashboard);
adminRouter.get("/dashboard/new", protecterMiddleware, addDashboard);
adminRouter.get("/dashboard/update", protecterMiddleware, updateDashboard);
export default adminRouter;