module.exports = (mongoose) => {
  var schema = mongoose.Schema(
    {
      couponName: {
        type: String,
        required: true,
        max: [127, "Max Length is 127 characters"],
      },
      couponDiscount: Number,
      couponValidity: Date,
      status: Boolean,
    },
    { timestamps: true }
  );

  const Coupons = mongoose.model("coupons", schema);
  return Coupons;
};
