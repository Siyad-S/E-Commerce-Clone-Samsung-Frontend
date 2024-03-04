import React from 'react'
import "./AdminLogin.css"
import { useDispatch, useSelector } from "react-redux"
import { setAdminLoginForm, adminLogin } from "../../../Redux/Slices/AdminSlice"
import { useNavigate } from 'react-router-dom'

const AdminLogin = () => {
    const dispatch = useDispatch();
    const admin = useSelector((state) => state.adminSlice.adminLoginForm);
    const navigate = useNavigate();

    const adminDataHandler = (e) => {
        dispatch(setAdminLoginForm({
            ...admin,
            [e.target.id]: e.target.value
        }))
    }

    const submitAdminLogin = async () => {
        await dispatch(adminLogin(admin))
        navigate("/admin-home")
    }

  return (
    <div className="login_page">
      <h3>Admin Login</h3>
      <div className="login_form">
        <div className="input_div">
          <label htmlFor="email">Email</label>
          <input type="text" name="email" id="email" value={admin.email} onChange={adminDataHandler} />
        </div>
        <div className="input_div">
          <label htmlFor="password">Password</label>
          <input type="text" name="password" id="password" value={admin.password} onChange={adminDataHandler} />
        </div>

        <div className="login_btn">
            <button onClick={submitAdminLogin} >Login</button>
        </div>
      </div>                                                                         
    </div>
  )
}

export default AdminLogin