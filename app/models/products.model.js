module.exports = (mongoose) => {
  var schema = mongoose.Schema(
    {
      productName: {
        type: String,
        required: true,
        max: [127, "Max Length is 127 characters"],
      },
      productSlug: {
        type: String,
        required: true,
        max: [127, "Max Length is 127 characters"],
      },
      productCode: {
        type: String,
        required: true,
      },
      productQty: {
        type: Number,
        required: true,
      },
      productSize:  String,
      productColor: String,
      productTag: [],
      discountPrice: Number,
      sellingPrice: Number,
      shortDescp: String,
      longDescp: String,
      productThambnail: String,
      hotDeal: Boolean,
      featured: Boolean,
      status: Boolean,
      categoriesId: Number,
      subCategoriesId: Number,
      subSubCategoriesId: Number,
    },
    { timestamps: true }
  );

  const Products = mongoose.model("products", schema);
  return Products;
};
