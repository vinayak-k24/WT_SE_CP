import React, { useEffect, useState } from 'react';
// import { Route,Link } from "react-router-dom";
// import EventInfo from './eventInfo';

import { useNavigate } from "react-router-dom";
function Events () {
    const [upcomingEvents,setUpcomingEvents]=useState([]);
    const [upcomingEventsFlag,setUpcomingEventsFlag]=useState(false);
    const [previousEvents,setPreviousEvents]=useState([]);
    const [previousEventsFlag,setPreviousEventsFlag]=useState(false);
    const navigate=useNavigate();
    useEffect(()=>{
        setUpcomingEventsFlag(false);
        setPreviousEventsFlag(false);
        setUpcomingEvents([]);
        setPreviousEvents([]);
        console.log("hello");
        fetch("http://localhost:8081/upcomingEvents",{
            method:"get"
        }).then(res=>{
            return res.json();
        })
        .then(data=>{
            console.log(data);
            if(data.data.length>0)
            {
                setUpcomingEvents([...upcomingEvents,...data.data]);
                setUpcomingEventsFlag(true);
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
            console.log(data);
            if(data.data.length>0){
                setPreviousEventsFlag(true);
                setPreviousEvents([...previousEvents,...data.data]);
            }
            else{
                setPreviousEventsFlag(false);
            }
        })
        .catch(err=>console.log(err));
    }
    ,[]);

    const navigation=(data)=>{
        console.log(data);
        navigate('/eventInfo/'+data);
    }

	return (
        <>
        <main className="page landing-page">
            <section className="clean-block about-us">
                <div className="container">
                    <h2 className="fs-1 fw-semibold text-center text-sm-center text-md-center text-lg-center text-xl-center text-xxl-center text-info" style={{paddingLeft: "2px",marginLeft: "1px",marginTop: "30px",marginBottom: "30px"}}>Upcoming Events</h2>
                    <div className="row justify-content-center">
                        {upcomingEventsFlag ? (upcomingEvents.map(((card)=>(
                            <div className="col-sm-6 col-lg-4" data-bss-hover-animate="pulse">
                                <div className="card text-center clean-card"><img alt="" className="card-img-top w-100 d-block" src={card.image}/>
                                    <div className="card-body info">
                                        <h4 className="card-title">{card.eventName}</h4>
                                        <p className="card-text">{card.eventDescription}</p>
                                        <div className="icons"></div><button className="btn btn-info border-4 border-success" onClick={()=>navigation(card._id)} ><strong>Read More</strong></button>
                                    </div>
                                </div>
                            </div>
                        )))):"No Upcoming Events"}
                    
                        
                    </div>
                </div>

                <div className="container">
                    <h2 className="fs-1 fw-semibold text-center text-sm-center text-md-center text-lg-center text-xl-center text-xxl-center text-info" style={{paddingLeft: "2px",marginLeft: "1px",marginTop: "30px",marginBottom: "30px"}}>Previous Events</h2>
                    <div className="row justify-content-center">
                        {previousEventsFlag ? (previousEvents.map(((card)=>(
                            <div className="col-sm-6 col-lg-4" data-bss-hover-animate="pulse">
                                <div className="card text-center clean-card"><img alt="" className="card-img-top w-100 d-block" src={card.image}/>
                                    <div className="card-body info">
                                        <h4 className="card-title">{card.eventName}</h4>
                                        <p className="card-text">{card.eventDescription}</p>
                                        <div className="icons"></div><button className="btn btn-info border-4 border-success" onClick={()=>navigation(card._id)} ><strong>Read More</strong></button>
                                    </div>
                                </div>
                            </div>
                        )))):"No Previous Events"}
                    
                        
                    </div>
                </div>

            </section>
    </main>
    </>
    );
    
}
<script src="../assets/bootstrap/js/bootstrap.min.js"></script>
export default Events;
