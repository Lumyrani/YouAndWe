import React, { useState } from "react";
import { signupAPICall } from "../services/AuthService";
import { Navigate, useNavigate } from "react-router-dom";
const SignupComponent = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });
  const navigator = useNavigate();
  function handleSignupForm(e) {
    e.preventDefault();

    if (validateForm()) {
      const signup = { name, username, email, password };
      console.log(signup);
      signupAPICall(signup)
        .then((response) => {
          console.log(response.data);
          navigator("/login");
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      console.log("error");
    }
  }
  function validateForm() {
    let valid = true;

    const errorsCopy = { ...errors };

    if (name.trim()) {
      errorsCopy.name = "";
    } else {
      errorsCopy.name = "Name is required";
      valid = false;
    }
    if (username.trim()) {
      errorsCopy.username = "";
    } else {
      errorsCopy.username = "Username is required";
      valid = false;
    }
    if (email.trim()) {
      errorsCopy.email = "";
    } else {
      errorsCopy.email = "Email is required";
      valid = false;
    }
    if (password.trim()) {
      errorsCopy.password = "";
    } else {
      errorsCopy.password = "Password is required";
      valid = false;
    }

    setErrors(errorsCopy);
    return valid;
  }
  return (
    <div className="container">
      <br></br>
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-header">
              <h2 className="text-center"> Signup</h2>
            </div>
            <div className="card-body">
              <form>
                <div className="row mb-3">
                  <label className="col-md-3 control-label">Name</label>
                  <div className="col-md-9">
                    <input
                      type="text"
                      name="name"
                      className={`form-control ${
                        errors.name ? "is-invalid" : ""
                      }`}
                      placeholder="Enter your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    ></input>
                    {errors.name && (
                      <div className="invalid-feedback">{errors.name}</div>
                    )}
                  </div>
                </div>
                <div className="row mb-3">
                  <label className="col-md-3 control-label">Username</label>
                  <div className="col-md-9">
                    <input
                      type="text"
                      name="username"
                      className={`form-control ${
                        errors.username ? "is-invalid " : ""
                      }`}
                      placeholder="Enter your username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    ></input>
                    {errors.username && (
                      <div className="invalid-feedback">{errors.username}</div>
                    )}
                  </div>
                </div>
                <div className="row mb-3">
                  <label className="col-md-3 control-label">Email</label>
                  <div className="col-md-9">
                    <input
                      type="email"
                      name="email"
                      className={`form-control ${
                        errors.email ? "is-invalid" : ""
                      }`}
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    ></input>
                    {errors.email && (
                      <div className="invalid-feedback"> {errors.email}</div>
                    )}
                  </div>
                </div>
                <div className="row mb-3">
                  <label className="col-md-3 control-label">Password</label>
                  <div className="col-md-9">
                    <input
                      type="password"
                      name="password"
                      className={`form-control ${
                        errors.password ? "is-invalid" : ""
                      }`}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    ></input>
                    {errors.password && (
                      <div className="invalid-feedback">{errors.password}</div>
                    )}
                  </div>
                </div>
                <div className="form-group mb-3">
                  <button
                    className="btn btn-primary"
                    onClick={(e) => handleSignupForm(e)}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupComponent;
