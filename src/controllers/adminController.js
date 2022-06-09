import Order from "../models/Order";
import Product from "../models/Product";

const getPageAccessData = (totalDocs, limit, page) => {
    let currentPage = page ? Number(page) : 1;
    const startPage = Math.floor((currentPage - 1) / 5) * 5 + 1;
    let endPage = startPage + 5 - 1;

    const totalPage = Math.ceil(totalDocs / limit);

    if (currentPage > totalPage) {
        currentPage = totalPage;
    }

    if (endPage > totalPage) {
        endPage = totalPage;
    }

    const resultObj = {
        currentPage,
        startPage,
        endPage,
        totalPage,
    };
    return resultObj;
};

export const login = (req, res) => {
    if (req.session.loggedIn) {
        res.redirect("/admin/dashboard");
        return;
    }
    return res.render("admins/login", { pageTitle: "Login" });
}


export const dashboard = (req, res) => {
    res.send('dd');
}