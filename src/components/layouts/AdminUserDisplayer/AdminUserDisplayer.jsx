import React, { useEffect } from "react";
import "./AdminUserDisplayer.css";
import { getUsers } from "../../../Redux/Slices/AdminSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AdminDashBoard from "../../common/AdminDashBoard/AdminDashBoard";

const AdminUserDisplayer = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.adminSlice.allUsers.usersData);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  console.log(users);

  return (
    <div className="admin_users">
      <AdminDashBoard />
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Sl.No.</th>
              <th>Customer Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>More Details</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{user.userName}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>
                  <button
                    onClick={() => navigate(`/admin-user-more/${user._id}`)}
                  >
                    Show More
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUserDisplayer;
