import React, { useState } from "react";

import BarChartComponent from "./BarChart";
import { useAppContext } from "../context/appContext";
import Wrapper from "../assets/wrappers/ChartsContainer";

export default function ChartsContainer() {
  // eslint-disable-next-line
  const [barChart, setBarChart] = useState(true);
  const { monthlyApplications: data } = useAppContext();
  return (
    <Wrapper>
      <h4>Monthly Applications</h4>
      {barChart ? (
        <BarChartComponent data={data} />
      ) : (
        <BarChartComponent data={data} />
      )}
    </Wrapper>
  );
}
