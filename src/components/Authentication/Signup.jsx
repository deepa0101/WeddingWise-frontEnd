/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Context from "../../ContextApi/ContextProvider";

const Signup = () => {
  const navigate = useNavigate();
  const {URL} =useContext(Context)
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
    userName: "",
  });
  const { email, password, userName } = inputValue;
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });
  const handleSuccess = (msg) =>
    alert(`${msg} Login into your account`)

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${URL}user/signup`,
        {
          ...inputValue,
        },
        { credentials: true }
      );
      const { message } = data;
      
      if (message) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        handleError(message);
      }
    } catch (error) {
      alert("Email is already registered");
    }
    setInputValue({
      ...inputValue,
      email: "",
      password: "",
      userName: "",
    });
  };

  return (
    <>
    <div className="container m-5 d-flex justify-content-center align-items-center">
    <div className="form-container">
      <h2>Signup Account</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            placeholder="Enter your email"
            onChange={handleOnChange}
          />
        </div>
        <div>
          <label htmlFor="userName">Username</label>
          <input
            type="text"
            name="userName"
            value={userName}
            placeholder="Enter your username"
            onChange={handleOnChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            placeholder="Enter your password"
            onChange={handleOnChange}
          />
        </div>
        <button type="submit">Submit</button>
        <span>
          Already have an account? <Link to={"/login"}>Login</Link>
        </span>
      </form>
      
    </div></div></>
  );
};

export default Signup;