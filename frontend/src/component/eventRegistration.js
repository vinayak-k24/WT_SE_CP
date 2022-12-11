import React, { useState } from 'react';
import validator from "validator";
import DateTimePicker from 'react-datetime-picker';
import { useEffect } from 'react';
import authService from '../services/auth.service';
import {useNavigate } from 'react-router-dom';
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
// import "./eventRegistration.css";
// import "./eventRegistrationJs.js";
function EventRegistration () {
    
    const navigate=useNavigate();

    const [values,setValues]=useState({
        eventName:"",
        eventDescription:"",
        coordinatorName:"",
        coordinatorEmail:"",
        coordinatorNumber:0,
        venue:"",
        guestName:"",
        noOfPeopleEstimated:50,
        fromDateTime:new Date(),
        toDateTime:new Date(),
        toTime:"",
        fromTime:"",
        toDate:"",
        fromDate:"",
        image:"",
        eventType:""
    })
    const [eventNameError,setEventNameError]=useState("");
    const [eventTypeError,setEventTypeError]=useState("");
    const [eventDescriptionError,setEventDescriptionError]=useState("");
    const [coordinatorNameError,setCoordinatorNameError]=useState("");
    const [coordinatorEmailError,setCoordinatorEmailError]=useState("");
    const [coordinatorNumberError,setCoordinatorNumberError]=useState("");
    const [venueError,setVenueError]=useState("");
    const [guestNameError,setGuestNameError]=useState("");
    const [noOfPeopleEstimatedError,setNoOfPeopleEstimatedError]=useState("");
    const [fromDateError,setFromDateError]=useState("");
    const [fromTimeError,setFromTimeError]=useState("");
    const [toDateError,setToDateError]=useState("");
    const [toTimeError,setToTimeError]=useState("");
    const [imageError,setImageError]=useState("");
    const [authError,setAuthError]=useState("");
    

    const handleEventNameInputChange=(event)=>{
        setValues({...values,eventName:event.target.value})
        if(event.target.value.length<4){
            setEventNameError("Event Name length should be minimum 4 ");
        }
        else{
            setEventNameError("");
        }
    }
    const handleCoordinatorNameInputChange=(event)=>{
        setValues({...values,coordinatorName:event.target.value})
        if(event.target.value.length<4){
            setCoordinatorNameError("Coordinator Name length should be minimum 4 ");
        }
        else{
            setCoordinatorNameError("");
        }
    }
    const handleCoordinatorEmailInputChange=(event)=>{
        setValues({...values,coordinatorEmail:event.target.value})
        if(!validator.isEmail(event.target.value)){
            setCoordinatorEmailError("Invalid Email ID ");
        }
        else{
            setCoordinatorEmailError("");
        }
    }
    const handleCoordinatorNumberInputChange=(event)=>{
        setValues({...values,coordinatorNumber:event.target.value})
        if(event.target.value.length<10){
            setCoordinatorNumberError("Number length should be minimum 10");
        }
        else{
            setCoordinatorNumberError("");
        }
    }
    const handleguestNameInputChange=(event)=>{
        setValues({...values,guestName:event.target.value})
        if(event.target.value.length<4){
            setGuestNameError("Guest Name length should be minimum 4 ");
        }
        else{
            setGuestNameError("");
        }
    }
    const handleEventDescriptionInputChange=(event)=>{
        setValues({...values,eventDescription:event.target.value})
        if(event.target.value.length<4){
            setEventDescriptionError("Event Description length should be minimum 4 ");
        }
        else{
            setEventDescriptionError("");
        }
    }
    const handleVenueInputChange=(event)=>{
        setValues({...values,venue:event.target.value})
        if(event.target.value.length<4){
            setVenueError("Event Name length should be minimum 4 ");
        }
        else{
            setVenueError("");
        }
    }
    const handleNoOfPeopleEstimatedInputChange=(event)=>{
        setValues({...values,noOfPeopleEstimated:event.target.value})
        if(Number(event.target.value)<50){
            setNoOfPeopleEstimatedError("No of People Estimated should be greater then 50");
        }
        else{
            setNoOfPeopleEstimatedError("");
        }
    }
    const handleFromDateInputChange=(event)=>{
        console.log(event.target.value);
        setValues({...values,fromDate:event.target.value})
        // if(values.fromDateTime.length<4){
        //     setEventNameError("Event Name length should be minimum 4 ");
        // }
        // else{
        //     setEventNameError("");
        // }
    }
    const handleFromTimeInputChange=(event)=>{
        console.log(event.target.value);
        setValues({...values,fromTime:event.target.value})
        // if(values.fromDateTime.length<4){
        //     setEventNameError("Event Name length should be minimum 4 ");
        // }
        // else{
        //     setEventNameError("");
        // }
    }
    const handleToDateInputChange=(event)=>{
        console.log(event.target.value);
        setValues({...values,toDate:event.target.value})
        // if(values.fromDateTime.length<4){
        //     setEventNameError("Event Name length should be minimum 4 ");
        // }
        // else{
        //     setEventNameError("");
        // }
    }
    const handleToTimeInputChange=(event)=>{
        console.log(event.target.value);
        setValues({...values,toTime:event.target.value})
        // if(values.fromDateTime.length<4){
        //     setEventNameError("Event Name length should be minimum 4 ");
        // }
        // else{
        //     setEventNameError("");
        // }
    }


    const handleImageInputChange=(event)=>{
        console.log(event.target.files[0]);
        setValues({...values,image:event.target.files[0]});
        console.log(values.image);
    }

    const handleEventTypeInputChange=(event)=>{
        setValues({...values,eventType:event.target.value});
        if(event.target.value.length<4){
            setEventTypeError("Event Type length should be minimum 4 ");
        }
        else{
            setEventTypeError("");
        }
    }

    
    const submitDeatils= (event)=>{
        event.preventDefault();
        let ename,edese,venuee,conamee,coemaile,conume,gnamee,npee,fromdatee=null,fromtimee=null,totimee=null,todatee=null,imagee=null,typee=null;
        
        if(values.eventName.length<4){
            ename="Event Name length should be minimum 4";

            setEventNameError("Event Name length should be minimum 4 ");
        }
        else{
            ename=null;
            setEventNameError(null);
        }
        if(values.eventDescription.length<4){
            edese="Event Description length should be minimum 4"
            setEventDescriptionError("Event Description length should be minimum 4 ");
        }
        else{
            edese=null;
            setEventDescriptionError(null);
        }
        if(values.venue.length<4){
            venuee="Event Name length should be minimum 4 "
            setVenueError("Event Name length should be minimum 4 ");
        }
        else{
            venuee=null
            setVenueError(null);
        }
        if(values.coordinatorName.length<4){
            conamee="Coordinator Name length should be minimum 4"
            setCoordinatorNameError("Coordinator Name length should be minimum 4 ");
        }
        else{
            conamee=null
            setCoordinatorNameError(null);
        }
        if(!validator.isEmail(values.coordinatorEmail)){
            coemaile="Invalid Email ID "
            setCoordinatorEmailError("Invalid Email ID ");
        }
        else{
            coemaile=null
            setCoordinatorEmailError(null);
        }
        if(values.coordinatorNumber.length<10){
            conume="Number length should be minimum 10"
            setCoordinatorNumberError("Number length should be minimum 10");
        }
        else{
            conume=null
            setCoordinatorNumberError(null);
        }
        if(values.guestName.length<4){
            gnamee="Guest Name length should be minimum 4 "
            setGuestNameError("Guest Name length should be minimum 4 ");
        }
        else{
            gnamee=null
            setGuestNameError(null);
        }
        if(values.noOfPeopleEstimated<50){
            npee="No of People Estimated should be greater then 50"
            setNoOfPeopleEstimatedError("No of People Estimated should be greater then 50");
        }
        else{
            npee=null
            setNoOfPeopleEstimatedError(null);
        }


        
        if(ename && edese && venuee && conamee && coemaile && gnamee && npee && conamee && imagee && typee && todatee && totimee && fromtimee && fromdatee){
                console.log(values);
                console.log(new Date(values.fromDate+"T"+values.fromTime))
                const formData = new FormData()
                formData.append('eventName', values.eventName);
                formData.append('eventDescription', values.eventDescription);
                formData.append('coordinatorName', values.coordinatorName);
                formData.append('coordinatorEmail', values.coordinatorEmail);
                formData.append('coordinatorNumber', values.coordinatorNumber);
                formData.append('venue', values.venue);
                formData.append('guestName', values.guestName);
                formData.append('noOfPeopleEstimated', values.noOfPeopleEstimated);
                formData.append('fromDateTime', values.fromDate+"T"+values.fromTime);
                formData.append('toDateTime', values.toDate+"T"+values.toTime);
                formData.append('eventType', values.eventType);
                formData.append('images',values.image);
                formData.append("token",authService.getToken());
                console.log(formData);
                fetch("http://localhost:8081/bookEvent",{
                    method: 'POST',
                    body: formData,
                    
                })
                        .then(data=>{
                            console.log(data);
                            if(data.message!=="Event Booking"){
                                alert("Successfully Sent details");
                                navigate("/events");
                            }
                            else if(!data.message){
                                setAuthError(data.error);
                            }
                            else{
                                setAuthError(data.message);
                            }
                        })
                        .catch(err=>console.log(err));
        }
    }

    useEffect(()=>{
        authService.refreshPage();
        // if(!authService.getToken() && !authService.getCurrentUser()){
        //     if(authService.getCurrentUser().type==="user")
        //         navigate("/");
        // }
    },[])

	return(
        <>
        {/* <link rel="stylesheet" href="https://unicons.iconscout.com/release/v4.0.0/css/line.css"/>
        <title>Responsive Regisration Form </title>
        <div className="container">
            <header>Event Registration</header>
            <form onSubmit={submitDeatils}>
                <div className="form first">
                    <div className="details personal">
                    <span className="title">Event Details</span>
                    <div className="fields">
                        <div className="input-field">
                        <label htmlFor='eventName'>Name of the Event</label>
                        <input type="text" name="eventName" required value={values.eventName} onChange={handleEventNameInputChange}/>
                        <span>{eventNameError}</span>
                        </div>
                        <div className="input-field">
                        <label htmlFor="fromDateTime"></label>
                        <DateTimePicker name='fromDateTime' value={values.fromDateTime}  onChange={handleFromDateTimeInputChange} />
                        <span>{fromDateTimeError}</span>
                        </div>
                        <div className="input-field">
                        <label htmlFor="toDateTime"></label>
                        <DateTimePicker name='toDateTime' value={values.toDateTime}  onChange={handleToDateTimeInputChange} />
                        <span>{toDateTimeError}</span>
                        </div>
                        <div className="input-field">
                        <label>Co-ordinator Name</label>
                        <input type="text" value={values.coordinatorName} onChange={handleCoordinatorNameInputChange}  required />
                        <span>{coordinatorNameError}</span>
                        </div>
                        <div className="input-field">
                        <label>Event Description</label>
                        <textarea value={values.eventDescription} onChange={handleEventDescriptionInputChange}  required />
                        <span>{eventDescriptionError}</span>
                        </div>
                        <div>
                        <label>Co-ordinator mail</label>
                        <input type="text" value={values.coordinatorEmail} onChange={handleCoordinatorEmailInputChange} required />
                        <span>{coordinatorEmailError}</span>
                        </div>
                        <div className="input-field">
                        <label>Co-ordinator Mobile Number</label>
                        <input type="number" value={values.coordinatorNumber} onChange={handleCoordinatorNumberInputChange} required />
                        <span>{coordinatorNumberError}</span>
                        </div>
                        <div className="input-field">
                        <label>Target Audience</label>
                        <input type="number" value={values.noOfPeopleEstimated} onChange={handleNoOfPeopleEstimatedInputChange}  required />
                        <span>{noOfPeopleEstimatedError}</span>
                        </div>
                        <div className="input-field">
                        <label>Event Type</label>
                        <input type="text" value={values.eventType} onChange={handleEventTypeInputChange} required />
                        <span>{eventTypeError}</span>
                        </div>
                        <div className="input-field">
                        <label>Venue</label>
                        <input type="text" value={values.venue} onChange={handleVenueInputChange} required />
                        <span>{venueError}</span>
                        </div>
                        <div className="input-field">
                        <label>Guest Name</label>
                        <input type="text" value={values.guestName} onChange={handleguestNameInputChange} required />
                        <span>{guestNameError}</span>
                        </div>
                        <div className="input-field">
                        <label>Poster</label>
                        <input type="file" onChange={handleImageInputChange} required />
                        <span>{imageError}</span>
                        </div>
                    </div>
                    </div>
                    <div className="buttons">
                    <button className="sumbit" type='submit' >
                        <span className="btnText">Submit</span>
                        <i className="uil uil-navigator" />
                    </button>
                    </div>
                </div>
            </form>
        </div> */}



        <MDBContainer className="my-5">
                
                <MDBCard alignment='center'>
                <MDBRow className='align-items-center justify-content-center g-0'>
            
                    
            
                    <MDBCol md='6'>
                    <MDBCardBody className=' d-flex flex-column'></MDBCardBody>
                    
                    <div className='d-flex flex-row mt-2'>
                        <MDBIcon fas icon="cubes fa-3x me-3" style={{ color: '#ff6219' }}/>
                        <span className="h1 fw-bold" alignment='center'>Event Registration Form </span>
                    </div>
            
                    <form>
                    <MDBInput wrapperClass='shadow p-3 mb-5 bg-body rounded' placeholder='Event Name' id='event_name' type='text' size="lg" required value={values.eventName} onChange={handleEventNameInputChange}/>
                    <span>{eventNameError}</span>
                    
                    <MDBInput wrapperClass='shadow p-3 mb-5 bg-body rounded' placeholder='Event Start Date' id='event_date_start' type='date' size="lg" required name='fromDate'   onChange={handleFromDateInputChange} />
                    <span>{fromDateError}</span>
                    <MDBInput wrapperClass='shadow p-3 mb-5 bg-body rounded' placeholder='Event Start Time' id='event_time_start' type='time' size="lg" required name='fromTime'   onChange={handleFromTimeInputChange} />
                    <span>{fromTimeError}</span>

                    <MDBInput wrapperClass='shadow p-3 mb-5 bg-body rounded' placeholder='Event End Date' id='event_date_end' type='date' size="lg" required name='toDate'   onChange={handleToDateInputChange} />
                    <span>{toDateError}</span>
                    <MDBInput wrapperClass='shadow p-3 mb-5 bg-body rounded' placeholder='Event End Time' id='event_time_start' type='time' size="lg" required name='toTime'   onChange={handleToTimeInputChange} />
                    <span>{toTimeError}</span>
            
                    <MDBInput wrapperClass='shadow p-3 mb-5 bg-body rounded' placeholder='Co-ordinator Name' id='coname' type='text' size="lg" required value={values.coordinatorName} onChange={handleCoordinatorNameInputChange}/>
                        <span>{coordinatorNameError}</span>
            
                    <MDBInput wrapperClass='shadow p-3 mb-5 bg-body rounded' placeholder='Event Description' id='descption' type='textarea' size="lg" value={values.eventDescription} onChange={handleEventDescriptionInputChange}  required />
                        <span>{eventDescriptionError}</span> 
                    
            
                    <MDBInput wrapperClass='shadow p-3 mb-5 bg-body rounded' placeholder='Co-ordinator Mail' id='comail' type='email' size="lg" required value={values.coordinatorEmail} onChange={handleCoordinatorEmailInputChange}/>
                        <span>{coordinatorEmailError}</span>
                    
                    <MDBInput wrapperClass='shadow p-3 mb-5 bg-body rounded' placeholder='Co-ordinator Contact' id='comob' type='number' size="lg" required onChange={handleCoordinatorNumberInputChange}/>
                    <span>{coordinatorNumberError}</span>
                    
                    <MDBInput wrapperClass='shadow p-3 mb-5 bg-body rounded' placeholder='Target Audience Count' id='t_aud' type='number' size="lg" required  onChange={handleNoOfPeopleEstimatedInputChange}/>
                        <span>{noOfPeopleEstimatedError}</span>
                    
                    <MDBInput wrapperClass='shadow p-3 mb-5 bg-body rounded' placeholder='Event Type' id='etype' type='numbe' size="lg"  value={values.eventType} onChange={handleEventTypeInputChange} required />
                        <span>{eventTypeError}</span>
            
                    <MDBInput wrapperClass='shadow p-3 mb-5 bg-body rounded' placeholder='Venue' id='evenue' type='text' size="lg" value={values.venue} onChange={handleVenueInputChange} required />
                        <span>{venueError}</span>

                        <MDBInput wrapperClass='shadow p-3 mb-5 bg-body rounded' placeholder='Guest Name' id='gname' type='text' size="lg" value={values.guestName} onChange={handleguestNameInputChange} required />
                        <span>{guestNameError}</span>

                        <MDBInput wrapperClass='shadow p-3 mb-5 bg-body rounded' placeholder='Poster' id='poster' type='file' size="lg" onChange={handleImageInputChange} required />
                        <span>{imageError}</span>
                   
                    {/* <button className="mb-4 px-5 btn btn-primary" id="submit" type="submit" size='lg' onClick={submitDeatils}>Register Event</button> */}

                    
                    <button className="mb-4 px-5 btn btn-primary" color='blue' size='lg' id="submit" onClick={submitDeatils}>Register</button>
                   
                    <small>{authError}</small>

                    </form>
                    
              
                </MDBCol>
                
                </MDBRow>
                </MDBCard>
            </MDBContainer>
        
        </>

    );
}
export default EventRegistration;
