import React, {useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import authService from '../services/auth.service';
// import {withRouter} from 'react-router-dom'

function PendingEvents(){
    const navigate=useNavigate();
    
    const [pendingEvents,setPendingEvents]=useState([]);
    const [pendingEventsFlag,setPendingEventsFlag]=useState(false);

    useEffect(()=>{
        fetch('http://localhost:8081/getPendingEvents/',{
            method:"post",   
        }).then(res=>{
            return res.json();
        })
        .then(data=>{
            console.log(data.data[0].fromDateTime);
            if(data.message==="Success"){
                console.log(data);
                if(data.data.length>0){
                    setPendingEventsFlag(true);
                    console.log(...data.data);
                    data.data[0].fromDateTime=new Date(data.data[0].fromDateTime);
                    data.data[0].toDateTime=new Date(data.data[0].toDateTime);
                    setPendingEvents( [...pendingEvents,...data.data] );
                    
                }
                else{
                    setPendingEventsFlag(false);
                }
            }
        })
    },[]);

    const rejectEvent=(id,email)=>{
        fetch("http://localhost:8081/eventDelete",
            {
                method:"POST",
                body:JSON.stringify({id:id,email:email}),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    }
            })
            .then(res=>{return res.json()})
            .then(data=>{
                console.log(data);
                alert("Rejected Successfully");
                navigate("/events");
            })
            .catch(err=>console.log(err));
    }

    const acceptEvent=(id,email)=>{
        console.log(authService.getCurrentUser().email);
        fetch("http://localhost:8081/acceptEvent",{
            method:"POST",
            body:JSON.stringify({eventId:id,email:email}),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
              }
        }).then(res=> {return res.json()})
        .then(data=>{
            console.log(data);
            if(data.message==="accepted"){
                alert(data.message);
            }
            else{
                alert(data.error);
            }
        })
        .catch(err=>console.log(err));
    }
    
    return(
        <div className='container'>
            {pendingEventsFlag?  (pendingEvents.map(((eventValues)=>(

                <div>
                    <h1>{eventValues.eventName}</h1>
                    <p>{eventValues.eventDescription}</p>
                    <h4>Organized By : {eventValues.organizerName}</h4>
                    <h1>Venue: {eventValues.venue}</h1>
                    <h2>Date: {eventValues.fromDateTime.getDate()===eventValues.toDateTime.getDate() ? `${eventValues.fromDateTime.getDate()}-${eventValues.fromDateTime.getMonth()}-${eventValues.fromDateTime.getFullYear()}` : `${eventValues.fromDateTime.getDate()}-${eventValues.fromDateTime.getMonth()}-${eventValues.fromDateTime.getFullYear()} To ${eventValues.toDateTime.getDate()}-${eventValues.toDateTime.getMonth()}-${eventValues.toDateTime.getFullYear()}`}</h2>
                    <h2>Timings: {eventValues.fromDateTime.getHours().toString().length!==2 ? "0"+eventValues.fromDateTime.getHours():eventValues.fromDateTime.getHours()}
                        :{eventValues.fromDateTime.getMinutes().toString().length!==2 ? "0"+eventValues.fromDateTime.getMinutes():eventValues.fromDateTime.getMinutes()}
                        
                        {eventValues.fromDateTime.getHours()>=12 ?"PM":"AM"} {"To "}  
                        
                        {eventValues.toDateTime.getHours().toString().length!==2 ? "0"+eventValues.toDateTime.getHours():eventValues.toDateTime.getHours()}
                        :{eventValues.toDateTime.getMinutes().toString().length!==2 ? "0"+eventValues.toDateTime.getMinutes():eventValues.toDateTime.getMinutes()}
                        
                        {eventValues.toDateTime.getHours()>=12 ?"PM":"AM"} 

                        </h2>
                    <h1>No.of People Estimated: {eventValues.noOfPeopleEstimated}</h1>

                    <button onClick={()=>acceptEvent(eventValues._id,eventValues.organizerEmail)}>Accept</button>
                    <button onClick={()=>rejectEvent(eventValues._id,eventValues.organizerEmail)}>Reject</button>
                </div>
            ))))
                :
                "No Pending Events"
                }
            
        </div>
    );
}

export default PendingEvents;