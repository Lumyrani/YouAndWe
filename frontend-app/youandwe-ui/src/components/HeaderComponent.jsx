import React from "react";
import { NavLink } from "react-router-dom";
import { isUserLoggedIn, logout } from "../services/AuthService";
import { useNavigate } from "react-router-dom";

const HeaderComponent = () => {
  const isAuth = isUserLoggedIn();

  const navigator = useNavigate();

  function handleLogout() {
    logout();
    navigator("/login");
  }

  return (
    <div>
      <header>
        <nav className="navbar navbar-expand-lg navbar-dark main-color py-3">
          <div className="container-fluid">
            <span className="navbar-brand">
              <a className="nav-link" href="http://localhost:3000">
                You And We
              </a>
            </span>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNavDropDown"
              aria-controls="navbarNavDropDown"
              aria-expanded="false"
              aria-label="Toggle Navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropDown">
              <ul className="navbar-nav">
                {isAuth && (
                  <li className="nav-item">
                    <NavLink to="/helpRequests" className="nav-link">
                      Requests
                    </NavLink>
                  </li>
                )}
              </ul>
            </div>
            <ul className="navbar-nav">
              {!isAuth && (
                <li className="nav-item">
                  <NavLink to="/signup" className="nav-link">
                    Signup
                  </NavLink>
                </li>
              )}

              {!isAuth && (
                <li className="nav-item">
                  <NavLink to="/login" className="nav-link">
                    Login
                  </NavLink>
                </li>
              )}

              {isAuth && (
                <li className="nav-item">
                  <NavLink
                    to="/login"
                    className="nav-link"
                    onClick={handleLogout}
                  >
                    Logout
                  </NavLink>
                </li>
              )}
            </ul>
            {/* <ul className="navbar-nav ms-auto">
                <li className="nav-item m-1">
                  <a
                    type="button"
                    className="btn btn-outline-light"
                    href="/login"
                  >
                    Login
                  </a>
                  &nbsp;
                  <a
                    type="button"
                    className="btn btn-outline-light"
                    href="/signup"
                  >
                    Sign up
                  </a>
                </li>
              </ul> */}
            {/* </div> */}
          </div>
        </nav>
      </header>
    </div>
  );
};

export default HeaderComponent;
