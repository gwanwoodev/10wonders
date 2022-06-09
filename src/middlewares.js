
export const localsMiddleware = (req, res, next) => {
    res.locals.siteName = "10 WGE";
    res.locals.loggedIn = Boolean(req.session.loggedIn);
    res.locals.loggedInUser = req.session.user || {};
    next();

}

export const protecterMiddleware = (req, res, next) => {
    if (req.session.loggedIn) {
        return next();
    } else {
        return res.redirect("/");
    }
}

export const protectorApiMiddleware = (req, res, next) => {
    if (!req.session.loggedIn) {
        return res
            .status(400)
            .json({ success: false, errorMessage: "Not Authorized" });
    } else {
        return next();
    }
}





