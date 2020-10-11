import React, { useState } from "react";
import CONSTANTS from "../Constants";
import {
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@material-ui/core";

function AddEditRadioOption({ setCurrentRadioOption }) {
  const [addOption, setAddOption] = useState(false);
  const [viewAndEditOption, setViewAndEditOption] = useState(true);

  function handleAddOption() {
    setAddOption(true);
    setViewAndEditOption(false);
    setCurrentRadioOption(CONSTANTS.PRODUCT_MANAGEMENT.RADIO_OPTIONS.ADD);
  }

  function handleViewAnddEditOption() {
    setViewAndEditOption(true);
    setAddOption(false);
    setCurrentRadioOption("ViewAndEdit");
  }

  // TODO: move strings to constants
  return (
    <FormControl component="fieldset">
      <RadioGroup row aria-label="position" name="position" defaultValue="top">
        <FormControlLabel
          value={CONSTANTS.PRODUCT_MANAGEMENT.RADIO_OPTIONS.VIEW_EDIT}
          control={<Radio color="primary" checked={viewAndEditOption} />}
          label={CONSTANTS.PRODUCT_MANAGEMENT.RADIO_OPTIONS.VIEW_EDIT}
          labelPlacement="end"
          onChange={handleViewAnddEditOption}
        />
        <FormControlLabel
          value={CONSTANTS.PRODUCT_MANAGEMENT.RADIO_OPTIONS.ADD}
          control={<Radio color="primary" checked={addOption} />}
          label={CONSTANTS.PRODUCT_MANAGEMENT.RADIO_OPTIONS.ADD}
          labelPlacement="end"
          onChange={handleAddOption}
        />
      </RadioGroup>
    </FormControl>
  );
}

export default AddEditRadioOption;
