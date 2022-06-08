import express from "express";
import { home, shop, shopModule, shopOptimize } from "../controllers/rootController.js";

const rootRouter = express.Router();


rootRouter.get("/", home);
rootRouter.get("/shop", shop);
rootRouter.get("/shop/module", shopModule);
rootRouter.get("/shop/optimize", shopOptimize);

export default rootRouter;