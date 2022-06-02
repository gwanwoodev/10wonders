import Product from "../models/Product";


function productReqChecker({ productType, productMaker, productName, productSubHead }) {
    if (!productType || !productMaker || !productName || !productSubHead)
        return false;
    else
        return true;
}

export const createNewProduct = async (req, res) => {
    const {
        productType,
        productMaker,
        productName,
        productSubHead,
        productSpecs,
    } = req.body;

    const files = req.files;

    try {
        const checkerResult = productReqChecker(req.body);

        if (!checkerResult)
            return res.json({ success: false, msg: 'request invalid' });

        if (!files.image || !files.sheet)
            return res.json({ success: false, msg: 'request invalid' });

        const productImage = `/uploads/images/${files.image[0].filename}`;
        const productDataSheet = `/uploads/datasheets/${files.sheet[0].filename}`;

        await Product.create({
            productType,
            productMaker,
            productName,
            productSubHead,
            productSpecs,
            productImage,
            productDataSheet
        });

        return res.json({ success: true, msg: 'success createNewProduct' });


    } catch (e) {
        console.error(`error - createNewProduct`);
        console.error(e);
        return res.json({ success: false, msg: 'error - createNewProduct' });
    }

}