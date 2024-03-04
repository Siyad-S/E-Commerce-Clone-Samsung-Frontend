import React from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoginUser, loginUser } from "../../../Redux/Slices/HomePageSlice"
import { Cookies } from 'react-cookie';

const Login = () => {
  const cookies = new Cookies();
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector((state) => state.homeSlice.loginFormData);
  const token = cookies.get('token')

  const handleUserLogin = (e) => {
    dispatch(setLoginUser({
      ...user,
      [e.target.id]: e.target.value,
    }));
  };

  const submitLogin = () => {
    dispatch(loginUser(user))
    if(dispatch(loginUser(user))) {
      navigate("/")
    }
  };

  console.log(token)

  return (
    <div className="login_page">
      <h3>Login</h3>
      <div className="login_form">
        <div className="input_div">
          <label htmlFor="email">Email</label>
          <input type="text" name="email" id="email" value={user.email} onChange={handleUserLogin} />
        </div>
        <div className="input_div">
          <label htmlFor="password">Password</label>
          <input type="text" name="password" id="password" value={user.password} onChange={handleUserLogin} />
        </div>

        <div className="login_btn">
          <button onClick={submitLogin}>Login</button>
        </div>

        <p>Don't have an account? <span onClick={() => navigate('/signup')}>Signup</span></p>
      </div>                                                                         
    </div>
  );
};

export default Login;