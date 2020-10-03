import React from "react";
import PropTypes from "prop-types";
import { Typography, Tab, Tabs } from "@material-ui/core";
import CONSTANTS from "../shared/Constants";
import Vegitables from "./vegitables/Vegitables";
import EdibleProducts from "./edible-products/EdibleProducts";
import FMCGProducts from "./fmcg-products/FMCGProducts";
import NonVegProducts from "./non-veg-products/NonVegProducts";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`product-management-tabpanel-${index}`}
      aria-labelledby={`product-management-tab-${index}`}
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
    id: `product-management-tab-${index}`,
    "aria-controls": `product-management-tabpanel-${index}`,
  };
}

export default function ProductManagement() {
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
        <Tab
          label={CONSTANTS.PRODUCTMANAGEMENT.VEGITABLES.TABNAME}
          {...a11yProps(0)}
        />
        <Tab
          label={CONSTANTS.PRODUCTMANAGEMENT.EDIBLEPRODUCTS.TABNAME}
          {...a11yProps(1)}
        />
        <Tab
          label={CONSTANTS.PRODUCTMANAGEMENT.FMCGPRODUCTS.TABNAME}
          {...a11yProps(2)}
        />
        <Tab label={"Non veg products"} {...a11yProps(3)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Vegitables />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <EdibleProducts />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <FMCGProducts />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <NonVegProducts />
      </TabPanel>
    </div>
  );
}
