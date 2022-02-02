import React from "react";
import Chart from "react-apexcharts";
////////////////////////////
import { inject, observer } from "mobx-react";
import { observe } from "mobx";
import { toJS } from "mobx";
/////////////////////////////

const PieChart = inject("adminStore")(
  observer((props) => {
    const labels = Object.keys(
      toJS(props.adminStore.acceptedStudentsPercentage)
    );
    const series = Object.values(
      toJS(props.adminStore.acceptedStudentsPercentage)
    );
    const options = { labels };

    return (
      <div className="donut">
        <h1 width="380px">{props.name}</h1>
        <Chart
          name="H1"
          options={options}
          series={series}
          type="pie"
          width="380"
        />
      </div>
    );
  })
);
export default PieChart;
