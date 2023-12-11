import React, { useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import cart2 from "../assets/cart2.webp";
import "../styles/login.css";
import { loginCredentials, resetPassCredentials, sendOtpCredentials, signUpCredentials, verifyOtpCredentials } from "../utilis/loginApi";
import { useDispatch } from "react-redux";
import { addUser } from "../utilis/userSlice";


function Login({ show, handleClose }) {
  const userDispatch = useDispatch();
  const [showLogin, setshowLogin] = useState(true);
  const [toVerifyEmail, setToVerifyEmail] = useState(false);
  const [isReadOnly,setIsReadOnly] = useState(true);
  const [valid,setValid] = useState("");
  const [login,setLogin] = useState({
    email:"",
    password:""
  });
  const [signup,setSignUp] = useState({
    fullName:"",
    email:"",
    password:""
  });
  const [error,setError] = useState(true)
  const [verify,setVerify] = useState({email:"",otp:"",id:""})
  const [reset,setReset] = useState(true)
  const [resetPassword,setResetPassword] = useState({new:"",retypenew:""})
  const nameRegex = /^[a-zA-Z\s]+$/;

  const handleChange = (e) => {
    e.stopPropagation()
    setValid("");
    setIsReadOnly(true);
    setVerify({email:"",otp:"",id:""});
    setSignUp({fullName:"",email:"",password:""})
    setResetPassword({new:"",retypenew:""})
    setLogin({email:"",password:""});
    setToVerifyEmail(false);
    setshowLogin(!showLogin);
    setReset(true)
  };

  const forgotPassword = (e)=>{
    e.stopPropagation()
    setToVerifyEmail(true);
    setValid("")
  }

  const logincred = async (e)=>{
    e.stopPropagation()
   if(!login.email.includes("@")){setValid("email should includes @")}
   else if(login.password.length<8){setValid("Password should contains atleast 8 characters")}
   else{
    const res = await loginCredentials(login)
    if(res.status){
      setError(false)
      setValid("")
      setLogin({email:"",password:""});
      let user = {data:res.user,token:res.token}
      localStorage.setItem("user", JSON.stringify(user));
     userDispatch(addUser(user));
    }
    else{
      setError(true);
      setValid(res.message)
    } 
}}

  const signUpCred = async (e)=>{
    e.stopPropagation()
    if(!nameRegex.test(signup.fullName)){setValid("name should be contains only alphabets")}
    else if(!signup.email.includes("@")){setValid("email should includes @")}
    else if(signup.password.length<8){setValid("Password should contains atleast 8 characters")}
    else {
      const res = await signUpCredentials(signup);
      if(res.status){
        setError(false)
        setSignUp({fullName:"",email:"",password:""})
        setValid(res.message)
      }
     else{
      setError(true)
      setValid(res.message)
     }
    }
  }

  const sendOtpcred = async (e)=>{
    e.stopPropagation()
     if(!verify.email.includes("@")){setValid("email should includes @")}
     else {
      const res = await sendOtpCredentials(verify.email);
      if(res.status){
        setError(false)
        setVerify(prev=>({...prev,id:res.id}));
        setIsReadOnly(!isReadOnly);
        setValid(res.message)
      }
     else{
      setError(true)
      setValid(res.message)
     }
    }
  }

  const verifyOtp = async (e)=>{
    e.stopPropagation()
    const res = await verifyOtpCredentials(verify.id,Number(verify.otp));
      if(res.status){   
        setError(true)
        setValid("");
        setIsReadOnly(!isReadOnly);
        setReset(!reset);
      }
      else{
        setError(true)
        setValid(res.message)  
      }  
  }

  const resetPassCred = async (e)=>{
    e.stopPropagation()
    if(resetPassword.new !== resetPassword.retypenew){
      setValid("please check both Passwords are not matching")
    }
    else{
      const res = await resetPassCredentials(verify.id,resetPassword.new);
      if(res.status){     
       setVerify({email:"",otp:"",id:""});
       setResetPassword({new:"",retypenew:""})
       setshowLogin(true);
       setReset(true)
       setToVerifyEmail(false)
       setValid("")
      }
     else{
      setError(true)
      setValid(res.message)  
     } 
    }  
  }

  return (
    <Offcanvas show={show} onHide={handleClose} placement="end" name="end" onClick={(e)=>e.stopPropagation()}>
      <Offcanvas.Header closeButton></Offcanvas.Header>
      <Offcanvas.Body>
        <div className="login-container33">
          <div className="login-details123">
            <div className="login-txt">{showLogin ? !toVerifyEmail ?" Login" : "verify account": " Sign up"}</div>
            <div>
              or
              <span
                onClick={handleChange}
                style={{ color: "#fc8019", cursor: "pointer" }}
              >
                {showLogin ? "create an account" : " login to your account"}
              </span>
            </div>
          </div>
          <div className="img-source1">
            <img src={cart2} alt="cart2-img" />
          </div>
        </div>
        <div className={error?"error":"accept"}>{valid}</div>
        {showLogin ? (
          !toVerifyEmail ? (
            <>
              <FloatingLabel  label="Email">
                <Form.Control
                  className="form-input"
                  type="email"
                  placeholder="Email"
                  onChange={(e)=>setLogin(prev=>({...prev,email:(e.target.value).trim().toLowerCase()}))}
                  value = {login.email}
                  autoComplete="off"
                  onClick={(e) => e.stopPropagation()}
                />
              </FloatingLabel>

              <FloatingLabel  label="Password">
                <Form.Control
                  className="form-input"
                  type="password"
                  placeholder="Password"
                  onChange={(e)=>setLogin(prev=>({...prev,password:(e.target.value).trim()}))}
                  value = {login.password}
                  onClick={(e) => e.stopPropagation()}
                />
              </FloatingLabel>
              <div
                className="Forgot-password"
                onClick={forgotPassword}
              >
                Forgot password?
              </div>
              <button className="login-btn1" onClick={logincred} >LOGIN</button>
            </>
          ) : (
            reset?
            <>
              <FloatingLabel  label="Email">
                <Form.Control
                  className="form-input"
                  type="email"
                  placeholder="Email"
                  readOnly={!isReadOnly}
                  onChange={(e)=>setVerify(prev=>({...prev,email:(e.target.value).trim().toLowerCase()}))}
                  value = {verify.email}
                  autoComplete="off"
                  onClick={(e) => e.stopPropagation()}
                />
              </FloatingLabel>

              <FloatingLabel  label="otp">
                <Form.Control
                  className="form-input"
                  type="number"
                  placeholder="otp"
                  readOnly={isReadOnly}
                  onChange={(e)=>setVerify(prev=>({...prev,otp:(e.target.value).trim()}))}
                  value = {verify.otp}
                  onClick={(e) => e.stopPropagation()}
                />
              </FloatingLabel>
             {isReadOnly ? <button className="login-btn1" onClick={sendOtpcred}>send otp</button>
             : <button className="login-btn1"onClick={verifyOtp}>verify</button>}
            </> : <>
            <FloatingLabel  label="New password">
                <Form.Control
                  className="form-input"
                  type="password"
                  placeholder="New password"
                  onChange={(e)=>setResetPassword(prev=>({...prev,new:(e.target.value).trim()}))}
                  value = {resetPassword.new}
                  onClick={(e) => e.stopPropagation()}
                />
              </FloatingLabel>

              <FloatingLabel  label="Confirm password">
                <Form.Control
                  className="form-input"
                  type="password"
                  placeholder="Confirm password"
                  onChange={(e)=>setResetPassword(prev=>({...prev,retypenew:(e.target.value).trim()}))}
                  value = {resetPassword.retypenew}
                  onClick={(e) => e.stopPropagation()}
                />
              </FloatingLabel>
              <button className="login-btn1" onClick={resetPassCred}>Reset password</button>
            </>
          )
        ) : (
          <>
            <FloatingLabel  label="Name">
              <Form.Control
                className="form-input"
                type="text"
                placeholder="Name"
                onChange={(e)=>setSignUp(prev=>({...prev,fullName:(e.target.value).trim()}))}
                value = {signup.fullName}
                onClick={(e) => e.stopPropagation()}
              />
            </FloatingLabel>

            <FloatingLabel  label="Email">
              <Form.Control
                className="form-input"
                type="email"
                placeholder="Email"
                onChange={(e)=>setSignUp(prev=>({...prev,email:(e.target.value).trim().toLowerCase()}))}
                value = {signup.email}
                autoComplete="off"
                onClick={(e) => e.stopPropagation()}
              />
            </FloatingLabel>

            <FloatingLabel  label="Password">
              <Form.Control
                className="form-input"
                type="password"
                placeholder="Password"
                onChange={(e)=>setSignUp(prev=>({...prev,password:(e.target.value).trim()}))}
                value = {signup.password}
                onClick={(e) => e.stopPropagation()}
              />
            </FloatingLabel>
            <button className="login-btn1" onClick={signUpCred}>CONTINUE</button>
          </>
        )}
        <div className="declaration">
          By clicking on Login, I accept the Terms & Conditions & Privacy Policy
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default Login;
