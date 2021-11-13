module.exports = (mongoose) => {
  var schema = mongoose.Schema(
    {
      userId: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true,
        max: [127, "Max Length is 127 characters"],
      },
      phone: {
        type: String,
        required: true,
        max: [127, "Max Length is 127 characters"],
      },
      productCode: {
        type: String,
        required: true,
      },
      note: String,
      postCode: String,
      paymentType: String,
      paymentMethod: String,
      transactionId: String,
      currency: String,
      amount: Number,
      orderNumber: String,
      invoiceNo: String,
      orderDate: Date,
      confirmDate: Date,
      shippedDate: Date,
      cancelDate: Date,
      cancelReason: String,
      status: Boolean,
    },
    { timestamps: true }
  );

  const Orders = mongoose.model("orders", schema);
  return Orders;
};
