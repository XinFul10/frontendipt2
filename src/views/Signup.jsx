import { Link, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import axiosClient from "../axios-client.js";
import { useStateContext } from "../contexts/ContextProvider.jsx";

export default function Signup() {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();

  const { setUser, setToken } = useStateContext();
  const navigate = useNavigate();

  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false); // loading state

  const onSubmit = (e) => {
    e.preventDefault();

    setLoading(true);
    setErrors(null);

    const payload = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: passwordConfirmationRef.current.value,
    };

    axiosClient
      .post("/signup", payload)
      .then(({ data }) => {
        setToken(data.token);
        setUser(data.user);
        localStorage.setItem("ACCESS_TOKEN", data.token);
        navigate("/");
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
    <div className="login-signup-form animated fadeInDown">
      <div className="background-image"></div>
      <div className="background-overlay"></div>

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

      <div className="form">
        <form onSubmit={onSubmit}>
          <h1 className="title">Create your Library Account</h1>

          {errors && (
            <div className="alert">
              {Object.keys(errors).map((key) => (
                <p key={key}>{errors[key][0]}</p>
              ))}
            </div>
          )}

          <input ref={nameRef} type="text" placeholder="Full Name" />
          <input ref={emailRef} type="email" placeholder="Email" />
          <input ref={passwordRef} type="password" placeholder="Password" />
          <input
            ref={passwordConfirmationRef}
            type="password"
            placeholder="Confirm Password"
          />

          <button className="btn" disabled={loading}>
            {loading ? "Creating Account..." : "Sign up"}
          </button>

          <p className="message">
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
