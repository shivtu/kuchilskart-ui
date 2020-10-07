import React, { useState } from "react";
import { Grid, Typography } from "@material-ui/core";

import CONSTANTS from "../../shared/Constants";
import AddEditRadioOption from "../../shared/common/AddEditRadioOption";
import AddVegitables from "../vegitables/AddVegitables";
import ViewAndEditVegitables from "./ViewAndEditVegitables";

function Vegitables() {
  const [currentRadioOption, setCurrentRadioOption] = useState(
    CONSTANTS.PRODUCT_MANAGEMENT.RADIO_OPTIONS.ADD
  );

  const styles = {
    pageTitle: {
      marginRight: "20px",
    },
    radioControlSection: {
      marginTop: "30px",
      marginBottom: "30px",
    },
  };

  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        style={styles.radioControlSection}
      >
        <Typography variant="h6" style={styles.pageTitle}>
          {CONSTANTS.PRODUCT_MANAGEMENT.VEGITABLES.TAB_NAME}
        </Typography>
        <AddEditRadioOption setCurrentRadioOption={setCurrentRadioOption} />
      </Grid>
      {currentRadioOption === CONSTANTS.PRODUCT_MANAGEMENT.RADIO_OPTIONS.ADD ? (
        <AddVegitables />
      ) : (
        <ViewAndEditVegitables />
      )}
    </Grid>
  );
}

export default Vegitables;
