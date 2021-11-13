module.exports = (mongoose) => {
  var schema = mongoose.Schema(
    {
      price: {
        type: Number,
        required: true
      },
      qty: Number,
      size: String,
      color: String,
      orderId: {
        type: String,
        required: true
      },
      productId: {
        type: String,
        required: true
      },
      status: Boolean,
    },
    { timestamps: true }
  );

  const OrderItem = mongoose.model("orderItem", schema);
  return OrderItem;
};
