import React, { useState, useEffect, useContext } from "react";
import { Grid, Typography } from "@material-ui/core";

import CONSTANTS from "../../shared/Constants";
import AddEditRadioOption from "../../shared/common/AddEditRadioOption";
import AddVegitables from "../vegitables/AddVegitables";
import ViewAndEditVegitables from "./ViewAndEditVegitables";
import Spinner from "../../shared/common/Spinner";
import { AppContext } from "../../Home";
import { getAllVegitables } from "../../shared/services/RestApiServices";

function Vegitables({ vegitableTable, updateVegitableTable }) {
  const { appData, setAppData } = useContext(AppContext);
  const jwtToken = appData.jwtToken;

  const [vegitables, setVegitables] = useState("");
  const [spinner, setSpinner] = useState(true);
  const [currentRadioOption, setCurrentRadioOption] = useState(
    CONSTANTS.PRODUCT_MANAGEMENT.RADIO_OPTIONS.VIEW_EDIT
  );

  const styles = {
    pageTitle: {
      marginRight: "20px",
    },
  };

  async function findAllVegitables() {
    try {
      setSpinner(true);
      const res = await getAllVegitables(jwtToken);
      if (res.result) {
        setVegitables(res);
        setCurrentRadioOption(
          CONSTANTS.PRODUCT_MANAGEMENT.RADIO_OPTIONS.VIEW_EDIT
        );
      }
      setSpinner(false);
      return res;
    } catch (err) {
      setSpinner(false);
    }
  }

  useEffect(() => {
    findAllVegitables();
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
              {CONSTANTS.PRODUCT_MANAGEMENT.VEGITABLES.TAB_NAME}
            </Typography>
            <AddEditRadioOption setCurrentRadioOption={setCurrentRadioOption} />
          </Grid>
          {currentRadioOption ===
          CONSTANTS.PRODUCT_MANAGEMENT.RADIO_OPTIONS.ADD ? (
            <AddVegitables findAllVegitables={findAllVegitables} />
          ) : (
            <ViewAndEditVegitables vegitables={vegitables} />
          )}
        </Grid>
      )}
    </>
  );
}

export default Vegitables;
