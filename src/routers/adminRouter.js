import express from "express";
import { login, dashboard } from "../controllers/adminController.js";
import { protecterMiddleware } from "../middlewares";


const adminRouter = express.Router();

adminRouter.get("/login", login);
adminRouter.get("/dashboard", protecterMiddleware, dashboard);
export default adminRouter;