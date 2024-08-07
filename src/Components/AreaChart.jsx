import Chart from 'react-apexcharts';

const AreaChart = () => {
  const options = {
    chart: {
      height: 280,
      type: 'area',
    },
    dataLabels: {
      enabled: false,
    },
    series: [
      {
        name: 'Series 1',
        data: [455, 552, 358, 455, 159, 253, 25],
      },
    ],
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
        stops: [0, 90, 100],
      },
    },
    xaxis: {
      categories: [
        '01 Jan',
        '02 Jan',
        '03 Jan',
        '04 Jan',
        '05 Jan',
        '06 Jan',
        '07 Jan',
      ],
    },
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <Chart options={options} series={options.series} type="area" height={280} />
    </div>
  );
};

export default AreaChart;
