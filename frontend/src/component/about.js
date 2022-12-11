import React, { useEffect } from 'react';
import authService from '../services/auth.service';

function About () {
	useEffect(()=>{
			authService.refreshPage();
		})
	return <div>
		
	</div>
}
export default About;
