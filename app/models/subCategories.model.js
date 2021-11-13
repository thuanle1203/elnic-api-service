module.exports = (mongoose) => {
  var schema = mongoose.Schema(
    {
      subCategoryName: {
        type: String,
        required: true,
        max: [127, "Max Length is 127 characters"],
      },
      subCategorySlug: {
        type: String,
        required: true,
        max: [127, "Max Length is 127 characters"],
      },
      subCategoryIcon: String,
      categoryId: String,
    },
    { timestamps: true }
  );

  const SubCategories = mongoose.model("subCategories", schema);
  return SubCategories;
};
