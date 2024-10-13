/* eslint-disable react/prop-types */
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const ColumnChart = ({ data }) => {
  const countryData = data.reduce((acc, item) => {
    acc[item.country] =
      (acc[item.country] || 0) + item.adults + item.children + item.babies;
    return acc;
  }, {});

  const formattedData = Object.keys(countryData).map((country) => ({
    country,
    visitors: countryData[country],
  }));

  return (
    <div className="p-2 bg-white shadow-md rounded-lg mx-auto border  border-gray-500">
      <h1 className="mb-4 text-center">Number of visitors per country</h1>
      <BarChart width={500} height={250} data={formattedData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="country" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="visitors" fill="#8884d8" />
      </BarChart>
    </div>
  );
};

export default ColumnChart;
