async function authenticateUser() {
  // TODO: replace auth api call simulation with api call
  return { jwt: "qwerty" };
}

async function fetchUtilityData(authToken) {
  // TODO: replace utility fetch api call simulation with api call
  const validated = {
    response: {
      statusCode: 200,
      statusMessage: "2 utilities found",
      result: [
        {
          deliveryCharges: [],
          customerOrdersDiscounts: [],
          taxes: [
            {
              taxesTableId: 1,
              taxName: "cess",
              taxPercent: 0.3,
              additionalTaxInfo: "Krishi kalyan cess",
              shouldTaxApply: true,
              taxLastUpdatedBy: "batman@gmail.com",
              taxLastUpdatedOn: "2020-10-03T18:23:08.342097",
            },
          ],
          itemCategories: [
            {
              itemCategoryTableId: 1,
              itemCategory: "Fruits & Vegitables",
              itemSubCategory: "Vegitables",
              itemCategorySubId: "fruits & vegitables-vegitables",
              itemCategoryInfo: "Vegitables only",
              itemCategoryLastUpdatedBy: "batman@gmail.com",
              itemCategoryLastUpdatedOn: "2020-10-03T18:21:47.048926",
            },
          ],
        },
      ],
    },
  };
  return validated;
}

async function fetchAllVegitables() {}

export { authenticateUser, fetchUtilityData, fetchAllVegitables };
