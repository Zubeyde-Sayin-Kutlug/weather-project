import React, { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes, Navigate } from "react-router-dom";
import Weather from "./components/Weather";
import Login from "./components/Login";

const ProtectedRoute = ({ isLogin, children }) => {
  if (!isLogin) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default function App() {
  const [isLogin, setIsLogin] = useState(false);
  const getItem = JSON.parse(localStorage.getItem("zubeydes"));
  // console.log(JSON.parse(getItem));
  useEffect(() => {
    if (getItem && getItem?.password && getItem?.email) {
      setIsLogin(true);
    }
  }, [getItem]);
  return (
    <div>
      <Routes>
        <Route
          path="/weather"
          element={
            <ProtectedRoute isLogin={isLogin}>
              <Weather />
            </ProtectedRoute>
          }
        />

        <Route path="/" element={<Login />} />
      </Routes>
    </div>
  );
}
