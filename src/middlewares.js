import multer from "multer";
/* TODO */

export const localsMiddleware = (req, res, next) => {
    res.locals.siteName = "10 WGE";
    next();
}

export const protecterMiddleware = (req, res, next) => {
    next();
}

export const protectorApiMiddleware = (req, res, next) => {
    next();
}





