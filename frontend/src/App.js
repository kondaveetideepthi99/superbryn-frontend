import React from "react";
import Navbar from "./components/Navbar";
import ChartDashboard from "./components/ChartDashboard";
import "./index.css";

function App() {
  return (
    <div>
      <Navbar />
      <h2 className="main-title">Call Analytics Dashboard</h2>
      <ChartDashboard />
    </div>
  );
}

export default App;
