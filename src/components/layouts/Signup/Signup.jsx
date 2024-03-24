import React from "react";
import "./Signup.css";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, getAllUsers } from "../../../Redux/Slices/HomePageSlice";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const Signup = () => {
  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.homeSlice.allUsers.usersData) || [];
  const navigate = useNavigate();

  React.useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const handleSubmit = (values, { setSubmitting }) => {
    const userExists = allUsers.some((user) => user.email === values.email);
    if (!userExists) {
      dispatch(registerUser({ userData: values }));
      navigate("/login");
    } else {
      setSubmitting(false);
    }
  };

  return (
    <div className="signup_page">
      <h3>Signup</h3>
      <Formik
        initialValues={{
          userName: "",
          phone: "",
          email: "",
          password: ""
        }}
        validationSchema={Yup.object({
          userName: Yup.string().required("User name is required"),
          phone: Yup.string().required("Phone number is required"),
          email: Yup.string().email("Invalid email address").required("Email is required"),
          password: Yup.string().required("Password is required")
        })}
        onSubmit={handleSubmit}
      >
        <Form className="signup_form">
          <div className="input_div">
            <label htmlFor="userName">User name</label>
            <Field type="text" name="userName" id="userName" />
            <ErrorMessage name="userName" component="div" className="error" />
          </div>
          <div className="input_div">
            <label htmlFor="phone">Mobile number</label>
            <Field type="text" name="phone" id="phone" />
            <ErrorMessage name="phone" component="div" className="error" />
          </div>
          <div className="input_div">
            <label htmlFor="email">Email</label>
            <Field type="text" name="email" id="email" />
            <ErrorMessage name="email" component="div" className="error" />
          </div>
          <div className="input_div">
            <label htmlFor="password">Password</label>
            <Field type="password" name="password" id="password" />
            <ErrorMessage name="password" component="div" className="error" />
          </div>

          <div className="signup_btn">
            <button type="submit">Sign up</button>
          </div>
        </Form>
      </Formik>

      <p>
        Already have an account? <span onClick={() => navigate("/login")}>Login</span>
      </p>
    </div>
  );
};

export default Signup;
