import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    process: {
        type: Number,
        default: 0 // 0 주문, 1 결제완료 2 배송
    },
    orderNumber: {
        type: Number
    },
    clientEmail: {
        type: String
    },
    clientName: {
        type: String
    },
    clientAddress: {
        type: String
    },
    orderProducts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            productQuantity: Number,
            estimate: {
                type: Number,
                default: 0
            },
            ref: "Product"
        }
    ],

    createdAt: { type: Date, required: true, default: Date.now },
    updatedAt: { type: Date, required: true, default: Date.now },
})

const Order = mongoose.model("Order", orderSchema);

export default Order;