import _ from "mongoose-paginate-v2";
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

export const logout = (req, res) => {
    req.session.destroy();
    return res.redirect("/");
};


export const dashboard = async (req, res) => {
    const { page = 1, keyword = '' } = req.query;
    const CONTENTS_LIMIT = 5;

    const options = {
        page: page,
        limit: CONTENTS_LIMIT
    }


    const products = await Product.paginate({
        productName: {
            $regex: keyword,
            $options: "i"
        }
    }, {
        page: page,
        limit: CONTENTS_LIMIT
    });


    const { currentPage, startPage, endPage, totalPage } = getPageAccessData(
        products.totalDocs,
        CONTENTS_LIMIT,
        page
    );

    console.log(products);


    return res.render("admins/dashboard", { pageTitle: "Dashboard", products: products.docs, startPage, endPage, totalPage, currentPage, totalDocs: products.totalDocs, page });
}

export const addDashboard = async (req, res) => {
    return res.render("admins/dashboard-add", { pageTitle: "Add" });
}