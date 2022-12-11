import React, { useEffect, useState } from 'react';
import validator from "validator";
import "./login.css";
import {
    MDBBtn,
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBRow,
    MDBCol,
    MDBIcon,
    MDBInput
  }
from 'mdb-react-ui-kit';
import { useNavigate } from "react-router-dom";
import authService from '../services/auth.service';
import bgImage from  '../assets/loginlogo.jpg';
function Login (){
    const navigate=useNavigate();
    const [values,setValues]=useState({
        email:"",
        pasword:""
    })
    const [emailError,setEmailError]=useState("");
    const [passwordError,setPasswordError]=useState("");
    const [authMessage,setAuthMessage]=useState("");

    const handleEmailInputChange=(event)=>{
        setValues(values=>({...values,email:event.target.value}))
    }

    const handlePasswordInputChange=(event)=>{
        setValues(values=>({...values,pasword:event.target.value}))
    }

    const submitDeatils= (event)=>{
        event.preventDefault();
        let emaile,passe;
        if(!validator.isEmail(values.email)){
            emaile="Enter Valid Email";
            setEmailError(emaile);
        }
        else{
            emaile=null;
            setEmailError(emailError=>emaile);
            console.log(emailError);
        }
        if(values.pasword.length<7){
            setPasswordError("Password length should be greater then 7");
        }
        else{
            passe=null;
            setPasswordError(passwordError=> passe);
            console.log(passwordError);
        }
        if(emaile===null && passe===null){
            console.log(emailError,passwordError);
                authService.login(values.email,values.pasword)
                        .then(res=> res.json())
                        .then(data=>{
                            if(data.message==="Authentication has been successful")
                            {
                                console.log(data);
                                localStorage.setItem('token',data.token);
                                
                                window.location.href = "/";
                            }
                            else if(data.message==="Already Logged In"){
                                window.location.href = "/";
                            }
                            else{
                                localStorage.removeItem('token');
                                setAuthMessage(data.message);
                            }
                        })
                        .catch(err=>{
                            throw err;
                        })
            }
    }
            
            
    useEffect(()=>{
        if(!authService.getCurrentUser() || authService.getExpiryToken()){
            localStorage.removeItem("token");
        }   
        else{
            navigate("/");
        }
    })  

	return(
        
        <>
        <>  <MDBContainer className="my-5">
                
                <MDBCard>
                <MDBRow className='g-3'>
                <div className="h1 p-3 mb-2 bg-primary text-white"><marquee>WELCOME TO KLE TECH EVENT MANAGEMENT PORTAL</marquee></div>
                <span className="border border-warning"></span>

                    <MDBCol md='6'>
                    <MDBCardImage src={bgImage} style={{height:450,width:20}} alt="login form" className='rounded-start w-100'/>
                    </MDBCol>

                    <MDBCol md='6'>
                    <MDBCardBody className='d-flex flex-column'></MDBCardBody>
                    <div className='d-flex flex-row mt-2'>
                        <MDBIcon fas icon="cubes fa-3x me-3" style={{ color: '' }}/>
                        <span className=" h3 fw-normal ">LOGIN HERE!</span><br></br>
                        </div>


                    <MDBInput wrapperClass='shadow p-3 mb-5 bg-body rounded' placeholder='Email_Id' id='username' type='email' size="lg" onChange={handleEmailInputChange}  value={values.email}/>
                    <span className="mb-4">{emailError}</span>
                    <MDBInput wrapperClass='shadow p-3 mb-5 bg-body rounded' placeholder='Password' id='password' type='password' size="lg" onChange={handlePasswordInputChange}  value={values.pasword}/>
                    <span className="mb-4">{passwordError}</span>
                    

                    <button className="mb-4 px-5 btn btn-primary" color='blue' size='lg' id="submit" onClick={submitDeatils}>Login</button>
                    <p id="invalid_log">{authMessage}</p>
                    
                    

                    <div className='d-flex flex-row justify-content-start'>
                    <a href="#!" className="small text-muted me-1">Terms of use.</a>
                    <a href="#!" className="small text-muted">Privacy policy</a>
                    </div>
                </MDBCol>

                </MDBRow>
                </MDBCard>

            </MDBContainer>
      

               
        </>
        </>


        
    );
}

export default Login;
