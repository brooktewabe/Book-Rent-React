import { useState, useEffect } from "react";
import axios from "../axiosInterceptor";
import Chart from "react-apexcharts";

const AreaChart = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchEarningsData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/earning/monthly');
        const monthlyData = response.data;

        const months = monthlyData.map(item => item.month);
        const earnings = monthlyData.map(item => parseFloat(item.earnings.toFixed(2)));

        setData({
          series: [{
            name: 'Earnings',
            data: earnings
          }],
          options: {
            chart: {
              type: 'area',
              height: 350
            },
            xaxis: {
              categories: months
            },
            title: {
              text: 'Monthly Earnings',
              align: 'left'
            },
            colors: ['#008FFB']
          }
        });
      } catch (error) {
        console.error("Error fetching earnings data:", error);
      }
    };

    fetchEarningsData();
  }, []);

  return (
    <div>
      {data.series ? (
        <Chart
          options={data.options}
          series={data.series}
          type="area"
          height={350}
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default AreaChart;
