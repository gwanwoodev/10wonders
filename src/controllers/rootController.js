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
    const { page = 1, maker = "SUNGROW" } = req.query;
    const PRODUCT_TYPE = "inverter";
    const CONTENTS_LIMIT = 5;
    let sortOptions = {
        createdAt: -1
    };

    const contents = await Product.paginate({
        productType: PRODUCT_TYPE,
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
    const mainCategoryList = [{ value: "inverter", target: '/shop' }, { value: 'module', target: '/shop/module' }, { value: 'optimize', target: '/shop/optimize' }];

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
        productType: PRODUCT_TYPE,
        mainCategoryList
    });
}