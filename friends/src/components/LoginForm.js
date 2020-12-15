import React, { useState } from "react";
import { axiosAuth } from "../authentication/axiosAuth";

const LoginForm = (props) => {
  const [credentials, setCredentials] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const login = (evt) => {
    evt.preventDefault();
    setIsLoading(true);
    axiosAuth()
      .post(`/login`, credentials)
      .then((res) => {
        localStorage.setItem("token", res.data.payload);
        props.history.push("/protected");
        setIsLoading(false);
      })
      .catch((err) => {
        setErrorMessage(err.message);
      });
  };

  const handleChange = (evt) => {
    setCredentials({
      ...credentials,
      [evt.target.name]: evt.target.value,
    });
  };

  return (
    <div onSubmit={login}>
      {isLoading ? (
        <div>
          <h1>Loading...</h1>
        </div>
      ) : (
        <form>
          <input
            type="text"
            name="username"
            value={credentials.username}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
          />
          <button>Login</button>
        </form>
      )}
      { errorMessage !== "" ? <div><h3>{errorMessage}</h3></div> : ""}
    </div>
  );
};

export default LoginForm;
