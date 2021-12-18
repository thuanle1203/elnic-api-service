module.exports = (mongoose) => {
  var schema = mongoose.Schema(
    {
      userId: {
        type: String,
        required: true
      },
      sumarry: String,
      rating: Number,
      status: Boolean,
      productId: String
    },
    { timestamps: true }
  );

  const Reviews = mongoose.model("reviews", schema);
  return Reviews;
};
