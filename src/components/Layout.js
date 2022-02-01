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
import Nav from "./Nav";
import { inject, observer } from "mobx-react";
import { observe } from "mobx";
import { Work, SchoolRounded, AddCircle, BarChart } from "@material-ui/icons";
import { Redirect } from "react-router-dom";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { format } from "date-fns";
import Avatar from "@material-ui/core/Avatar";

const drawerWidth = 230;

const useStyles = makeStyles((theme) => {
  return {
    page: {
      background: "#f9f9f9",
      width: "100%",
      padding: theme.spacing(3),
    },
    root: {
      display: "flex",
    },
    drawer: {
      width: drawerWidth,
    },
    drawerPaper: {
      width: drawerWidth,
      backgroundColor: "#29374e",
    },
    active: {
      background: "#45546e",
    },
    title: {
      padding: theme.spacing(2),
      color: "#ffffff",
      backgroundColor: "#212c3f",
    },
    appBar: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    date: {
      flexGrow: 1,
    },
    toolbar: theme.mixins.toolbar,
    avatar: {
      marginLeft: theme.spacing(2),
    },
    ListItemText: {
      color: "#ffffff",
    },
    ListItem: {
      "&:hover": {
        backgroundColor: "#303c4f",
      },
    },
    avatar: {
      backgroundColor: theme.palette.secondary.light,
      // color: theme.palette.getContrastText(theme.palette.primary.light),
      color: "#1a73e8",
      fontWeight: "bold",
      marginRight: "15px",
    },
  };
});

<<<<<<< HEAD
const Layout = inject("studentStore") (
observer((props) => {
  {
    /* the props children is all the comps from app.js under the switch */
  }
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  if(props.studentStore.firstName === '') {
    return <Redirect to="/"/>;
  }

  const menuItems = [
    {
      text: "Home",
      icon: <Work color="secondary" />,
      path: "/",
    },
    {
      text: "Processes",
      icon: <Work color="secondary" />,
      path: "/processes",
    },
    {
      text: "Add Process",
      icon: <AddCircle color="secondary" />,
      path: "/addProcess",
    },
    {
      text: "AdminPage",
      icon: <Work color="secondary" />,
      path: "/adminPage",
    },
    {
      text: "Login",
      icon: <Work color="secondary" />,
      path: "/login",
    },
=======
const Layout = inject("studentStore")(
  observer((props) => {
>>>>>>> main
    {
      /* the props children is all the comps from app.js under the switch */
    }
    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();

<<<<<<< HEAD
  return (
    <div className={classes.root}>
      {/* app bar */}
      <AppBar
        position="fixed"
        className={classes.appBar}
        elevation={0}
        color={"primary"}
      >
        <Toolbar>
          <Typography className={classes.date}>
            Today is the {format(new Date(), "do MMMM Y")}
          </Typography>
          <Typography>{props.studentStore.firstName}</Typography>
          <Avatar
            className={classes.avatar}
            src="https://media-exp1.licdn.com/dms/image/C4E03AQGzvBqaQHa1vw/profile-displayphoto-shrink_800_800/0/1631448072130?e=1648684800&v=beta&t=6122tVcQhDq7qdokhU5w-kFyImVX3OcGrJq6i1IMMck"
          />
          <Button variant="contained" color="secondary"
            onClick={() => {
              props.studentStore.logout()
            }}>Logout
          </Button>
        </Toolbar>
      </AppBar>
=======
    if (props.studentStore.name === "") {
      return <Redirect to="/" />;
    }
>>>>>>> main

    const menuItems = [
      {
        text: "Home",
        icon: <Work color="secondary" />,
        path: "/",
      },
      {
        text: "Processes",
        icon: <Work color="secondary" />,
        path: "/processes",
      },
      {
        text: "Add Process",
        icon: <AddCircle color="secondary" />,
        path: "/addProcess",
      },
      {
        text: "AdminPage",
        icon: <Work color="secondary" />,
        path: "/adminPage",
      },
      {
        text: "Login",
        icon: <Work color="secondary" />,
        path: "/login",
      },
      {
        text: "Register",
        icon: <Work color="secondary" />,
        path: "/register",
      },
      {
        text: "Dashboard",
        icon: <BarChart color="secondary" />,
        path: "/dashboard",
      },
      ,
    ];

    return (
      <div className={classes.root}>
        {/* app bar */}
        <AppBar
          position="fixed"
          className={classes.appBar}
          elevation={0}
          color={"primary"}
        >
          <Toolbar>
            <Typography className={classes.date}>
              Today is the {format(new Date(), "do MMMM Y")}
            </Typography>
            <Typography>{props.studentStore.name}</Typography>

            <Avatar
              alt={props.studentStore.name}
              src="."
              className={classes.avatar}
            />
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                props.studentStore.logout();
              }}
            >
              Logout
            </Button>
          </Toolbar>
        </AppBar>

        {/* side drawer */}
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{ paper: classes.drawerPaper }}
          anchor="left"
        >
          <div>
            <Typography variant="h5" className={classes.title}>
              <SchoolRounded color="secondary" /> ELEVATION
            </Typography>
          </div>

          {/* links/list section */}
          <List>
            {menuItems.map((item) => (
              <ListItem
                button
                key={item.text}
                onClick={() => history.push(item.path)}
                className={`${
                  location.pathname == item.path ? classes.active : null
                } ${classes.ListItem}`}
                //  to make the btns hover
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText
                  primary={item.text}
                  className={classes.ListItemText}
                />
              </ListItem>
            ))}
          </List>
        </Drawer>

        {/* main content */}
        <div className={classes.page}>
          <div className={classes.toolbar}>
            {/* to make some space under the toolbar|navBar */}
          </div>
          {props.children}
        </div>
      </div>
    );
  })
);

export default Layout;
