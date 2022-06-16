import _ from "mongoose-paginate-v2";
import Order from "../models/Order";
import Product from "../models/Product";
import { orderNumberValidator } from "../utils/validator";

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

export const updateDashboard = async (req, res) => {
    const { _id } = req.query;

    if (!_id) {
        return res.redirect("/admin/dashboard");
    }

    const idCheckRegex = /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i;

    if (!idCheckRegex.test(_id)) {
        return res.redirect("/");
    }

    const product = await Product.findById(_id);

    const inverterOptions = [
        { value: 'SUNGROW', label: 'SUNGROW' },
        { value: 'FIMER', label: 'FIMER' },
        { value: 'HYUNDAI', label: 'HYUNDAI' },
        { value: 'HANWHAQCELL', label: 'HANWHA Q CELL' },
        { value: 'OCIPOWER', label: 'OCI POWER' },
        { value: 'KSTAR', label: 'KSTAR' },
        { value: 'SOLIS', label: 'SOLIS' },
        { value: 'SHINSUNGEG', label: 'SHINSUNG E&G' },
    ];

    const moduleOptions = [
        { value: 'LONGISOLAR', label: 'LONGI SOLAR' },
        { value: 'HANSOL', label: 'HANSOL' },
        { value: 'HYUNDAI', label: 'HYUNDAI' },
        { value: 'HANWHAQCELL', label: 'HANWHA Q CELL' },
        { value: 'JASOLAR', label: 'JA SOLAR' },
        { value: 'ASTRONERGY', label: 'ASTRONERGY' },
        { value: 'SHINSUNGEG', label: 'SHINSUNG E&G' },
        { value: 'TRINASOLAR', label: 'TRINA SOLAR' },
    ]

    const optimizeOptions = [
        { value: 'TIGO', label: 'TIGO' }
    ];

    
    return res.render("admins/dashboard-update", { pageTitle: "Modify", product, inverterOptions, moduleOptions, optimizeOptions });
}

export const manageOrder = async (req, res) => {
    const { page = 1, keyword } = req.query;
    const CONTENTS_LIMIT = 5;

    let sortOptions = {
        createdAt: -1
    };

    let where = {};

    if(keyword) {
        where = {
            orderNumber: keyword
        }
    }


    const orders = await Order.paginate(where, {
        page: page,
        limit: CONTENTS_LIMIT,
        sort: sortOptions
    });



    const { currentPage, startPage, endPage, totalPage } = getPageAccessData(
        orders.totalDocs,
        CONTENTS_LIMIT,
        page
    );
    return res.render("admins/order", {pageTitle: "Orders", orders: orders.docs, startPage, endPage, totalPage, currentPage, totalDocs: orders.totalDocs, page});
}

export const sendOrderEstimate = async (req, res) => {
    const {orderNumber} = req.query;

    if (!orderNumber) {
        return res.redirect("/admin/dashboard");
    }

    if (!orderNumberValidator(orderNumber)) {
        return res.redirect("/admin/dashboard");
    }

    const order = await Order.find({orderNumber: orderNumber}).populate("orderProducts.product");
    let subTotal = 0;

    order[0].orderProducts.forEach(item => {
        subTotal += item.estimate;
    })

    return res.render("admins/order-estimate", {pageTitle: "Send Estimate", order, subTotal});
}