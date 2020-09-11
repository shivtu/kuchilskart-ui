import React, { useState } from "react";

import {
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@material-ui/core";

function AddEditRadioOption({ setCurrentRadioOption }) {
  const [addOption, setAddOption] = useState(true);
  const [viewAndEditOption, setViewAndEditOption] = useState(false);

  function handleAddOption() {
    setAddOption(true);
    setViewAndEditOption(false);
    setCurrentRadioOption("Add");
  }

  function handleViewAnddEditOption() {
    setViewAndEditOption(true);
    setAddOption(false);
    setCurrentRadioOption("ViewAndEdit");
  }

  return (
    <FormControl component="fieldset">
      <RadioGroup row aria-label="position" name="position" defaultValue="top">
        <FormControlLabel
          value="Add"
          control={<Radio color="primary" checked={addOption} />}
          label="Add"
          labelPlacement="top"
          onChange={handleAddOption}
        />
        <FormControlLabel
          value="ViewAndEdit"
          control={<Radio color="primary" checked={viewAndEditOption} />}
          label="View and edit"
          labelPlacement="top"
          onChange={handleViewAnddEditOption}
        />
      </RadioGroup>
    </FormControl>
  );
}

export default AddEditRadioOption;
