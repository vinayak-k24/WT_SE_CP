import React, { useEffect, useState } from 'react';

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
function UserDashboard () {
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
  });

  

  useEffect(()=>{
      authService.refreshPage();
      if(authService.getCurrentUser().type!=="user")
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
          console.log(data.user.registeredEventsIds);
          setValues({...values,
            name:data.user.name,
            email:data.user.email,
            department:data.user.department,
            phoneNumber:data.user.phoneNumber,
            type:data.user.type,
            semester:data.user.semester,
            gender:data.user.gender,
            registeredEventIds:data.user.registeredEventsIds,
          });
          const ids=[...data.user.registeredEventsIds];
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
                  setUpcomingEvents([...upcomingEvents,...data.data]);
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
                    console.log(data.data);
                    setPreviousEventsFlag(true);
                    setPreviousEvents([...previousEvents,...data.data]);
                    console.log(previousEvents);
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
                  <MDBCardTitle>Events Registered</MDBCardTitle>
                  <MDBCardText>{values.registeredEventIds.length}</MDBCardText>
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
                        <MDBCardText>No Upcoming Events Registered</MDBCardText>
                      
                    
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
                      
                        <MDBCardText>No Previous Events Registered</MDBCardText>
                      
                  }
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
          <br />
        </div>
    );
  }

export default UserDashboard;