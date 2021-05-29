import React from "react";
import { render, screen } from "@testing-library/react";
import AddVegetables from "../AddVegetables";
import { AppContext } from "../../../Home";

describe("<AddVegitables", () => {
  const appContext = {
    appData: {
      jwtToken: "xxxxxxx",
      utilityData: {
        result: {
          deliveryCharges: [],
          customerOrderDiscount: [
            {
              discountId: 1,
              discountPercentage: 2.5,
              discountName: "Happy hours",
              discountLastUpdatedBy: "shibendutta@gmail.com",
              discountAddedOn: "2021-05-04T13:31:03.619052",
              discountActive: false,
            },
          ],
          taxes: [
            {
              taxesTableId: 1,
              taxName: "NA",
              taxPercent: 0.0,
              additionalTaxInfo: "Taxes not applicable",
              shouldTaxApply: true,
              taxLastUpdatedBy: "shibendutta@gmail.com",
              taxLastUpdatedOn: "2021-05-04T13:23:58.78539",
            },
          ],
          itemCategories: [
            {
              itemCategoryTableId: 1,
              itemCategory: "Fruits & Vegitables",
              itemSubCategory: "Fruits",
              itemCategorySubId: "fruits & vegitables-fruits",
              itemCategoryInfo: "Fruits only",
              itemCategoryLastUpdatedBy: "shibendutta@gmail.com",
              itemCategoryLastUpdatedOn: "2021-05-04T13:24:41.824121",
            },
            {
              itemCategoryTableId: 2,
              itemCategory: "Fruits & Vegitables",
              itemSubCategory: "Vegetables",
              itemCategorySubId: "fruits & vegitables-vegetables",
              itemCategoryInfo: "Vegetables only",
              itemCategoryLastUpdatedBy: "shibendutta@gmail.com",
              itemCategoryLastUpdatedOn: "2021-05-22T08:55:56.486573",
            },
          ],
        },
      },
    },
  };

  const defaultProps = {
    findAllVegitables: () => [],
  };

  const renderAddVegitables = () => {
    return render(
      <AppContext.Provider value={appContext}>
        <AddVegetables {...defaultProps} />
      </AppContext.Provider>
    );
  };

  test("should render all labels and helper text", () => {
    renderAddVegitables();

    expect(screen.getAllByText("Vegetable/Fruit name")[0]).toBeVisible();
    expect(screen.getAllByText("Vegetable/Fruit variant")[0]).toBeVisible();
    expect(screen.getAllByText("Expiry date")[0]).toBeVisible();
    expect(
      screen.getByText("Expiry date must always be a future date")
    ).toBeVisible();
    expect(
      screen.getAllByText("Description of the Fruit/Vegetable")[0]
    ).toBeVisible();
    expect(screen.getAllByText("Product sub-category")[0]).toBeVisible();
    expect(screen.getAllByText("Net Quantity")[0]).toBeVisible();
    expect(
      screen.getByText("This is the total quantity brought to the warehouse")
    ).toBeVisible();
    expect(screen.getAllByText("Measurement unit")[0]).toBeVisible();
    expect(
      screen.getByText("Cost is spread as per measurement unit")
    ).toBeVisible();

    // Fifth row
    expect(screen.getAllByText("Cost price")[0]).toBeVisible();
  });
});
