import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
// import { Link } from 'react-router-dom';
import authService from '../services/auth.service';
import { Navbar, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
// import { MDBCardImage } from 'mdb-react-ui-kit';
import bgImage from  '../assets/logo.png';

import "https://kit.fontawesome.com/a076d05399.js";

function Navigationbar () {
    const [flag,setFlag]=useState(false);
    useEffect(()=>{
      if(!authService.getCurrentUser() || authService.getExpiryToken()){
        localStorage.removeItem("token");
        setFlag(false);
      }   
      else{
          setFlag(true);
      }
    },[]);
	
    
    return <div>
        <script src='https://kit.fontawesome.com/a076d05399.js' crossOrigin='anonymous'></script>
        <Navbar bg="light" variant="light" sticky="top" style={{paddingRight:15}} >
      <LinkContainer to="/">
        <Navbar.Brand><img src={bgImage} alt="kletech" style={{height:60,marginLeft:15}}/></Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
          <LinkContainer to="/">
            <Nav.Link id='Home'>Home</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/events">
            <Nav.Link id='even'>Events</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/about">
            <Nav.Link>About us</Nav.Link>
          </LinkContainer>
          {
                        flag?
                        <>
                          <LinkContainer to="/dashboard"><Nav.Link> <i class='far fa-user-circle'>{" "+authService.getCurrentUser().name}</i> </Nav.Link></LinkContainer>
                          
                          <LinkContainer to="/logout"><Nav.Link id='logt'>Logout</Nav.Link></LinkContainer>
                   
                        </> 
                        :
                        <LinkContainer to="/login"><Nav.Link id='log'>Login</Nav.Link></LinkContainer>
                        }
        </Nav>
      </Navbar.Collapse>
    </Navbar>
	</div>
}
export default Navigationbar;
