import React, { useRef ,useContext} from 'react'
import "./login.css";
import { loginCall } from "../../apiCalls";
import { Link ,useHistory} from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function Login() {
  const email = useRef();
  const password = useRef();
  const { user,isFetching, dispatch } = useContext(AuthContext);

  const handleClick = async(e) => {
    e.preventDefault();
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    )
    
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">social</h3>
          <span className="loginDesc">
            Connect with friends and the world around you.
            </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input type="email" placeholder="Email" className="loginInput" required ref={email} />
            <input type="password" placeholder="Password" className="loginInput" required ref={password} />
            <button className="loginButton" type="submit">
            {isFetching ? (
                "LOaading"
              ) : (
                "Log In"
              )}
            </button>
            <span className="loginForgot">Forgot Password?</span>
            <Link  to="/register" >
            <button className="loginRegisterButton">
              Create a New Account</button>
              </Link>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
