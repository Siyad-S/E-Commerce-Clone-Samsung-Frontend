import React from "react";
import "./Signup.css";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, setRegisterUser } from "../../../Redux/Slices/HomePageSlice";

const Signup = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.homeSlice.registerFormData);

  const handleUserRegister = (e) => {
    dispatch(setRegisterUser({
      ...user,
      [e.target.id]: e.target.value,
    }));
  };

  const submitRegister = () => {
    dispatch(registerUser(user));
  };

  console.log(user);

  return (
    <div className="signup_page">
      <h3>Signup</h3>
      <div className="signup_form">
        <div className="input_div">
          <label htmlFor="userName">User name</label>
          <input type="text" name="userName" id="userName" value={user.userName} onChange={handleUserRegister} />
        </div>
        <div className="input_div">
          <label htmlFor="phone">Mobile number</label>
          <input type="text" name="phone" id="phone" value={user.phone} onChange={handleUserRegister} />
        </div>
        <div className="input_div">
          <label htmlFor="email">Email</label>
          <input type="text" name="email" id="email" value={user.email} onChange={handleUserRegister} />
        </div>
        <div className="input_div">
          <label htmlFor="password">Password</label>
          <input type="text" name="password" id="password" value={user.password} onChange={handleUserRegister} />
        </div>
      </div>

      <div className="signup_btn">
        <button onClick={submitRegister}>Sign up</button>
      </div>
    </div>
  );
};

export default Signup;
