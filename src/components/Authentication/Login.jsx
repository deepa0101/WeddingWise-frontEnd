/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../ContextApi/AuthProvider";
import Context from "../../ContextApi/ContextProvider";
function Login() {
  const { currentUser,setCurrentUser,setUserLoggedIn,userLoggedIn ,token,setToken} =useContext(AuthContext)
  const navigate = useNavigate();
  const {URL} = useContext(Context)
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const  { data} = await axios.post(
        `${URL}user/login`,
        {
          email: Email,
          password: Password

        });
        const { payload, token} =await data
          localStorage.setItem("token",token);
          localStorage.setItem('user',payload.id);
          localStorage.setItem('userLoggedIn',true)
          navigate("/")
          window.location.reload()
    }
     catch (error) {
      console.log(error)
      alert(error.response.data.message);
    }
  };
  return (
    <>
    <div className=" m-5 container d-flex justify-content-center align-items-center">
    <div className="form-container">
      <h2>Login to your Account</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            id="email"
            onChange={(e) =>setEmail(e.target.value) }
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Password"
            name="password"
            id="password"
            onChange={(e) =>setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
        <span>Dont have an account ?<Link to="/signup"> Sign Up </Link>
        </span>
      </form>
    </div></div>
    </>
  );
}

export default Login;