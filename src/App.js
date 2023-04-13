import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import Weather from "./components/Weather";
import Login from "./components/Login";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/weather" element={<Weather />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </div>
  );
}
