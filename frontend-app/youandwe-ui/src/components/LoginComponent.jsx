import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  loginAPICall,
  saveLoggedInUser,
  storeToken,
} from "../services/AuthService";
const LoginComponent = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  // function handleLoginForm(e) {
  //   e.preventDefault();
  //   const login = { username, password };
  //   console.log(login);
  // }

  // ----------------jwt------------
  const navigator = useNavigate();

  async function handleLoginForm(e) {
    e.preventDefault();

    if (validateForm()) {
      await loginAPICall(username, password)
        .then((response) => {
          console.log(response.data);

          //const token = 'Basic ' + window.btoa(username + ":" + password);
          const token = "Bearer " + response.data.accessToken;

          const role = response.data.role;
          console.log("role:", role);
          storeToken(token);

          saveLoggedInUser(username, role);

          navigator("/helpRequest");

          window.location.reload(false);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }
  function validateForm() {
    let valid = true;

    const errorsCopy = { ...errors };
    if (username.trim()) {
      errorsCopy.username = "";
    } else {
      errorsCopy.username = "User name is required";
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
              <h2 className="text-center">Login</h2>
            </div>
            <div className="card-body">
              <form>
                <div className="row mb-3">
                  <label className="col-md-3 control-label">
                    {" "}
                    Username or Email
                  </label>
                  <div className="col-md-9">
                    <input
                      type="text"
                      name="username"
                      className={`form-control ${
                        errors.username ? "is-invalid" : ""
                      }`}
                      placeholder="Enter your username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    ></input>
                    {errors.username && (
                      <div className="invalid-feedback"> {errors.username}</div>
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
                      <div className="invalid-feedback"> {errors.password}</div>
                    )}
                  </div>
                </div>
                <div className="form-group mb-3">
                  <button
                    className="btn btn-primary"
                    onClick={(e) => handleLoginForm(e)}
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
export default LoginComponent;
