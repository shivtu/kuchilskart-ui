import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Tab, Tabs, Typography } from "@material-ui/core";
import TaxesTab from "./TaxesTab";
import DiscountsTab from "./DiscountsTab";
import ItemsCategoryTab from "./ItemsCategoryTab";
import DeliveryChargesTab from "./DeliveryChargesTab";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`product-settings-tabpanel-${index}`}
      aria-labelledby={`product-settings-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Typography component={"span"}>{children}</Typography>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `product-settings-tab-${index}`,
    "aria-controls": `product-settings-tabpanel-${index}`,
  };
}

export default function ProductSettingsTabs(props) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="product settings tabs"
      >
        <Tab label="Taxes" {...a11yProps(0)} />
        <Tab label="Item Categories" {...a11yProps(1)} />
        <Tab label="Discounts" {...a11yProps(2)} />
        <Tab label="Delivery charges" {...a11yProps(3)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <TaxesTab />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ItemsCategoryTab />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <DiscountsTab />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <DeliveryChargesTab />
      </TabPanel>
    </div>
  );
}
