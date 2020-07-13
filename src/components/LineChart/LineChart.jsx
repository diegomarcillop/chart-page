import React, { createRef, useEffect } from "react";
import Chart from "chart.js";

export default function LineChart({ country }) {
  const chartRef = createRef();
  const data = [];
  const labels = [];

  useEffect(() => {
    if (country !== null) {
      // eslint-disable-next-line
      country.map((contry, index) => {
        data[index] = country[index].Deaths;
        labels[index] = index;
      });
    }
  });

  useEffect(() => {
    const myChartRef = chartRef.current.getContext("2d");
    new Chart(myChartRef, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Deaths",
            backgroundColor: "rgba(255,99,132,1)",
            borderColor: "#FFFAF9",
            data: data,
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              stacked: true,
            },
          ],
        },
        responsive: true,
      },
    });
  });

  return <canvas id="myChart" ref={chartRef} />;
}
