import React, { useEffect, useState} from 'react';
// import { Route,Link } from "react-router-dom";
// import EventInfo from './eventInfo';

import "./dashboard.css";
import authService from '../services/auth.service';
import { Link, useNavigate } from "react-router-dom";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBRow,
  MDBCol,
} from 'mdb-react-ui-kit';
function OrganizerDashboard () {
  const navigate=useNavigate();
  const [upcomingEvents,setUpcomingEvents]=useState([]);
  const [upcomingEventsFlag,setUpcomingEventsFlag]=useState(false);
  const [previousEvents,setPreviousEvents]=useState([]);
  const [previousEventsFlag,setPreviousEventsFlag]=useState(false);
  const [values,setValues]=useState({
    name:"",
    email:"",
    department:"",
    phoneNumber:"",
    semester:1,
    gender:"",
    type:"",
    usn:"",
    registeredEventIds:[],
    organizedEventIds:[],
});
  useEffect(()=>{
      authService.refreshPage();
      if(authService.getCurrentUser().type!=="organizer")
      {
          navigate("/");
      }
      setUpcomingEventsFlag(false);
      setPreviousEventsFlag(false);
      setUpcomingEvents([]);
      setPreviousEvents([]);
      fetch("http://localhost:8081/getUserDetails",{
        method:"POST",
        body:JSON.stringify({user:authService.getCurrentUser()}),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        }
      })
      .then(data=>{return data.json();})
      .then(data=>{
        if(data.user.length===0)
        {
          navigate("/");
        }
        else{
          console.log(data.user.organizedEventIds);
          setValues({...values,
            name:data.user.name,
            email:data.user.email,
            department:data.user.department,
            phoneNumber:data.user.phoneNumber,
            type:data.user.type,
            semester:data.user.semester,
            gender:data.user.gender,
            organizedEventIds:data.user.organizedEventIds,
          });
          const ids=[...data.user.organizedEventIds];
          // console.log(data.user.registeredEventIds);


          fetch("http://localhost:8081/upcomingEvents",{
            method:"get"
          }).then(res=>{
            return res.json();
          })
          .then(data=>{
              if(data.data.length>0){
                    
                  data.data=data.data.filter((element)=>{
                  return ids.includes(element._id);
                })
                if(data.data.length>0){
                  
                  setUpcomingEventsFlag(true);
                  setUpcomingEvents([...previousEvents,...data.data]);
                }
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
                  
                    data.data=data.data.filter((element)=>{
                    return ids.includes(element._id);
                  })
                  if(data.data.length>0){
                    // console.log(data.data);
                    setPreviousEventsFlag(true);
                    setPreviousEvents([...previousEvents,...data.data]);
                    // console.log(previousEvents);
                  }
                }
                else{
                    setPreviousEventsFlag(false);
                }
          })
          .catch(err=>console.log(err));
      
          


        }
      })



    },[])
      
      return (
        <div>
          <MDBRow>
            <MDBCol>
              <MDBCard>
                <MDBCardBody>
                  <MDBCardTitle>Create an Event</MDBCardTitle>
                  <Link to={"/eventRegistration"}>Click Here</Link>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
            <MDBCol>
              <MDBCard>
                <MDBCardBody>
                  <MDBCardTitle>Events Organized</MDBCardTitle>
                  <MDBCardText>{values.organizedEventIds.length}</MDBCardText>
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
                        <MDBCardText>No Upcoming Events Organized</MDBCardText>
                      
                    
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
                      
                        <MDBCardText>No Previous Events Organized</MDBCardText>
                      
                  }
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
          <br />

        </div>
    );
  }

export default OrganizerDashboard;