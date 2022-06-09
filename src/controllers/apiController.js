import Order from "../models/Order";
import Product from "../models/Product";
import { createOrderNumber } from "../utils/generator";
import { sendClientMail } from "../utils/mailer";

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

export const updateProduct = async (req, res) => {
    const {
        productId,
        productType,
        productMaker,
        productName,
        productSubHead,
        productSpecs,
    } = req.body;

    if (!productId)
        return res.json({ success: false, msg: 'productId is not defined' });


    const files = req.files;

    try {
        const checkerResult = productReqChecker(req.body);
        let productImage = '';
        let productDataSheet = '';

        if (!checkerResult)
            return res.json({ success: false, msg: 'request invalid' });

        if (files.image) {
            productImage = `/uploads/images/${files.image[0].filename}`;
        } else {
            const previousProduct = await Product.findById(productId);

            if (!previousProduct)
                return res.json({ success: false, msg: 'not found previous product' });

            productImage = previousProduct.productImage;
            productDataSheet = previousProduct.productDataSheet;

        }

        if (files.sheet) {
            productDataSheet = `/uploads/datasheets/${files.sheet[0].filename}`;
        } else {
            const previousProduct = await Product.findById(productId);
            if (!previousProduct)
                return res.json({ success: false, msg: 'not found previous product' });
            productDataSheet = previousProduct.productDataSheet;
        }





        await Product.findByIdAndUpdate(productId, {
            productType,
            productMaker,
            productName,
            productSubHead,
            productSpecs,
            productImage,
            productDataSheet,
        });


        return res.json({ success: true, msg: 'success updateProduct' });


    } catch (e) {
        console.error(`error - updateProduct`);
        console.error(e);
        return res.json({ success: false, msg: 'error - updateProduct' });
    }

}

export const removeProduct = async (req, res) => {
    const { productId } = req.body;

    if (!productId)
        return res.json({ success: false, msg: 'productId is not defined' });

    await Product.findByIdAndDelete(productId);

    return res.json({ success: true, msg: 'success removeProduct' });

}

export const createNewOrder = async (req, res) => {
    const { clientEmail, clientName, clientAddress } = req.body;
    const { cart_items = '[]' } = req.cookies;
    const orderProducts = JSON.parse(cart_items);

    let isExists = true;
    let orderNumber;

    if (orderProducts.length < 1) {
        return res.json({ success: false, msg: "There's nothing in the cart" });
    }

    while (isExists) {
        orderNumber = createOrderNumber();
        isExists = await Order.exists({ orderNumber });
    }

    try {

        const newOrder = new Order();

        newOrder.clientEmail = clientEmail;
        newOrder.clientName = clientName;
        newOrder.clientAddress = clientAddress;
        newOrder.orderNumber = orderNumber;
        newOrder.orderProducts = orderProducts;

        const savedDoc = await newOrder.save();

        const populatedDoc = await savedDoc.populate("orderProducts.product");

        await sendClientMail(populatedDoc);

    } catch (e) {
        console.error("Error - createNewOrder");
        console.error(e);

        return res.json({ success: false, msg: 'error - createNewOrder', });
    }



    return res.json({ success: true, msg: 'success createNewOrder', orderNumber });
}

export const getMyOrder = async (req, res) => {
    const { orderNumber, clientEmail } = req.query;

    if (!orderNumber || !clientEmail) return res.json({ success: false, msg: 'your request invalid' });

    let isExists = await Order.exists({ orderNumber, clientEmail });

    if (!isExists) return res.json({ success: false, msg: 'not found your order' });

    try {
        const selectOrder = await Order.findOne({ orderNumber, clientEmail });
        return res.json({ success: true, order: selectOrder });

    } catch (e) {
        console.error("Error - getMyOrder");
        console.error(e);

        return res.json({ success: false, msg: 'error - getMyOrder' });
    }
}

export const updateOrder = async (req, res) => {
    const { orderNumber, orderProducts } = req.body;

    let isExists = await Order.exists({ orderNumber });

    if (!isExists) return res.json({ success: false, msg: 'not found orders' });

    try {
        await Order.updateOne({ orderNumber }, {
            orderProducts
        });
    } catch (e) {
        console.error("ERror - updateOrder");
        console.error(e);
        return res.json({ success: false, msg: 'error - updateOrder' });
    }
}

export const updateOrderProcess = async (req, res) => {
    const { orderNumber, process = 0 } = req.body;

    let isExists = await Order.exists({ orderNumber });
    if (!isExists) return res.json({ success: false, msg: 'not found orders' });

    try {
        await Order.updateOne({ orderNumber }, { process });
    } catch (e) {
        console.error("Error - updateOrderProcess");
        console.error(e);
        return res.json({ success: false, msg: "error - updateOrderProcess" });
    }
}