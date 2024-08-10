import { useState, useEffect } from "react";
import axios from "../axiosInterceptor";

const IncomeSection = ({ userId }) => {
  const [currentMonthIncome, setCurrentMonthIncome] = useState(0);
  const [previousMonthIncome, setPreviousMonthIncome] = useState(0);

  useEffect(() => {
    const fetchRentIncome = async () => {
      try {
        const response = await axios.get('http://localhost:5000/earning/monthly');
        const data = response.data;

        const currentMonth = new Date().getMonth() + 1; // Get current month num
        const previousMonth = currentMonth === 1 ? 12 : currentMonth - 1; // Get previous month

        const currentMonthData = data.find(item => item.no == currentMonth);
        const previousMonthData = data.find(item => item.no == previousMonth);

        setCurrentMonthIncome(currentMonthData ? currentMonthData.earnings : 0);
        setPreviousMonthIncome(previousMonthData ? previousMonthData.earnings : 0);

      } catch (error) {
        console.error("Error fetching income data:", error);
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
        <p className="text-2xl font-extrabold">ETB {currentMonthIncome.toFixed(2)}</p>
      </div>
      <p className=" mb-6 text-sm text-[#b5c1c5]">Compared to last month</p>
      <p className=" mb-6 text-sm">Last Month Income ETB {previousMonthIncome.toFixed(2)}</p>
    </div>
  );
};

export default IncomeSection;
