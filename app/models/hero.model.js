module.exports = (mongoose) => {
  var schema = mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
        max: [127, "Max Length is 127 characters"],
      },
      age: { type: Number, required: true },
      tthn: Boolean,
      address: String,
      userId: {
        type: String,
        required: true,
      },
      tag: [],
    },
    { timestamps: true }
  );

  const Hero = mongoose.model("hero", schema);
  return Hero;
};
