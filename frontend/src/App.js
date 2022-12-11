import React, { Component } from 'react';
import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom';
import Home from './component/home';
import About from './component/about';
import Login from './component/login';
import Event from './component/events';
import EventInfo from './component/eventInfo';
import './App.css';
import "./assets/bootstrap/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/css/Customizable-Background--Overlay.css";
import "./assets/css/dh-card-image-left-dark.css";
import "./assets/css/Login-Form-Basic-icons.css";
import "./assets/css/vanilla-zoom.min.css";
import Dashboard from './component/dashboard';
import Logout from './component/logout';
import Signup from './component/signup';
import EventRegistration from './component/eventRegistration';
import Navigationbar from './component/navbar';
import PendingEvents from './component/pendingEvents';

// import "https://cdnjs.cloudflare.com/ajax/libs/baguettebox.js/1.11.1/baguetteBox.min.js";
// import "./assets/js/vanilla-zoom.js";
// import "./assets/js/bs-init.js";
// import "./assets/bootstrap/js/bootstrap.min.js";
// import "./assets/js/theme.js";
class App extends Component {
  
constructor(props){
  super(props);
  console.log("Hello World");
}
  
render() {
	return (
	<>
    
    
    <Router>
      <div className="App">
        
        <Navigationbar></Navigationbar>
        <Routes>
          <Route exact path='/' element={<Home />}></Route>
          <Route exact path='/about' element={<About />}></Route>
          <Route exact path='/events' element={<Event />}></Route>
          <Route exact path='/login' element={<Login />}></Route>
          <Route exact path='/logout' element={<Logout />}></Route>
          <Route exact path='/signup' element={<Signup />}></Route>
          <Route exact path='/signup' element={<Event />}></Route>
          <Route path="/eventInfo/:id" element={<EventInfo />}></Route>
          <Route exact path="/dashboard" element={<Dashboard />}></Route>
          <Route exact path="/eventRegistration" element={<EventRegistration />}></Route>
          <Route exact path="/pendingEvents" element={<PendingEvents />}></Route>
        </Routes>
      </div>
    
      <footer className="page-footer dark">
        <div className="container">
          <div className="row">
            <div className="col-sm-3">
              <h5>Get started</h5>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/signup">Signup</Link></li>
                <li><Link to="/login">Login</Link></li>
              </ul>
            </div>
            <div className="col-sm-3">
              <h5>About us</h5>
              <ul>
                <li><Link to="/">Company Information</Link></li>
                <li><Link to="/">Contact Us</Link></li>
                <li><Link to="/">Reviews</Link></li>
              </ul>
            </div>
            <div className="col-sm-3">
              <h5>Support</h5>
              <ul>
                <li><Link to="/">FAQ</Link></li>
                <li><Link to="/">Help desk</Link></li>
                <li><Link to="/">Forums</Link></li>
              </ul>
            </div>
            <div className="col-sm-3">
              <h5>Legal</h5>
              <ul>
                <li><Link to="#">Terms of Service</Link></li>
                <li><Link to="#">Terms of Use</Link></li>
                <li><Link to="#">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-copyright">
          <p>© 2022 Copyright Text</p>
        </div>
      </footer>
      
    </Router>
    {/* <script src="./assets/js/bs-init.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/baguettebox.js/1.11.1/baguetteBox.min.js"></script>
    <script src="./assets/js/vanilla-zoom.js"></script>
    <script src="./assets/js/theme.js"></script> */}
  </>
);
}
}



export default App;
