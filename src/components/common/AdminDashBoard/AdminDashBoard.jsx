import React, { useState } from "react";
import "./AdminDashBoard.css";
import { useNavigate } from "react-router-dom";

const AdminDashBoard = () => {
  const navigate = useNavigate();

  return (
    <div className="dash_board">
      <ul className="dashboard_options">
        <li onClick={() => navigate("/admin-home")}>Categories</li>
        <li onClick={() => navigate("/admin-users")}>Users</li>
        <li onClick={() => navigate("/admin-allOrders")}>Orders</li>
        <li onClick={() => navigate("/banner")}>Banners</li>
      </ul>
    </div>
  );
};

export default AdminDashBoard;
