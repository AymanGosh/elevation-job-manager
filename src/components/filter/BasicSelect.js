import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
////////////////////////////
import { inject, observer } from "mobx-react";
import { observe } from "mobx";
import { toJS } from "mobx";
/////////////////////////////
const BasicSelect = inject(
  "adminStore",
  "studentStore"
)(
  observer((props) => {
    const [menuItem, setMenuItem] = React.useState("");

    const handleChange = (event) => {
      let e = event.target.value;
      setMenuItem(e);

      if (props.selectBy === "Cohort") {
        console.log(props.selectBy);
        props.adminStore.sortPerCohortName(e);
      }
      if (props.selectBy === "Status") {
        // console.log("Status");
        props.adminStore.sortByStatus(e);
      }
    };

    return (
      <Box sx={{ minWidth: 100, maxWidth: 200 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">
            {props.selectBy}
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="menuItem"
            onChange={handleChange}
            value={menuItem}
          >
            {props.ArrMenuItems.map((item, index) => (
              <MenuItem key={index} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    );
  })
);
export default BasicSelect;
