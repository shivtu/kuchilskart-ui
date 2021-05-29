import React, { useState, useEffect, useContext } from "react";
import { Grid, Typography } from "@material-ui/core";

import CONSTANTS from "../../shared/Constants";
import AddEditRadioOption from "../../shared/common/AddEditRadioOption";
import AddVegetables from "./AddVegetables";
import ViewAndEditVegetables from "./ViewAndEditVegetables";
import Spinner from "../../shared/common/Spinner";
import { AppContext } from "../../Home";
import { getAllVegetables } from "../../shared/services/RestApiServices";

function Vegetables() {
  const { appData } = useContext(AppContext);
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
    try {
      setSpinner(true);
      const res = await getAllVegetables(jwtToken);
      if (res.result) {
        setVegetables(res.result);
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
    findAllVegetables();
  }, []);

  const renderCurrentRadioOptions = () => (
    <Grid container justify="center" alignItems="center">
      <Typography variant="h6" style={styles.pageTitle}>
        {CONSTANTS.PRODUCT_MANAGEMENT.VEGETABLES.TAB_NAME}
      </Typography>
      <AddEditRadioOption setCurrentRadioOption={setCurrentRadioOption} />
    </Grid>
  );

  const renderVegetables = () => {
    if (spinner) {
      return (
        <Grid container justify="center" alignItems="center">
          <Spinner size={100} />
        </Grid>
      );
    }

    if (
      currentRadioOption ===
      CONSTANTS.PRODUCT_MANAGEMENT.RADIO_OPTIONS.VIEW_EDIT
    ) {
      return (
        <>
          {renderCurrentRadioOptions()}
          <ViewAndEditVegetables vegetables={vegetables} />
        </>
      );
    }

    if (currentRadioOption === CONSTANTS.PRODUCT_MANAGEMENT.RADIO_OPTIONS.ADD) {
      return (
        <>
          {renderCurrentRadioOptions()}
          <AddVegetables findAllVegetables={findAllVegetables} />
        </>
      );
    }

    return <>Error fallback</>;
  };

  return renderVegetables();
}

export default Vegetables;
