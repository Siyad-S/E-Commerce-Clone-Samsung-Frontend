import React, { useEffect, useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setLoginUser,
  loginUser,
  getAllUsers,
} from "../../../Redux/Slices/HomePageSlice";
import { Cookies } from "react-cookie";

const Login = () => {
  const cookies = new Cookies();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.homeSlice.loginFormData);
  const token = cookies.get("token");
  const userId = localStorage.getItem("userId");
  const allUsers = useSelector((state) => state.homeSlice.allUsers.usersData);
  const [userNotExists, setUserNotExists] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  console.log(allUsers);

  const handleUserLogin = (e) => {
    dispatch(
      setLoginUser({
        ...user,
        [e.target.id]: e.target.value,
      })
    );
    setUserNotExists(false);
  };

  const submitLogin = async () => {
    let formErrors = {};

    if (!user.email) {
      formErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(user.email)) {
      formErrors.email = "Invalid email address";
    }

    if (!user.password) {
      formErrors.password = "Password is required";
    } else if (user.password.length < 5) {
      formErrors.password = "Password must be at least 6 characters long";
    }

    if (Object.keys(formErrors).length === 0) {
      const existingUser = allUsers.find((u) => u.email === user.email);
      if (existingUser) {
        dispatch(loginUser({ userData: user }));
        navigate("/");
      } else {
        setUserNotExists(true);
      }
    } else {
      setErrors(formErrors);
    }
  };

  console.log(token);

  return (
    <div className="login_page">
      <h3>Login</h3>
      <div className="login_form">
        <div className="input_div">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            id="email"
            value={user.email}
            onChange={handleUserLogin}
          />
          {errors.email && <div className="error">{errors.email}</div>}
        </div>
        <div className="input_div">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={user.password}
            onChange={handleUserLogin}
          />
          {errors.password && <div className="error">{errors.password}</div>}
        </div>

        {userNotExists ? (
          <div className="userExist">
            <p>User not found. Login with valid user data.</p>
          </div>
        ) : null}

        <div className="login_btn">
          <button onClick={submitLogin}>Login</button>
        </div>

        <p>
          Don't have an account?{" "}
          <span onClick={() => navigate("/signup")}>Signup</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
