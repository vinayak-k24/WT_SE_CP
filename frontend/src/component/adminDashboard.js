import React, { useEffect, useState } from 'react';
// import { Route,Link } from "react-router-dom";
// import EventInfo from './eventInfo';

import "./dashboard.css";
import authService from '../services/auth.service';
import { useNavigate } from "react-router-dom";
import {
  MDBCard,
  MDBCardBody,
  MDBRow,
  MDBCol,
  MDBCardTitle,
  MDBCardText,
}
from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';
function AdminDashboard () {

  const navigate=useNavigate();
  const [upcomingEvents,setUpcomingEvents]=useState([]);
  const [upcomingEventsFlag,setUpcomingEventsFlag]=useState(false);
  const [previousEvents,setPreviousEvents]=useState([]);
  const [previousEventsFlag,setPreviousEventsFlag]=useState(false);
    
  const [values,setValues]=useState({
      
  });

  useEffect(()=>{
      authService.refreshPage();
      if(authService.getCurrentUser().type!=="admin")
      {
          navigate("/");
      }
      setUpcomingEventsFlag(false);
      setPreviousEventsFlag(false);
      setUpcomingEvents([]);
      setPreviousEvents([]);

      fetch("http://localhost:8081/upcomingEvents",{
            method:"get"
          }).then(res=>{
            return res.json();
          })
          .then(data=>{
              if(data.data.length>0){
                  setUpcomingEventsFlag(true);
                  setUpcomingEvents([...upcomingEvents,...data.data]);
                }
              
              else{
                  setUpcomingEventsFlag(false);
              }
              })
              .catch(err=>console.log(err));
              
              fetch("http://localhost:8081/previousEvents",{
                method:"get"
              }).then(res=>{
                return res.json();
              })
              .then(data=>{
                
                
                  if(data.data.length>0){
                    console.log(data.data);
                    setPreviousEventsFlag(true);
                    setPreviousEvents([...previousEvents,...data.data]);
                    console.log(previousEvents);
                  }
                
                else{
                    setPreviousEventsFlag(false);
                }
          })
          .catch(err=>console.log(err));
    },[])
      
      return (
        
        <div>
          
          <MDBRow>
          <MDBCol>
              <MDBCard>
                <MDBCardBody>
                  <MDBCardTitle>Pending Events</MDBCardTitle>
                  <Link to={"/pendingEvents"}>Click Here</Link>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
            <MDBCol>
              <MDBCard>
                <MDBCardBody>
                  <MDBCardTitle>Total Events</MDBCardTitle>
                  <MDBCardText>{previousEvents.length+upcomingEvents.length}</MDBCardText>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
          <MDBRow>
            <MDBCol>
              <MDBCard className='h-100'>
                <MDBCardBody>  
                  {upcomingEventsFlag ?

                        (upcomingEvents.map(((card)=>(
                          <MDBCardText><Link to={`/eventInfo/${card._id}`}>{card.eventName}</Link></MDBCardText>
                        ))))
                    
                  :
                        <MDBCardText>No Upcoming Events</MDBCardText>
                                          
                  }
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
            
            <MDBCol>
              <MDBCard className='h-100'>
                <MDBCardBody>
                  {previousEventsFlag ?

                        (previousEvents.map(((card)=>(
                          <MDBCardText> <Link to={`/eventInfo/${card._id}`}>{card.eventName}</Link> </MDBCardText>
                          
                        ))))

                      :
                      
                        <MDBCardText>No Previous Events</MDBCardText>
                      
                  }
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
          <br />
        </div>
    );
  }

export default AdminDashboard;