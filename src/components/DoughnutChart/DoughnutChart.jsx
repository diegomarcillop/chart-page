import React, { createRef, useEffect } from "react";
import Chart from "chart.js";
import { useState } from "react";

export default function DoughnutChart({country}){
  const chartRef = createRef();
    const [status, setStatus] = useState([{deaths: 0, recovered: 0}])

 useEffect(() => {
   if(country!==null){
    let recovered = 0, deaths = 0;  
    country.map((contry, index) => {
      recovered =  recovered + country[index].Recovered;
      deaths =  deaths + country[index].Deaths;
    });
    setStatus({deaths: deaths, recovered: recovered});
   }
 },[country])


  useEffect(() => {
    const myChartRef = chartRef.current.getContext("2d");
    new Chart(myChartRef, {
      type: "doughnut",
      data: {
        labels: ['Deaths', 'Recovered'],
        datasets: [{
          label: '# of Tomatoes',
          data: [status.deaths, status.recovered],
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.2)',
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true
      },
      
    });
  });

  return (
       <canvas id="myChart" ref={chartRef} />
   );
}