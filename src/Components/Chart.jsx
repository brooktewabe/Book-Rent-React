import { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import axios from "axios";

const Donut = () => {
  const [options, setOptions] = useState({
    labels: ["Fiction", "Self Help", "Business"],
  });
  const [series, setSeries] = useState([0, 0, 0]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categories = ["Fiction", "Self Help", "Business"];
        const counts = await Promise.all(
          categories.map(async (category) => {
            const response = await axios.get(`api/books/category/${category}`);
            return response.data; 
          })
        );

        setOptions({ labels: categories });
        setSeries(counts);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="donut bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between">
        <p>Available Books</p>
        <p className="bg-[#ddeaee]">Today</p>
      </div>
      <Chart options={options} series={series} type="donut" width="280" />
    </div>
  );
};

export default Donut;
