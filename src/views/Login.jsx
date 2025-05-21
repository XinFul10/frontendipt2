import { Link, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import axiosClient from "../axios-client.js";
import { useStateContext } from "../contexts/ContextProvider.jsx";
import "./login.css";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false); // <-- loading state
  const { setUser, setToken } = useStateContext();
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();

    setLoading(true);
    setErrors(null);

    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    axiosClient
      .post("/login", payload)
      .then(({ data }) => {
        setToken(data.token);
        setUser(data.user);
        localStorage.setItem("ACCESS_TOKEN", data.token);
        navigate("/dashboard");
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          setErrors(response.data.errors);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="login-signup-form">
      {/* Background */}
      <div className="background-image" />
      <div className="background-overlay" />

      {/* Nav */}
      <nav className="nav">
        <ul>
          <li>
            <a href="#services">Our services</a>
          </li>
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
        </ul>
      </nav>

      {/* Form */}
      <div className="form animated fadeInDown">
        <form onSubmit={onSubmit}>
          <h1 className="title">Login to your Library Account</h1>

          {errors && (
            <div className="alert">
              {Object.keys(errors).map((key) => (
                <p key={key}>{errors[key][0]}</p>
              ))}
            </div>
          )}

          <input ref={emailRef} type="email" placeholder="Email" />
          <input ref={passwordRef} type="password" placeholder="Password" />

          <button type="submit" className="btn" disabled={loading}>
            {loading ? "Logging in..." : "Sign in"}
          </button>

          <p className="message">
            You don't have an account? <Link to="/signup">Create Account</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
