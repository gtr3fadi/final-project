import React, { useState } from "react";
import { useLogin } from "./hook/useLogin";
import { useThemeContext } from "./hook/useThemeContext";

export default function LogIn() {
  const { isLightTheme } = useThemeContext();

  const { login, error, isPending } = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <div className="container mt-5 ">
      <div className="row p-3 ">
        <div className="col-md-6 mt-2 rounded p-0 mx-auto shadow">
          <form
            onSubmit={handleSubmit}
            className={`${
              isLightTheme ? "bg-white text-dark" : "bg-dark text-light"
            } rounded p-3 bg-opacity-75 bg-gradient   `}
          >
            <h1 className="text-center text-primary   ">Log In</h1>

            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input
                required
                type="email"
                className="form-control"
                id="email"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <small id="emailHelp" className="form-text text-muted">
                We'll never share your email with anyone else.
              </small>
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                required
                type="password"
                className="form-control"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form-group mt-3 text-center">
              {isPending && (
                <div className="spinner-border text-primary" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              )}
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}
              {!isPending && (
                <button type="submit" className="btn btn-primary">
                  Log In
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
