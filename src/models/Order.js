import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

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
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product"
            },

            productQuantity: {
                type: Number,
                default: 0
            },

            estimate: {
                type: Number,
                default: 0
            },

        }
    ],
    company: {
        type: String,
        default: ''
    },
    trackingNumber: {
        type: Number,
        default: 0
    },

    createdAt: { type: Date, required: true, default: Date.now },
    updatedAt: { type: Date, required: true, default: Date.now },
})

orderSchema.plugin(mongoosePaginate);

const Order = mongoose.model("Order", orderSchema);

export default Order;