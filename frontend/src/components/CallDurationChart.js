import React, { useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { supabase } from "../utils/supabaseClient";

const CallDurationChart = () => {
  const defaultData = [
    { day: "Mon", duration: 22 },
    { day: "Tue", duration: 45 },
    { day: "Wed", duration: 38 },
    { day: "Thu", duration: 55 },
    { day: "Fri", duration: 42 },
  ];

  const [data, setData] = useState(defaultData);
  const [email, setEmail] = useState("");
  const [inputValues, setInputValues] = useState({});
  const [isEmailSet, setIsEmailSet] = useState(false);
  const [loading, setLoading] = useState(false);

  // ✅ Step 1: Ask for email before showing the chart
  const handleEmailSubmit = () => {
    if (!email) return alert("Please enter a valid email.");
    setIsEmailSet(true);
    fetchChartData(email);
  };

  // ✅ Step 2: Fetch existing chart data from Supabase
  const fetchChartData = async (userEmail) => {
    setLoading(true);
    const { data: result, error } = await supabase
      .from("user_charts")
      .select("chart_data")
      .eq("email", userEmail)
      .single();

    if (error && error.code !== "PGRST116") {
      console.error("Error fetching:", error.message);
    }

    if (result && result.chart_data) {
      const confirmOverwrite = window.confirm(
        "Found existing chart data. Do you want to load it?"
      );
      if (confirmOverwrite) {
        setData(result.chart_data);
      }
    }
    setLoading(false);
  };

  // ✅ Step 3: Save updated chart data to Supabase
  const saveToSupabase = async (updatedData) => {
    if (!email) return alert("Please enter a valid email first.");
    const { error } = await supabase
      .from("user_charts")
      .upsert({ email, chart_data: updatedData });
    if (error) console.error("Error saving:", error.message);
    else alert("✅ Chart saved successfully!");
  };

  // ✅ Step 4: Handle user input changes
  const handleChange = (day, value) => {
    setInputValues((prev) => ({
      ...prev,
      [day]: value,
    }));
  };

  // ✅ Step 5: Update the chart with user values
  const handleUpdate = () => {
    const updatedData = data.map((item) => ({
      ...item,
      duration: Number(inputValues[item.day]) || item.duration,
    }));
    setData(updatedData);
    saveToSupabase(updatedData);
  };

  // ✅ Step 6: Show the email input first
  if (!isEmailSet) {
    return (
      <div
        style={{
          background: "white",
          padding: "25px",
          borderRadius: "12px",
          width: "50%",
          margin: "100px auto",
          textAlign: "center",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        }}
      >
        <h3>Enter your email to continue</h3>
        <input
          type="email"
          placeholder="example@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            padding: "10px",
            width: "80%",
            borderRadius: "6px",
            border: "1px solid #ccc",
            marginTop: "10px",
          }}
        />
        <br />
        <button
          onClick={handleEmailSubmit}
          style={{
            marginTop: "15px",
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Continue
        </button>
      </div>
    );
  }

  // ✅ Step 7: After email entered → show chart
  if (loading) return <p>Loading chart...</p>;

  return (
    <div className="chart-card">
      <h3>📞 Call Duration Analysis</h3>
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

      <div style={{ marginTop: "20px" }}>
        <h4>✏️ Update Call Duration</h4>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",
            gap: "10px",
          }}
        >
          {data.map((item) => (
            <div key={item.day}>
              <label>{item.day}</label>
              <input
                type="number"
                value={inputValues[item.day] || ""}
                onChange={(e) => handleChange(item.day, e.target.value)}
                placeholder={item.duration.toString()}
                style={{
                  width: "100%",
                  padding: "6px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
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
          Save & Update Chart
        </button>
      </div>
    </div>
  );
};

export default CallDurationChart;
