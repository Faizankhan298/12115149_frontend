/* eslint-disable react/prop-types */
import { LineChart, Line, XAxis, YAxis, Tooltip, Brush } from "recharts";

const SparklineChart = ({ data, type }) => {
  const formattedData = data.map((item) => ({
    date: `${item.arrival_date_year}-${item.arrival_date_month}-${item.arrival_date_day_of_month}`,
    value: item[type],
  }));

  const totalValue = formattedData.reduce((acc, item) => acc + item.value, 0);

  return (
    <div className="p-2 bg-white shadow-md rounded-lg mt-4 mx-auto border border-gray-500">
      <h3 className="mb-4 text-center">
        Total {type.charAt(0).toUpperCase() + type.slice(1)} Visitors: {totalValue}
      </h3>
      <LineChart
        width={500}
        height={250}
        data={formattedData}
      >
        <XAxis dataKey="date"  />
        <YAxis  />
        <Tooltip />
        <Line type="monotone" dataKey="value" stroke="#8884d8" />
        <Brush dataKey="date" height={20} stroke="#8884d8" />
      </LineChart>
    </div>
  );
};

export default SparklineChart;