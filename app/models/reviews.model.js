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
      productId: String,
      username: String,
      userAvatar: String,
      bought: Boolean
    },
    { timestamps: true }
  );

  const Reviews = mongoose.model("reviews", schema);
  return Reviews;
};
