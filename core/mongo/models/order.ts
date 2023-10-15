import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema(
  {
    id: String,
    totalPrice: Number,
    status: String,
    paymentMethod: String,
    imageUrl: String,
    returnPrice: String,
    demographics: Map,
    firebaseCreatedAt: String,
    firebaseUpdatedAt: String,
    dishes: [
      {
        name: String,
        size: String,
        toppings: Map,
        amount: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
