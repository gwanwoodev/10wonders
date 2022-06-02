import express from "express";
import morgan from "morgan";
import apiRouter from "./routers/apiRouter";
import methodOverride from "method-override";

const app = express();

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
    res.header("Cross-Origin-Embedder-Policy", "require-corp");
    res.header("Cross-Origin-Opener-Policy", "same-origin");
    next();
});

app.use(methodOverride("_method"));

app.use("/uploads", express.static("uploads"));
app.use("/static", express.static("assets"));
app.use("/api", apiRouter);

export default app;