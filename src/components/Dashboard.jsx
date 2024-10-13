import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { parse, isWithinInterval, format, isValid } from "date-fns";
import TimeSeriesChart from "./TimeSeriesChart";
import ColumnChart from "./ColumnChart";
import SparklineChart from "./SparklineChart";

const monthMap = {
  January: "01",
  February: "02",
  March: "03",
  April: "04",
  May: "05",
  June: "06",
  July: "07",
  August: "08",
  September: "09",
  October: "10",
  November: "11",
  December: "12",
};

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isRange, setIsRange] = useState(false);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    fetch("/data.json")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    if (!isRange && startDate) {
      const singleDateData = data.filter((item) => {
        const dateStr = `${item.arrival_date_year}-${
          monthMap[item.arrival_date_month]
        }-${String(item.arrival_date_day_of_month).padStart(2, "0")}`;
        const date = parse(dateStr, "yyyy-MM-dd", new Date());
        if (!isValid(date)) {
          console.error("Invalid date:", dateStr);
          return false;
        }
        return format(date, "yyyy-MM-dd") === format(startDate, "yyyy-MM-dd");
      });
      setFilteredData(singleDateData);
    }
  }, [startDate, isRange, data]);

  const handleFilter = () => {
    if (isRange && startDate && endDate) {
      const rangeData = data.filter((item) => {
        const dateStr = `${item.arrival_date_year}-${
          monthMap[item.arrival_date_month]
        }-${String(item.arrival_date_day_of_month).padStart(2, "0")}`;
        const date = parse(dateStr, "yyyy-MM-dd", new Date());
        if (!isValid(date)) {
          console.error("Invalid date:", dateStr);
          return false;
        }
        return isWithinInterval(date, { start: startDate, end: endDate });
      });
      setFilteredData(rangeData);
    }
  };

  return (
    <div className="p-4 mt-2">
      <div className="flex items-center justify-center mb-4">
        <label className="mr-2">Click to Select Date Range:</label>
        <input
          type="checkbox"
          checked={isRange}
          onChange={() => setIsRange(!isRange)}
          className="mr-2"
        />
        {isRange ? (
          <div className="flex items-center">
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              placeholderText="Start Date"
              selectsStart
              startDate={startDate}
              endDate={endDate}
              className="mr-2 p-2 border rounded"
            />
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              placeholderText="End Date"
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              className="mr-2 p-2 border rounded"
            />
            <button
              onClick={handleFilter}
              className="p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            >
              Submit
            </button>
          </div>
        ) : (
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            placeholderText="Select Date"
            className="mr-2 p-2 border rounded"
          />
        )}
      </div>
      {filteredData.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TimeSeriesChart data={filteredData} />
          <ColumnChart data={filteredData} />
          <SparklineChart data={filteredData} type="adults" />
          <SparklineChart data={filteredData} type="children" />
        </div>
      ) : (
        <p className="text-center mt-64">
          No data available for the selected date. Please select a date or range
          from July to August 2024 for data.
        </p>
      )}
    </div>
  );
};

export default Dashboard;