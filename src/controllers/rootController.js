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


export const home = (req, res) => {
    return res.render("home", { pageTitle: "Main" });
}

export const shop = async (req, res) => {
    const { page = 1, maker = "SUNGROW", productType = "inverter" } = req.query;
    const CONTENTS_LIMIT = 5;
    let sortOptions = {
        createdAt: -1
    };

    const contents = await Product.paginate({
        productType,
        productMaker: maker
    }, {
        page: page,
        limit: CONTENTS_LIMIT,
        sort: sortOptions
    });

    const { currentPage, startPage, endPage, totalPage } = getPageAccessData(
        contents.totalDocs,
        CONTENTS_LIMIT,
        page
    );
    const mainCategoryList = [{ value: "inverter", target: '/shop' }, { value: 'module', target: '/shop/module' }, { value: 'optimizer', target: '/shop/optimizer' }];

    const categoryList = [{ value: "SUNGROW", label: "SUNGROW" }, { value: "FIMER", label: "FIMER" }, { value: "HUNDAI", label: "HUNDAI" }, { value: "HANWHAQCELL", label: "HANWHA Q CELL" }, { value: "OCIPOWER", label: "OCI POWER" }, { value: "KSTAR", label: "KSTAR" }, { value: "SOLIS", label: "SOLIS" }, { value: "SHINSUNGEG", label: "SHIN SUNG E&G" }];

    return res.render("shop", {
        pageTitle: "Shop",
        contents: contents.docs,
        startPage,
        endPage,
        totalPage,
        currentPage,
        totalDocs: contents.totalDocs,
        page,
        maker,
        categoryList,
        productType,
        mainCategoryList
    });
}

export const shopModule = async (req, res) => {
    const { page = 1, maker = "LONGISOLAR", productType = "module" } = req.query;
    const CONTENTS_LIMIT = 5;
    let sortOptions = {
        createdAt: -1
    };

    const contents = await Product.paginate({
        productType,
        productMaker: maker
    }, {
        page: page,
        limit: CONTENTS_LIMIT,
        sort: sortOptions
    });

    const { currentPage, startPage, endPage, totalPage } = getPageAccessData(
        contents.totalDocs,
        CONTENTS_LIMIT,
        page
    );
    const mainCategoryList = [{ value: "inverter", target: '/shop' }, { value: 'module', target: '/shop/module' }, { value: 'optimizer', target: '/shop/optimizer' }];

    const categoryList = [{ value: "LONGISOLAR", label: "LONGI SOLAR" }, { value: "HANSOL", label: "HANSOL" }, { value: "HUNDAI", label: "HUNDAI" }, { value: "HANWHAQCELL", label: "HANWHA Q CELL" }, { value: "JASOLAR", label: "JA SOLAR" }, { value: "ASTRONERGY", label: "A STRONEGY" }, { value: "SHINSUNGEG", label: "SHIN SUNG E&G" }];

    return res.render("shop", {
        pageTitle: "Shop",
        contents: contents.docs,
        startPage,
        endPage,
        totalPage,
        currentPage,
        totalDocs: contents.totalDocs,
        page,
        maker,
        categoryList,
        productType,
        mainCategoryList
    });
}

export const shopOptimize = async (req, res) => {
    const { page = 1, maker = "TAIGO", productType = "optimizer" } = req.query;
    const CONTENTS_LIMIT = 5;
    let sortOptions = {
        createdAt: -1
    };

    const contents = await Product.paginate({
        productType,
        productMaker: maker
    }, {
        page: page,
        limit: CONTENTS_LIMIT,
        sort: sortOptions
    });

    const { currentPage, startPage, endPage, totalPage } = getPageAccessData(
        contents.totalDocs,
        CONTENTS_LIMIT,
        page
    );
    const mainCategoryList = [{ value: "inverter", target: '/shop' }, { value: 'module', target: '/shop/module' }, { value: 'optimizer', target: '/shop/optimizer' }];

    const categoryList = [{ value: "TAIGO", label: "TAIGO" }];

    return res.render("shop", {
        pageTitle: "Shop",
        contents: contents.docs,
        startPage,
        endPage,
        totalPage,
        currentPage,
        totalDocs: contents.totalDocs,
        page,
        maker,
        categoryList,
        productType,
        mainCategoryList
    });
}

export const cart = async (req, res) => {
    const { cart_items = '[]' } = req.cookies;

    const items = JSON.parse(cart_items);
    console.log(items);
    return res.render("cart", { pageTitle: "Cart", items });
}

export const order = async (req, res) => {
    return res.render("order-enter", { pageTitle: "Order" });
}

export const orderResult = async (req, res) => {
    const { email, orderNumber } = req.query;

    const isExists = await Order.exists({ clientEmail: email, orderNumber });

    if (!isExists) {
        return res.render("order-result", { pageTitle: "Result", email: '', order: [], subTotal: 0 });
    }
    const order = await Order.find({ clientEmail: email, orderNumber }).populate("orderProducts.product");
    let subTotal = 0;

    order[0].orderProducts.forEach(item => {
        subTotal += item.estimate;
    })

    

    return res.render("order-result", { pageTitle: "Result", email, order, subTotal });
}