import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productSchema = new mongoose.Schema({
    /* EX) Inverter Module Optimize */
    productType: {
        type: String,
        required: true
    },

    /* SUNGROW, FIMER, HUNDAI, HANWHA Q CELL, OCI POWER, KSTAR, SOLIS, SHIN SUNG E&G, ETC */
    productMaker: {
        type: String,
        required: true
    },

    productImage: {
        type: String
    },

    productName: {
        type: String,
        required: true
    },

    productSubHead: {
        type: String,
        required: true,
    },

    productSpecs: [
        {
            specTitle: {
                type: String
            },
            specSubTitle: {
                type: String
            }
        }
    ],

    productDataSheet: {
        type: String
    }
})

productSchema.plugin(mongoosePaginate);

const Product = mongoose.model("Product", productSchema);

export default Product;