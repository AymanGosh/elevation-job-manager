import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Grid,
  Typography,
  TablePagination,
  TableFooter,
} from "@material-ui/core";
import { IconButton } from "@mui/material";

////////////////////////////
import { inject, observer } from "mobx-react";
import { observe } from "mobx";
import { Work, SchoolRounded, AddCircle } from "@material-ui/icons";
/////////////////////////////
import NestedList from "./NestedList";
import FormDialog from "./FormDialog";

import Box from "@mui/material/Box";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  tableContainer: {
    borderRadius: 15,
    margin: "10px 30px",
    maxWidth: "90%",
  },
  tableHeaderCell: {
    fontWeight: "bold",
    color: "#0066ff",
  },
  avatar: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.getContrastText(theme.palette.primary.light),
    marginRight: "15px",
  },
  name: {
    fontWeight: "bold",
  },
  status: {
    fontWeight: "bold",
    fontSize: "0.75rem",
    color: "white",
    backgroundColor: "grey",
    borderRadius: 8,
    padding: "3px 10px",
    display: "inline-block",
  },
  TablePagination: {
    maxWidth: "32%",
  },
}));

let STATUSES = ["Active", "Pending", "Blocked"];

const Processes = inject("studentStore")(
  observer((props) => {
    /************************************************ */

    useEffect(async () => {
      await props.studentStore.addJobsFromDB();
    }, []);
    /************************************************ */
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };

    const getMostRecentInterview = function (interviews) {
      let mostRelevantInterview,
        interviewType = null;
      let maxDate = null;
      new Date(
        Math.max.apply(
          null,
          interviews.map(function (e) {
            maxDate = e.time;
            interviewType = e.type;
          })
        )
      );
      mostRelevantInterview =
        interviewType + ": " + maxDate.substring(0, maxDate.indexOf("T"));
      return mostRelevantInterview;
    };

    return (
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer component={Paper} className={classes.tableContainer}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className={classes.tableHeaderCell}>
                  <Typography variant="h6">Company Info</Typography>
                </TableCell>
                <TableCell className={classes.tableHeaderCell}>
                  <Typography variant="h6">Job Info</Typography>
                </TableCell>
                <TableCell className={classes.tableHeaderCell}>
                  <Typography variant="h6">Closest Interview</Typography>
                </TableCell>
                <TableCell className={classes.tableHeaderCell}>
                  <Typography variant="h6">Status</Typography>
                </TableCell>
                <TableCell className={classes.tableHeaderCell}>
                  <Typography variant="h6">Show History</Typography>
                </TableCell>
                {/* <TableCell className={classes.tableHeaderCell}>
                  <Typography variant="h6">Add new Interview</Typography>
                </TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {console.log(props.studentStore.StudentJobs)}
              {props.studentStore.StudentJobs.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
              ).map((row, index) => (
                <TableRow hover key={index}>
                  <TableCell>
                    <Grid container>
                      <Grid item lg={2}>
                        <Avatar
                          alt={row.companyName}
                          src="."
                          className={classes.avatar}
                        />
                      </Grid>
                      <Grid item lg={10}>
                        <Typography className={classes.name}>
                          {row.companyName}
                        </Typography>
                        <Typography color="textSecondary" variant="body2">
                          {row.location}
                        </Typography>
                        <Typography color="textSecondary" variant="body2">
                          I found it by {row.whereFindJob}
                        </Typography>
                      </Grid>
                    </Grid>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2">{row.role}</Typography>
                    <Typography color="textSecondary" variant="body2">
                      {row.description}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    {getMostRecentInterview(row.interviews)}
                  </TableCell>
                  <TableCell>
                    <Typography
                      className={classes.status}
                      style={{
                        backgroundColor:
                          (row.status === "Open" && "green") ||
                          (row.status === "Pending" && "blue") ||
                          (row.status === "Declined" && "red"),
                      }}
                    >
                      {row.status}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <NestedList />
                  </TableCell>
                  <TableCell>
                    <FormDialog jobId={22} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {/* <TableFooter> */}
        <TablePagination
          className={classes.TablePagination}
          rowsPerPageOptions={[5, 10]}
          component="div"
          count={props.studentStore.StudentJobs.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
        {/* </TableFooter> */}
      </Paper>
    );
  })
);

export default Processes;
