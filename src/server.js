import express from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
import morgan from "morgan";
import apiRouter from "./routers/apiRouter";
import rootRouter from "./routers/rootRouter";
import adminRouter from "./routers/adminRouter";
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



app.use(
    session({
        secret: process.env.COOKIE_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            sameSite: "Lax",
            maxAge: 60000 * 60 * 24,
        },
        store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
    })
);


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
app.use("/admin", adminRouter);

export default app;