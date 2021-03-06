import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import { useHistory, useLocation } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Button from "@mui/material/Button";

import { inject, observer } from "mobx-react";
import { observe } from "mobx";
import { Work, SchoolRounded, AddCircle, BarChart } from "@material-ui/icons";
import { Redirect } from "react-router-dom";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { format } from "date-fns";
import Avatar from "@material-ui/core/Avatar";
const useStyles = makeStyles((theme) => {
  return {
    page: {
      background: "#f9f9f9",
      width: "100%",
      padding: theme.spacing(3),
    },
    active: {
      background: "#45546e",
    },
    ListItemText: {
      color: "#ffffff",
    },
    ListItem: {
      "&:hover": {
        backgroundColor: "#303c4f",
      },
    },
  };
});

export default function StudentMenuItems() {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const menuItems = [
    {
      text: "Processes",
      icon: <Work color="secondary" />,
      path: "/",
    },
    {
      text: "Add Process",
      icon: <AddCircle color="secondary" />,
      path: "/addProcess",
    },
    {
      text: "Add Admin",
      icon: <AddCircle color="secondary" />,
      path: "/addAdmin",
    },
  ];

  return (
    <List>
      {menuItems.map((item) => (
        <ListItem
          button
          key={item.text}
          onClick={() => history.push(item.path)}
          className={`${
            location.pathname == item.path ? classes.active : null
          } ${classes.ListItem}`}
        >
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.text} className={classes.ListItemText} />
        </ListItem>
      ))}
    </List>
  );
}
