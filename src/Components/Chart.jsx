import { useState } from 'react';
import Chart from 'react-apexcharts';

const Donut = () => {
  const [options] = useState({
    labels: ['Fiction', 'Self Help', 'Business']
  });
  const [series] = useState([44, 55, 41]);
  

  return (
    <>
      <div className="donut bg-white p-6 rounded-lg shadow-md">
        <div className='flex justify-between'>
            <p>Available Books</p>
            <p className='bg-[#ddeaee]'>Today</p>
        </div>
        {/* <Chart options={options} series={series} type="pie" width="300" height={500} /> */}
        <Chart options={options} series={series} type="donut" width="280" />
      </div>
    </>
  );
};

export default Donut;