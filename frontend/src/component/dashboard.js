import React, { useEffect, useState } from 'react';
// import { Route,Link } from "react-router-dom";
// import EventInfo from './eventInfo';

import "./dashboard.css";
import authService from '../services/auth.service';
import { useNavigate } from "react-router-dom";
import UserDashboard from './userDashboard';
import AdminDashboard from './adminDashboard';
import OrganizerDashboard from './organizerDashboard';
function Dashboard () {

  useEffect(()=>{
      authService.refreshPage();
    },[])
      
      return (
        <div>
          {{
            "user":<UserDashboard/>,
            "organizer":<OrganizerDashboard/>,
            "admin":<AdminDashboard/>
          }[authService.getCurrentUser().type]}
        </div>
    );
  }

export default Dashboard;