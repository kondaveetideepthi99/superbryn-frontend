import React, { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const CallDurationChart = () => {
  // Step 1: Define initial (dummy) data
  const [data, setData] = useState([
    { day: "Mon", duration: 22 },
    { day: "Tue", duration: 45 },
    { day: "Wed", duration: 38 },
    { day: "Thu", duration: 55 },
    { day: "Fri", duration: 42 },
  ]);

  // Step 2: Handle input state (user-entered values)
  const [inputValues, setInputValues] = useState({
    Mon: "",
    Tue: "",
    Wed: "",
    Thu: "",
    Fri: "",
  });

  // Step 3: Update local state when user types
  const handleChange = (day, value) => {
    setInputValues((prev) => ({
      ...prev,
      [day]: value,
    }));
  };

  // Step 4: Apply the new values when "Update Chart" is clicked
  const handleUpdate = () => {
    const updatedData = data.map((item) => ({
      ...item,
      duration: Number(inputValues[item.day]) || item.duration,
    }));
    setData(updatedData);
    alert("✅ Chart updated!");
  };

  return (
    <div className="chart-card">
      <h3>📞 Call Duration Analysis</h3>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorDuration" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#007bff" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#007bff" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="duration"
            stroke="#007bff"
            fillOpacity={1}
            fill="url(#colorDuration)"
          />
        </AreaChart>
      </ResponsiveContainer>

      {/* Input fields to overwrite dummy data */}
      <div style={{ marginTop: "20px" }}>
        <h4>✏️ Update Call Duration (in mins)</h4>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",
            gap: "10px",
            marginTop: "10px",
          }}
        >
          {data.map((item) => (
            <div key={item.day}>
              <label>{item.day}</label>
              <input
                type="number"
                value={inputValues[item.day]}
                onChange={(e) => handleChange(item.day, e.target.value)}
                style={{
                  width: "100%",
                  padding: "5px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
                placeholder={item.duration.toString()}
              />
            </div>
          ))}
        </div>
        <button
          onClick={handleUpdate}
          style={{
            marginTop: "15px",
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Update Chart
        </button>
      </div>
    </div>
  );
};

export default CallDurationChart;
