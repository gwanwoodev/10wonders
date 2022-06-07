import express from "express";
import { home, shop } from "../controllers/rootController.js";

const rootRouter = express.Router();


rootRouter.get("/", home);
rootRouter.get("/shop", shop);

export default rootRouter;