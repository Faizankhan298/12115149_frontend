/* eslint-disable react/prop-types */
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Brush,
} from "recharts";

const TimeSeriesChart = ({ data }) => {
  const formattedData = data.map((item) => ({
    date: `${item.arrival_date_year}-${item.arrival_date_month}-${item.arrival_date_day_of_month}`,
    visitors: item.adults + item.children + item.babies,
  }));

  return (
    <div className="p-2 bg-white shadow-md rounded-lg mx-auto border border-gray-500">
      <h1 className="mb-4 text-center"> Number of visitors per day</h1>
      <LineChart width={500} height={250} data={formattedData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="visitors" stroke="#8884d8" dot={false} />
        <Brush dataKey="date" height={20} stroke="#8884d8" />
      </LineChart>
    </div>
  );
};

export default TimeSeriesChart;
