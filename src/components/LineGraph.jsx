import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from 'chart.js';
import 'chartjs-adapter-date-fns';
import Json from "../json.json";

Chart.register(...registerables);

function LineGraph({ casesType }) {
  const [data, setData] = useState([]);

  const buildChartData = (data, casesType) => {
    let chartData = [];
    let lastDataPoint;
    for (let date in data[casesType]) {
      if (lastDataPoint) {
        let newDataPoint = {
          x: date,
          y: data[casesType][date] - lastDataPoint,
        };
        chartData.push(newDataPoint);
      }
      lastDataPoint = data[casesType][date];
    }
    return chartData;
  };

  useEffect(() => {
    const fetchData = async () => {
      const chartData = buildChartData(Json, casesType);
      setData(chartData);
      console.log(chartData);
    };

    fetchData();
  }, [casesType]);

  const chartConfig = {
    labels: data.map(d => d.x),
    datasets: [
      {
        label: 'Cases',
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 400);
          gradient.addColorStop(0, 'rgba(204, 16, 52, 0.5)');
          gradient.addColorStop(1, 'rgba(204, 16, 52, 0)');
          return gradient;
        },
        borderColor: "#cc1034",
        data: data.map(d => d.y),  // Update data to map to the y-values
        fill: true,
      },
    ],
  };

  return (
    <div className="max-w-[35vmax] max-xl:max-w-full m-auto">
      <h1 className="font-medium text-gray-400">COVID-19 Cases Over Time</h1>
      {data.length > 0 ? (
        <Line style={{ position: 'relative', height: '70vh', width: '100%' }}
          data={chartConfig}
          options={{
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
              legend: {
                display: true,
                position: 'top',
              },
              tooltip: {
                mode: 'index',
                intersect: false,
              },
            },
            interaction: {
              mode: 'nearest',
              axis: 'x',
              intersect: false,
            },
            animation: {
              duration: 1000,
              easing: 'easeInOutQuad',
            },
          }}
        />
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};

export default LineGraph;
