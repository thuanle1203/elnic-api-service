module.exports = (mongoose) => {
  var schema = mongoose.Schema(
    {
      title: String,
      description: String,
      imgUrl: String,
      status: Boolean,
    },
    { timestamps: true }
  );

  const Sliders = mongoose.model("sliders", schema);
  return Sliders;
};
