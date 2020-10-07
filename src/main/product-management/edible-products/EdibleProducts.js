import React, { useState } from "react";
import { Grid, Typography } from "@material-ui/core";

import CONSTANTS from "../../shared/Constants";
import AddEditRadioOption from "../../shared/common/AddEditRadioOption";
import AddEdibleProducts from "./AddEdibleProducts";

function EdibleProducts() {
  const [currentRadioOption, setCurrentRadioOption] = useState(
    CONSTANTS.PRODUCT_MANAGEMENT.RADIO_OPTIONS.ADD
  );

  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <Typography variant="h6" gutterBottom>
        {CONSTANTS.PRODUCT_MANAGEMENT.EDIBLE_PRODUCTS.TAB_NAME}
      </Typography>
      <AddEditRadioOption setCurrentRadioOption={setCurrentRadioOption} />
      {currentRadioOption === CONSTANTS.PRODUCT_MANAGEMENT.RADIO_OPTIONS.ADD ? (
        <AddEdibleProducts />
      ) : (
        <>view and edit edible products</>
      )}
    </Grid>
  );
}

export default EdibleProducts;
