import React, { useState } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";

function ViewAndEditVegitables() {
  const tableHeader = [
    "#",
    "Vegitable/Fruit name",
    "Variant",
    "Quantity",
    "Selling price",
    "Discount name",
    "Discounted price",
    "Taxed price",
    "Available",
    "Edit",
  ];

  const result = [
    {
      allProducts: [
        {
          vegitablesList: [
            {
              vegitableTableId: 1,
              vegitableName: "Apple",
              vegitableDescp: "Sweet banana",
              vegitableVariant: "regular",
              itemCategory: "Fruits & Vegitables",
              itemSubCategory: "Vegitables",
              vegitableRecepie: [null],
              vegitableSellingPrice: 30,
              vegitableOfferedDiscount: 7,
              vegitableOfferedDiscountName: "Loyalty discount",
              vegitableDiscountedPrice: 27.9,
              vegitableApplicableTaxes: ["cess"],
              vegitableTaxedPrice: 27.9837,
              vegitableQuantity: 10,
              vegitableAvailable: true,
              vegitableMeasureMentUnit: "dozen",
              denominationList: null,
              vegitableSubId: "apple-regular-0.0-30.0",
              vegitableImages: [
                "src/main/resources/assets/veg-images/veg-image-placeholder.png",
              ],
            },
            {
              vegitableTableId: 2,
              vegitableName: "Apple",
              vegitableDescp: "Sweet red apple",
              vegitableVariant: "Imported german green apples",
              itemCategory: "Fruits & Vegitables",
              itemSubCategory: "Vegitables",
              vegitableRecepie: [null],
              vegitableSellingPrice: 30,
              vegitableOfferedDiscount: 7,
              vegitableOfferedDiscountName: "Loyalty discount",
              vegitableDiscountedPrice: 27.9,
              vegitableApplicableTaxes: ["cess"],
              vegitableTaxedPrice: 27.9837,
              vegitableQuantity: 10,
              vegitableAvailable: true,
              vegitableMeasureMentUnit: "dozen",
              denominationList: null,
              vegitableSubId: "apple-imported german green apples-0.0-30.0",
              vegitableImages: [
                "src/main/resources/assets/veg-images/veg-image-placeholder.png",
              ],
            },
            {
              vegitableTableId: 3,
              vegitableName: "Apple",
              vegitableDescp: "Sweet red apple",
              vegitableVariant: "Kashmiri red apples",
              itemCategory: "Fruits & Vegitables",
              itemSubCategory: "Vegitables",
              vegitableRecepie: [null],
              vegitableSellingPrice: 30,
              vegitableOfferedDiscount: 7,
              vegitableOfferedDiscountName: "Loyalty discount",
              vegitableDiscountedPrice: 27.9,
              vegitableApplicableTaxes: ["cess"],
              vegitableTaxedPrice: 27.9837,
              vegitableQuantity: 10,
              vegitableAvailable: true,
              vegitableMeasureMentUnit: "dozen",
              denominationList: null,
              vegitableSubId: "apple-kashmiri red apples-0.0-30.0",
              vegitableImages: [
                "src/main/resources/assets/veg-images/veg-image-placeholder.png",
              ],
            },
            {
              vegitableTableId: 4,
              vegitableName: "Apple",
              vegitableDescp: "Sweet red apple",
              vegitableVariant: "Local",
              itemCategory: "Fruits & Vegitables",
              itemSubCategory: "Vegitables",
              vegitableRecepie: [null],
              vegitableSellingPrice: 30,
              vegitableOfferedDiscount: 7,
              vegitableOfferedDiscountName: "Loyalty discount",
              vegitableDiscountedPrice: 27.9,
              vegitableApplicableTaxes: ["cess"],
              vegitableTaxedPrice: 27.9837,
              vegitableQuantity: 10,
              vegitableAvailable: true,
              vegitableMeasureMentUnit: "dozen",
              denominationList: null,
              vegitableSubId: "apple-local-0.0-30.0",
              vegitableImages: [
                "src/main/resources/assets/veg-images/veg-image-placeholder.png",
              ],
            },
            {
              vegitableTableId: 5,
              vegitableName: "Onion",
              vegitableDescp: "Sweet onions for sambhar",
              vegitableVariant: "Local",
              itemCategory: "Fruits & Vegitables",
              itemSubCategory: "Vegitables",
              vegitableRecepie: [null],
              vegitableSellingPrice: 30,
              vegitableOfferedDiscount: 7,
              vegitableOfferedDiscountName: "Loyalty discount",
              vegitableDiscountedPrice: 27.9,
              vegitableApplicableTaxes: ["cess"],
              vegitableTaxedPrice: 27.9837,
              vegitableQuantity: 10,
              vegitableAvailable: true,
              vegitableMeasureMentUnit: "dozen",
              denominationList: null,
              vegitableSubId: "onion-local-0.0-30.0",
              vegitableImages: [
                "src/main/resources/assets/veg-images/veg-image-placeholder.png",
              ],
            },
            {
              vegitableTableId: 6,
              vegitableName: "Onion",
              vegitableDescp: "Regular onions from kerela farms",
              vegitableVariant: "Regular",
              itemCategory: "Fruits & Vegitables",
              itemSubCategory: "Vegitables",
              vegitableRecepie: [null],
              vegitableSellingPrice: 30,
              vegitableOfferedDiscount: 7,
              vegitableOfferedDiscountName: "Loyalty discount",
              vegitableDiscountedPrice: 27.9,
              vegitableApplicableTaxes: ["cess"],
              vegitableTaxedPrice: 27.9837,
              vegitableQuantity: 10,
              vegitableAvailable: true,
              vegitableMeasureMentUnit: "dozen",
              denominationList: null,
              vegitableSubId: "onion-regular-0.0-30.0",
              vegitableImages: [
                "src/main/resources/assets/veg-images/veg-image-placeholder.png",
              ],
            },
            {
              vegitableTableId: 7,
              vegitableName: "Banana",
              vegitableDescp: "Sweet riped yellow bananas",
              vegitableVariant: "Regular",
              itemCategory: "Fruits & Vegitables",
              itemSubCategory: "Vegitables",
              vegitableRecepie: [null],
              vegitableSellingPrice: 30,
              vegitableOfferedDiscount: 7,
              vegitableOfferedDiscountName: "Loyalty discount",
              vegitableDiscountedPrice: 27.9,
              vegitableApplicableTaxes: ["cess"],
              vegitableTaxedPrice: 27.9837,
              vegitableQuantity: 10,
              vegitableAvailable: true,
              vegitableMeasureMentUnit: "dozen",
              denominationList: null,
              vegitableSubId: "banana-regular-0.0-30.0",
              vegitableImages: [
                "src/main/resources/assets/veg-images/veg-image-placeholder.png",
              ],
            },
            {
              vegitableTableId: 8,
              vegitableName: "Banana",
              vegitableDescp: "Healthy seet elachi bananas",
              vegitableVariant: "elachi",
              itemCategory: "Fruits & Vegitables",
              itemSubCategory: "Vegitables",
              vegitableRecepie: [null],
              vegitableSellingPrice: 30,
              vegitableOfferedDiscount: 7,
              vegitableOfferedDiscountName: "Loyalty discount",
              vegitableDiscountedPrice: 27.9,
              vegitableApplicableTaxes: ["cess"],
              vegitableTaxedPrice: 27.9837,
              vegitableQuantity: 10,
              vegitableAvailable: true,
              vegitableMeasureMentUnit: "dozen",
              denominationList: null,
              vegitableSubId: "banana-elachi-0.0-30.0",
              vegitableImages: [
                "src/main/resources/assets/veg-images/veg-image-placeholder.png",
              ],
            },
            {
              vegitableTableId: 9,
              vegitableName: "Tomato",
              vegitableDescp: "Sweet red tomatoes",
              vegitableVariant: "Local",
              itemCategory: "Fruits & Vegitables",
              itemSubCategory: "Vegitables",
              vegitableRecepie: [null],
              vegitableSellingPrice: 30,
              vegitableOfferedDiscount: 7,
              vegitableOfferedDiscountName: "Loyalty discount",
              vegitableDiscountedPrice: 27.9,
              vegitableApplicableTaxes: ["cess"],
              vegitableTaxedPrice: 27.9837,
              vegitableQuantity: 10,
              vegitableAvailable: true,
              vegitableMeasureMentUnit: "dozen",
              denominationList: null,
              vegitableSubId: "tomato-local-0.0-30.0",
              vegitableImages: [
                "/home/shiben/Desktop/kucchil-kitchen/src/main/resources/assets/veg-images/2020-10-10T20:52:44.722359veg-image-placeholder.png",
              ],
            },
            {
              vegitableTableId: 10,
              vegitableName: "Tomato",
              vegitableDescp: "Sweet red tomatoes",
              vegitableVariant: "Hybrid",
              itemCategory: "Fruits & Vegitables",
              itemSubCategory: "Vegitables",
              vegitableRecepie: [null],
              vegitableSellingPrice: 30,
              vegitableOfferedDiscount: 7,
              vegitableOfferedDiscountName: "Loyalty discount",
              vegitableDiscountedPrice: 27.9,
              vegitableApplicableTaxes: ["cess"],
              vegitableTaxedPrice: 27.9837,
              vegitableQuantity: 10,
              vegitableAvailable: true,
              vegitableMeasureMentUnit: "dozen",
              denominationList: null,
              vegitableSubId: "tomato-hybrid-0.0-30.0",
              vegitableImages: [
                "/home/shiben/Desktop/kucchil-kitchen/src/main/resources/assets/veg-images/2020-10-10T20:53:48.796993Turtle.png",
              ],
            },
            {
              vegitableTableId: 11,
              vegitableName: "Tomato",
              vegitableDescp: "Sweet red tomatoes",
              vegitableVariant: "imported New Zealand",
              itemCategory: "Fruits & Vegitables",
              itemSubCategory: "Vegitables",
              vegitableRecepie: [null],
              vegitableSellingPrice: 30,
              vegitableOfferedDiscount: 7,
              vegitableOfferedDiscountName: "Loyalty discount",
              vegitableDiscountedPrice: 27.9,
              vegitableApplicableTaxes: ["cess"],
              vegitableTaxedPrice: 27.9837,
              vegitableQuantity: 10,
              vegitableAvailable: true,
              vegitableMeasureMentUnit: "dozen",
              denominationList: null,
              vegitableSubId: "tomato-imported new zealand-0.0-30.0",
              vegitableImages: [
                "/home/shiben/Desktop/kucchil-kitchen/src/main/resources/assets/veg-images/2020-10-10T21:08:36.789444Turtle.png",
              ],
            },
            {
              vegitableTableId: 10,
              vegitableName: "Tomato",
              vegitableDescp: "Sweet red tomatoes",
              vegitableVariant: "Hybrid",
              itemCategory: "Fruits & Vegitables",
              itemSubCategory: "Vegitables",
              vegitableRecepie: [null],
              vegitableSellingPrice: 30,
              vegitableOfferedDiscount: 7,
              vegitableOfferedDiscountName: "Loyalty discount",
              vegitableDiscountedPrice: 27.9,
              vegitableApplicableTaxes: ["cess"],
              vegitableTaxedPrice: 27.9837,
              vegitableQuantity: 10,
              vegitableAvailable: true,
              vegitableMeasureMentUnit: "dozen",
              denominationList: null,
              vegitableSubId: "tomato-hybrid-0.0-30.0",
              vegitableImages: [
                "/home/shiben/Desktop/kucchil-kitchen/src/main/resources/assets/veg-images/2020-10-10T20:53:48.796993Turtle.png",
              ],
            },
            {
              vegitableTableId: 11,
              vegitableName: "Tomato",
              vegitableDescp: "Sweet red tomatoes",
              vegitableVariant: "imported New Zealand",
              itemCategory: "Fruits & Vegitables",
              itemSubCategory: "Vegitables",
              vegitableRecepie: [null],
              vegitableSellingPrice: 30,
              vegitableOfferedDiscount: 7,
              vegitableOfferedDiscountName: "Loyalty discount",
              vegitableDiscountedPrice: 27.9,
              vegitableApplicableTaxes: ["cess"],
              vegitableTaxedPrice: 27.9837,
              vegitableQuantity: 10,
              vegitableAvailable: true,
              vegitableMeasureMentUnit: "dozen",
              denominationList: null,
              vegitableSubId: "tomato-imported new zealand-0.0-30.0",
              vegitableImages: [
                "/home/shiben/Desktop/kucchil-kitchen/src/main/resources/assets/veg-images/2020-10-10T21:08:36.789444Turtle.png",
              ],
            },
          ],
        },
        {
          FMCGProduct: [],
        },
        {
          edibleProductsList: [
            {
              edibleProductsTableId: 1,
              edibleProductManufacturer: "Nestle",
              edibleProductName: "Magi",
              edibleProductVariant: "Atta noodles",
              edibleProductFlavor: "Desi masala",
              edibleProductType: "Manufactured",
              edibleProductDescription:
                "Tasty Maggie atta noodles for healthy diet",
              edibleProductImageLocation: [],
              edibleProductGenericName: "Maggie",
              edibleProductAlternaleName: "Noodles",
              itemCategory: "Fruits & Vegitables",
              itemSubCategory: "Vegitables",
              edibleProductForMinors: true,
              edibleProductAvailable: true,
              edibleProductMrp: 20,
              edibleProductOfferedDiscount: 2,
              edibleProductsDiscountName: "Monsoon Offer",
              edibleProductDiscountedPrice: 19.6,
              edibleProductApplicableTaxes: ["cess"],
              edibleProductTaxedPrice: 19.6588,
              edibleProductQuantity: 50,
              edibleProductsMeasureMentUnit: "grams",
              edibleProductDenomination: 10,
              edibleProductSubId:
                "nestlemagiatta noodlesdesi masala10.02021-07-05",
            },
            {
              edibleProductsTableId: 2,
              edibleProductManufacturer: "ITC",
              edibleProductName: "Yippie",
              edibleProductVariant: "noodles",
              edibleProductFlavor: "Desi masala",
              edibleProductType: "Manufactured",
              edibleProductDescription:
                "Tasty Maggie atta noodles for healthy diet",
              edibleProductImageLocation: [
                "/home/shiben/Desktop/kucchil-kitchen/src/main/resources/assets/edible-product-images/2020-10-10T21:09:59.472170Turtle.png",
              ],
              edibleProductGenericName: "Maggie",
              edibleProductAlternaleName: "Noodles",
              itemCategory: "Fruits & Vegitables",
              itemSubCategory: "Vegitables",
              edibleProductForMinors: true,
              edibleProductAvailable: true,
              edibleProductMrp: 20,
              edibleProductOfferedDiscount: 2,
              edibleProductsDiscountName: "Monsoon Offer",
              edibleProductDiscountedPrice: 19.6,
              edibleProductApplicableTaxes: ["cess"],
              edibleProductTaxedPrice: 19.6588,
              edibleProductQuantity: 50,
              edibleProductsMeasureMentUnit: "grams",
              edibleProductDenomination: 10,
              edibleProductSubId: "itcyippienoodlesdesi masala10.02021-07-05",
            },
          ],
        },
      ],
    },
    {
      utilities: [
        {
          taxes: [
            {
              taxesTableId: 1,
              taxName: "cess",
              taxPercent: 0.3,
              additionalTaxInfo: "Krishi kalyan cess",
              shouldTaxApply: true,
              taxLastUpdatedBy: "phantom@gmail.com",
              taxLastUpdatedOn: "2020-10-10T19:22:07.992869",
            },
          ],
        },
        {
          customerOrderDiscount: [],
        },
        {
          itemCategories: [
            {
              itemCategoryTableId: 1,
              itemCategory: "Fruits & Vegitables",
              itemSubCategory: "Vegitables",
              itemCategorySubId: "fruits & vegitables-vegitables",
              itemCategoryInfo: "Vegitables only",
              itemCategoryLastUpdatedBy: "phantom@gmail.com",
              itemCategoryLastUpdatedOn: "2020-10-10T19:22:23.583415",
            },
          ],
        },
        {
          deliveryCharges: [],
        },
      ],
    },
  ];

  const [vegitables, setVegitables] = useState(
    result[0].allProducts[0].vegitablesList
  );

  function openEditMenu(subId) {
    alert("........", subId.f.f.f);
  }

  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            {tableHeader.map((head, i) => (
              <TableCell key={head}>{head}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {vegitables.map((vegitable, i) => (
            <TableRow key={vegitable.vegitableTableId}>
              <TableCell>{i + 1}</TableCell>
              <TableCell>{vegitable.vegitableName}</TableCell>
              <TableCell>{vegitable.vegitableVariant}</TableCell>
              <TableCell>{vegitable.vegitableQuantity}</TableCell>
              <TableCell>{vegitable.vegitableSellingPrice}</TableCell>
              <TableCell>{vegitable.vegitableOfferedDiscountName}</TableCell>
              <TableCell>{vegitable.vegitableDiscountedPrice}</TableCell>
              <TableCell>{vegitable.vegitableTaxedPrice}</TableCell>
              <TableCell>{String(vegitable.vegitableAvailable)}</TableCell>
              <TableCell>
                {
                  <Button
                    onClick={() => openEditMenu(vegitable.vegitableSubId)}
                  >
                    <EditIcon />
                  </Button>
                }
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

export default ViewAndEditVegitables;
