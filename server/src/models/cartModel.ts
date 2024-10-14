import mongoose from "mongoose";
const Schema = mongoose.Schema;

const cartSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  totalPrice: { type: Number },
  items: [
    {
      product: { type: Schema.Types.ObjectId, ref: "Product" },
      quantity: { type: Number },
      orderState: {
        pending: { type: Boolean },
        shipped: { type: Boolean },
      },
    },
  ],
});

module.exports = mongoose.model("Cart", cartSchema);
