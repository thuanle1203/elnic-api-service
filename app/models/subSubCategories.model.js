const { subCategories } = require(".");

module.exports = (mongoose) => {
  var schema = mongoose.Schema(
    {
      subSubCategoryName: {
        type: String,
        required: true,
        max: [127, "Max Length is 127 characters"],
      },
      subSubCategorySlug: {
        type: String,
        required: true,
        max: [127, "Max Length is 127 characters"],
      },
      subSubCategoryIcon: String,
      subCategoryId: String
    },
    { timestamps: true }
  );

  const SubSubCategories = mongoose.model("subSubCategories", schema);
  return SubSubCategories;
};
