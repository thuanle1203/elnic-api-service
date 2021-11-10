module.exports = (mongoose) => {
  var schema = mongoose.Schema(
    {
      categoryName: {
        type: String,
        required: true,
        max: [127, "Max Length is 127 characters"],
      },
      categorySlug: {
        type: String,
        required: true,
        max: [127, "Max Length is 127 characters"],
      },
      categoryIcon: {
        type: String,
        required: true,
      }
    },
    { timestamps: true }
  );

  const Categories = mongoose.model("categories", schema);
  return Categories;
};
