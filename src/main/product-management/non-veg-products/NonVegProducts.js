import React, { useState } from "react";
import { Grid, Typography } from "@material-ui/core";

import CONSTANTS from "../../shared/Constants";
import AddEditRadioOption from "../../shared/common/AddEditRadioOption";

function NonVegProducts() {
  const [currentRadioOption, setCurrentRadioOption] = useState("Add");
  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <Typography variant="h4" gutterBottom>
        {currentRadioOption === "Add"
          ? CONSTANTS.PRODUCTMANAGEMENT.VEGITABLES.ADDTITLE
          : CONSTANTS.PRODUCTMANAGEMENT.VEGITABLES.VIEWANDEDITTILE}
      </Typography>
      <AddEditRadioOption setCurrentRadioOption={setCurrentRadioOption} />
      {currentRadioOption === "Add" ? (
        <>add non-veg products</>
      ) : (
        <>view and edit non-veg products</>
      )}
    </Grid>
  );
}

export default NonVegProducts;
