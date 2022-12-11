import React from 'react';
import { useEffect } from 'react';
import bgImage from  '../assets/cll1.jpg';
import authService from '../services/auth.service';

function Home (){
	useEffect(()=>{
		authService.refreshPage();
	})
	return (<div style={{backgroundImage:`url(${bgImage})`,height:"800px",backgroundPosition:"center",backgroundSize:"cover",backgroundRepeat:"no-repeat"}}>
				<div className="container">
                	<h1 className="text-center d-grid" style={{color:"rgb(242,245,248)",fontSize:"56px",fontWeight:"bold",fontFamily:"Roboto, sans-serif"}}>KLE TECH<br/>EVENT MANAGEMENT<br/></h1>
                	<h3 className="text-center" style={{color:"rgb(242,245,248)",paddingTop:"0.25em",paddingBottom:"0.25em",fontWeight:"normal"}}>Never miss a thing in the University</h3>
            	</div>
			</div>);
}

export default Home;
