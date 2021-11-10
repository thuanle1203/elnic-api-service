module.exports = (mongoose) => {
  var schema = mongoose.Schema(
    {
      tagName: {
        type: String,
        required: true,
        max: [127, "Max Length is 127 characters"],
      }
    },
    { timestamps: true }
  );

  const Tags = mongoose.model("tags", schema);
  return Tags;
};
