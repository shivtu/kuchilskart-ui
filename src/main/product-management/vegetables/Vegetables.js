import React, { useState, useEffect, useContext } from "react";
import { Grid, Typography } from "@material-ui/core";

import CONSTANTS from "../../shared/Constants";
import AddEditRadioOption from "../../shared/common/AddEditRadioOption";
import AddVegetables from "./AddVegetables";
import ViewAndEditVegetables from "./ViewAndEditVegetables";
import Spinner from "../../shared/common/Spinner";
import { AppContext } from "../../Home";
import { getAllVegetables } from "../../shared/services/RestApiServices";

function Vegetables({ vegetableTable, updateVegetableTable }) {
  const appData = useContext(AppContext);
  const jwtToken = appData.jwtToken;

  const [vegetables, setVegetables] = useState("");
  const [spinner, setSpinner] = useState(true);
  const [currentRadioOption, setCurrentRadioOption] = useState(
    CONSTANTS.PRODUCT_MANAGEMENT.RADIO_OPTIONS.VIEW_EDIT
  );

  const styles = {
    pageTitle: {
      marginRight: "20px",
    },
  };

  async function findAllVegetables() {
    setSpinner(true);
    const res = await getAllVegetables(jwtToken);
    if (res.result) {
      setVegetables(res);
      setSpinner(false);
      setCurrentRadioOption(
        CONSTANTS.PRODUCT_MANAGEMENT.RADIO_OPTIONS.VIEW_EDIT
      );
    }
    return res;
  }

  useEffect(() => {
    findAllVegetables();
  }, []);

  return (
    <>
      {spinner ? (
        <Grid container justify="center" alignItems="center">
          <Spinner size={100} />
        </Grid>
      ) : (
        <Grid container direction="column">
          <Grid container justify="center" alignItems="center">
            <Typography variant="h6" style={styles.pageTitle}>
              {CONSTANTS.PRODUCT_MANAGEMENT.VEGETABLES.TAB_NAME}
            </Typography>
            <AddEditRadioOption setCurrentRadioOption={setCurrentRadioOption} />
          </Grid>
          {currentRadioOption ===
          CONSTANTS.PRODUCT_MANAGEMENT.RADIO_OPTIONS.ADD ? (
            <AddVegetables findAllVegetables={findAllVegetables} />
          ) : (
            <ViewAndEditVegetables vegetables={vegetables} />
          )}
        </Grid>
      )}
    </>
  );
}

export default Vegetables;
