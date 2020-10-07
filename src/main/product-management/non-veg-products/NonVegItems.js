import React, { useState } from "react";
import { Grid, Typography } from "@material-ui/core";

import CONSTANTS from "../../shared/Constants";
import AddEditRadioOption from "../../shared/common/AddEditRadioOption";

function NonVegItems() {
  const [currentRadioOption, setCurrentRadioOption] = useState("Add");
  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <Typography variant="h6" gutterBottom>
        {CONSTANTS.PRODUCT_MANAGEMENT.NON_VEGETARIAN_ITEMS.TAB_NAME}
      </Typography>
      <AddEditRadioOption setCurrentRadioOption={setCurrentRadioOption} />
      {currentRadioOption === CONSTANTS.PRODUCT_MANAGEMENT.RADIO_OPTIONS.ADD ? (
        <>add non-veg products</>
      ) : (
        <>view and edit non-veg products</>
      )}
    </Grid>
  );
}

export default NonVegItems;
