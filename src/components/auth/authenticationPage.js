import React, { useState, useEffect } from "react";
import { Switch, Route, Link, useHistory } from "react-router-dom";
import { axiosWithoutAuth } from "../configurations/axiosConfig";
import "../../CSS/authPage.css";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

export default function AuthenticationPage() {
  const [credentials, setCredentials] = useState({});
  const [path, setPath] = useState();
  const [error, setError] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (error) {
      setError(false);
    }
    if (localStorage.getItem("token")) { 
      history.push("/");
    }
  }, [path]);

  const handleChange = (e) => {
    if (error) {
      setError(false);
    }
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const auth = () => {
    axiosWithoutAuth()
      .post(`${path}`, credentials)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        console.log(res.data);
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
        setError("Invalid Credentials");
      });
  };
  console.log(path);

  const submitForm = (e) => {
    e.preventDefault();
    const { email, password, first_name, last_name, phone } = credentials;
    // if (path == "/login" && (!email || !password)) {
    //   setError("Please wAll Text Fields");
    // }
    // if (
    //   (path == "/register" && !email) ||
    //   !password ||
    //   !first_name ||
    //   !last_name ||
    //   !phone
    // ) {
    //   setError("Please All Text Fields");
    // } else {
      auth();
    // }
  };

  const newInput = (name, placeholder, type) => {
    return (
      <TextField
        id="standard-basic"
        label={placeholder}
        type={type}
        name={name}
        onChange={handleChange}
        className="authFormInput"
      />
    );
  };

  const form = () => {
    return (
      <form onSubmit={submitForm} className="form">
        {newInput("email", "Email")}
        {path === "/register" ? newInput("first_name", "First Name") : ""}
        {path === "/register" ? newInput("last_name", "Last Name") : ""}
        {path === "/register" ? newInput("phone", "Phone") : ""}
        {newInput("password", "Password", "password")}

        <Button variant="contained" onClick={submitForm}>
          {path === "/register" ? "Sign Up" : "Log In"}
        </Button>
        <div className="formError">{error}</div>
      </form>
    );
  };
  return (
    <div className="authContainer">
      <Switch>
        <Route
          exact
          path="/auth"
          render={() => {
            setPath("/login");
            return (
              <div className="formContainer">
                <img
                  src="https://www.duranirving.com/static/media/cartoon.72f7f183.jpg"
                  className="authLogo"
                />
                {form()}
                <p className="formBottomText">
                  Don't have an account?{" "}
                  <Link to="/auth/register">Sign up!</Link>
                </p>
              </div>
            );
          }}
        />
        <Route
          exact
          path="/auth/register"
          render={() => {
            setPath("/register");
            return (
              <div className="formContainer">
                <img
                  src="https://www.duranirving.com/static/media/cartoon.72f7f183.jpg"
                  className="authLogo"
                />
                {form()}
                <p className="formBottomText">
                  Already have an account? <Link to="/auth/">Log in!</Link>
                </p>
              </div>
            );
          }}
        />
      </Switch>
    </div>
  );
}
