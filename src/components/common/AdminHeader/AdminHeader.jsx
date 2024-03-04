import React from "react";
import "./AdminHeader.css";

const AdminHeader = () => {
  return (
    <div className="admin_header">
      <div className="logo">
        <div className="logo_image">
          <img
            onClick={() => navigate("/admin")}
            src="https://logos-world.net/wp-content/uploads/2020/04/Samsung-Symbol.png"
            alt=""
          />
        </div>
      </div>
      <div className="options">
        <ul>
          <li>Logout</li>
        </ul>
      </div>
    </div>
  );
};

export default AdminHeader;
