import { useState, useEffect } from "react";
import axios from "../axiosInterceptor";

const IncomeSection = ({ userId }) => {
  const [rentIncome, setRentIncome] = useState(0);

  useEffect(() => {
    const fetchRentIncome = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/profile/${userId}`);
        setRentIncome(response.data.rentIncome);
      } catch (error) {
        console.error("Error fetching rent income:", error);
      }
    };

    fetchRentIncome();
  }, [userId]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between">            
      <h3 className="text-lg mb-6 text-violet-950">Income</h3>
      <h3 className="bg-[#e0e9ec] text-sm py-1 px-2 mb-2">This Month</h3>
        </div>
        <hr />
      <div className="mt-4">
        <p className="text-2xl font-extrabold">ETB {rentIncome.toFixed(2)}</p>
      </div>
      <p className="text-lg mb-6 text-sm text-[#b5c1c5] ">Compared to last month </p>
      <p className="text-lg mb-6 text-sm ">Last Month Income  ETB {rentIncome.toFixed(2)}</p>
    </div>
  );
};

export default IncomeSection;
