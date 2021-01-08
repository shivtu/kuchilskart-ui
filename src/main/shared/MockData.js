function utilityData() {
  return {
    jwtToken:
      "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzaGliZW5kdXR0YUBnbWFpbC5jb20iLCJleHAiOjE2MDk5MzI3NTEsImlhdCI6MTYwOTg5Njc1MX0.8DJ9Km9KiwTFL0ekToCq0L2-njrohgcSdZgovsg5Y3Y",
    utilityData: {
      statusCode: 200,
      statusMessage: "4 utilities found",
      result: {
        deliveryCharges: [],
        customerOrderDiscount: [
          {
            discountId: 1,
            discountPercentage: 3,
            discountName: "Monsoon Offer",
            discountLastUpdatedBy: "shibendutta@gmail.com",
            discountAddedOn: "2021-01-06T01:30:12.888128",
            discountActive: true,
          },
          {
            discountId: 2,
            discountPercentage: 2,
            discountName: "New year special",
            discountLastUpdatedBy: "shibendutta@gmail.com",
            discountAddedOn: "2021-01-06T01:30:39.760906",
            discountActive: true,
          },
          {
            discountId: 3,
            discountPercentage: 2.5,
            discountName: "Happy hours",
            discountLastUpdatedBy: "shibendutta@gmail.com",
            discountAddedOn: "2021-01-06T01:31:41.60678",
            discountActive: false,
          },
        ],
        taxes: [
          {
            taxesTableId: 1,
            taxName: "NA",
            taxPercent: 0,
            additionalTaxInfo: "Taxes not applicable",
            shouldTaxApply: true,
            taxLastUpdatedBy: "shibendutta@gmail.com",
            taxLastUpdatedOn: "2020-12-29T03:31:37.085934",
          },
        ],
        itemCategories: [
          {
            itemCategoryTableId: 1,
            itemCategory: "Fruits & Vegitables",
            itemSubCategory: "Vegitables",
            itemCategorySubId: "fruits & vegitables-vegitables",
            itemCategoryInfo: "Fruits only",
            itemCategoryLastUpdatedBy: "shibendutta@gmail.com",
            itemCategoryLastUpdatedOn: "2021-01-01T03:51:39.752742",
          },
          {
            itemCategoryTableId: 3,
            itemCategory: "Fruits & Vegitables",
            itemSubCategory: "Fruits",
            itemCategorySubId: "fruits & vegitables-fruits",
            itemCategoryInfo: "Fruits only",
            itemCategoryLastUpdatedBy: "shibendutta@gmail.com",
            itemCategoryLastUpdatedOn: "2021-01-01T04:39:04.624283",
          },
        ],
      },
    },
  };
}

export { utilityData };
