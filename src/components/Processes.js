import React from "react";
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

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  tableContainer: {
    borderRadius: 15,
    margin: "10px 130px",
    maxWidth: "80%",
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
    maxWidth: "65%",
  },
}));

let STATUSES = ["Active", "Pending", "Blocked"];

function Processes({ studentData }) {
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

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableHeaderCell}>
                <Typography variant="h6">Compnay Info</Typography>
              </TableCell>
              <TableCell className={classes.tableHeaderCell}>
                <Typography variant="h6">Job Info</Typography>
              </TableCell>
              <TableCell className={classes.tableHeaderCell}>
                <Typography variant="h6">Interview Date</Typography>
              </TableCell>
              <TableCell className={classes.tableHeaderCell}>
                <Typography variant="h6">Status</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {studentData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRow hover key={index}>
                  <TableCell>
                    <Grid container>
                      <Grid item lg={2}>
                        <Avatar
                          alt={row.CompanyName}
                          src="."
                          className={classes.avatar}
                        />
                      </Grid>
                      <Grid item lg={10}>
                        <Typography className={classes.name}>
                          {row.CompanyName}
                        </Typography>
                        <Typography color="textSecondary" variant="body2">
                          {row.Location}
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
                  <TableCell>22-02-22</TableCell>
                  <TableCell>
                    <Typography
                      className={classes.status}
                      style={{
                        backgroundColor:
                          (row.status === "open" && "green") ||
                          (row.status === "pending" && "blue") ||
                          (row.status === "blocked" && "red"),
                      }}
                    >
                      {row.status}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <TableFooter> */}
      <TablePagination
        className={classes.TablePagination}
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={studentData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
      {/* </TableFooter> */}
    </Paper>
  );
}

export default Processes;
