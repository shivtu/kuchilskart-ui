import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import PeopleAltOutlinedIcon from "@material-ui/icons/PeopleAltOutlined";
import AccountBalanceWalletOutlinedIcon from "@material-ui/icons/AccountBalanceWalletOutlined";
import AirportShuttleOutlinedIcon from "@material-ui/icons/AirportShuttleOutlined";
import NoteOutlinedIcon from "@material-ui/icons/NoteOutlined";
import SettingsApplicationsOutlinedIcon from "@material-ui/icons/SettingsApplicationsOutlined";
import PermDataSettingOutlinedIcon from "@material-ui/icons/PermDataSettingOutlined";

import CustomerOrders from "../customer-orders/CustomerOrders";
import ProductManagement from "../product-management/ProductManagement";
import ProductSettings from "../product-settings/ProductSettings";
import Customers from "../customers/Customers";
import Accounts from "../accounts/Accounts";
import Reports from "../reports/Reports";
import Settings from "../settings/Settings";
import Dashboard from "../dashboard/Daahboard";

import CONSTANTS from "../shared/Constants";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(2),
  },
}));

export default function NavigationMenu() {
  const classes = useStyles();

  const [currentNav, setCurrentNav] = useState(<></>);

  const switchNavItem = () => {
    switch (currentNav) {
      case CONSTANTS.NAVIGATION.CUSTOMERORDERS.ID:
        return <CustomerOrders />;
      case CONSTANTS.NAVIGATION.PRODUCTMANAGEMENT.ID:
        return <ProductManagement />;
      case CONSTANTS.NAVIGATION.PRODUCTSETTINGS.ID:
        return <ProductSettings />;
      case CONSTANTS.NAVIGATION.CUSTOMERS.ID:
        return <Customers />;
      case CONSTANTS.NAVIGATION.ACCOUNTS.ID:
        return <Accounts />;
      case CONSTANTS.NAVIGATION.REPORTS.ID:
        return <Reports />;
      case CONSTANTS.NAVIGATION.SETTINGS.ID:
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  const navigationItems = [
    {
      id: CONSTANTS.NAVIGATION.CUSTOMERORDERS.ID,
      name: CONSTANTS.NAVIGATION.CUSTOMERORDERS.NAME,
      icon: <AirportShuttleOutlinedIcon />,
    },
    {
      id: CONSTANTS.NAVIGATION.PRODUCTMANAGEMENT.ID,
      name: CONSTANTS.NAVIGATION.PRODUCTMANAGEMENT.NAME,
      icon: <ShoppingCartOutlinedIcon />,
    },
    {
      id: CONSTANTS.NAVIGATION.PRODUCTSETTINGS.ID,
      name: CONSTANTS.NAVIGATION.PRODUCTSETTINGS.NAME,
      icon: <PermDataSettingOutlinedIcon />,
    },
    {
      id: CONSTANTS.NAVIGATION.CUSTOMERS.ID,
      name: CONSTANTS.NAVIGATION.CUSTOMERS.NAME,
      icon: <PeopleAltOutlinedIcon />,
    },
    {
      id: CONSTANTS.NAVIGATION.ACCOUNTS.ID,
      name: CONSTANTS.NAVIGATION.ACCOUNTS.NAME,
      icon: <AccountBalanceWalletOutlinedIcon />,
    },
    {
      id: CONSTANTS.NAVIGATION.REPORTS.ID,
      name: CONSTANTS.NAVIGATION.REPORTS.NAME,
      icon: <NoteOutlinedIcon />,
    },
    {
      id: CONSTANTS.NAVIGATION.SETTINGS.ID,
      name: CONSTANTS.NAVIGATION.SETTINGS.NAME,
      icon: <SettingsApplicationsOutlinedIcon />,
    },
  ];

  const handleNavigation = (navItemId) => {
    setCurrentNav(navItemId);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h5" className={classes.title}>
            Kuchil's Kart
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={classes.toolbar} />
        <Divider />
        <List>
          {navigationItems.map((navItem, index) => (
            <ListItem
              button
              key={`${navItem.id}-${index}`}
              onClick={() => handleNavigation(navItem.id)}
            >
              <>
                <ListItemIcon>{navItem.icon}</ListItemIcon>
                <ListItemText primary={navItem.name} />
              </>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {switchNavItem()}
      </main>
    </div>
  );
}
