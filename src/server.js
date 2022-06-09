import express from "express";
import morgan from "morgan";
import apiRouter from "./routers/apiRouter";
import rootRouter from "./routers/rootRouter";
import methodOverride from "method-override";
import cookieParser from "cookie-parser";

import { localsMiddleware } from "./middlewares";

const app = express();

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(cookieParser());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(localsMiddleware);
app.use((req, res, next) => {
    res.header("Cross-Origin-Embedder-Policy", "credentialless");
    res.header("Cross-Origin-Opener-Policy", "same-origin");
    next();
});


app.use(methodOverride("_method"));

app.use("/uploads", express.static("uploads"));
app.use("/static", express.static("assets"));
app.use("/", rootRouter);
app.use("/api", apiRouter);

export default app;