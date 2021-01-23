const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const date = require("../utils/date");

const orderSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "user",
            required: true
        },
        subTotal: {
            type: Number,
            required: true  
        },
        date: {
            type: String,
            default:date
        }
    },
    { timestamps: true }
);

const Order = mongoose.model("order", orderSchema);

module.exports = Order;