import React, { useState } from "react";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_MIN,
  VALIDATOR_REQUIRE,
  validate,
} from "../validators";

function AuthPage() {
  const [isLogginMode, setIsLoginMode] = useState(false);
  const [isProcced, setIsProcced] = useState(false);
  const [data, setData] = useState({
    username: {
      value: "",
      isValid: false,
    },
    password: {
      value: "",
      isValid: false,
    },
    rePassword: {
      value: "",
      isValid: false,
    },
  });

  const toggleLoginMode = () => {
    setIsLoginMode(!isLogginMode);
  };
  const submitHandler = (e) => {
    setIsProcced(true);
    e.preventDefault();
    if(!isLogginMode){
        if(data.username.isValid && data.password.isValid && data.password.value == data.rePassword.value){
            console.log(true);

        }
    }
    else {
        if(data.username.isValid && data.password.isValid ){
            console.log(true);
        }
    }
  };
  return (
    <div className="container">
      <h2 className="title">{isLogginMode ? "Log in" : "Register"}</h2>

      <form onSubmit={submitHandler} className="form">
        <div>
          <label>Username </label>
          <input
            className={`${
              !data.username.isValid && isProcced ? "invalid" : ""
            }`}
            onChange={(e) => {
              setIsProcced(false);

              setData({
                ...data,
                username: {
                  value: e.target.value,
                  isValid: validate(e.target.value, VALIDATOR_REQUIRE()),
                },
              });
            }}
            id="Username"
            type="text"
            placeholder="Enter your Username"
          />
        </div>
        <div>
          <label>Password </label>
          <input
            className={`${
              !data.password.isValid && isProcced ? "invalid" : ""
            }`}
            onChange={(e) => {
              setIsProcced(false);
              setData({
                ...data,
                password: {
                  value: e.target.value,
                  isValid: validate(e.target.value, VALIDATOR_MINLENGTH(6)),
                },
              });
            }}
            id="password"
            type="password"
            placeholder="password"
          />
        </div>
        {!isLogginMode && (
          <div>
            <label>Confirm Password </label>
            <input
              className={`${
                !data.rePassword.isValid && isProcced ? "invalid" : ""
              }`}
              onChange={(e) => {
                setIsProcced(false);

                setData({
                  ...data,
                  rePassword: {
                    value: e.target.value,
                    isValid: validate(e.target.value, VALIDATOR_REQUIRE),
                  },
                });
              }}
              id="Re-password"
              type="password"
              placeholder="Please Confirm Your Password"
            />
          </div>
        )}

        <button className="btn btn--form" type="submit">
          {isLogginMode ? "Log in" : "Register"}
        </button>
        {!isLogginMode && (
          <p className="switch-text">
            Already have an acount?{" "}
            <span onClick={toggleLoginMode} className="switch">
              Login
            </span>
          </p>
        )}
        {isLogginMode && (
          <p className="switch-text">
            Don't have an acount?{" "}
            <span onClick={toggleLoginMode} className="switch">
              Create acount
            </span>
          </p>
        )}
      </form>
    </div>
  );
}

export default AuthPage;
