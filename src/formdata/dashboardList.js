//dashboard menu schema
import React from "react";

import AssignmentIcon from '@material-ui/icons/Assignment';

import FileCopyIcon from '@material-ui/icons/FileCopy';

import AccessTimeIcon from '@material-ui/icons/AccessTime';
import EditIcon from '@material-ui/icons/Edit';
import subscribeEvent from "../components/login/dashboardcomp/userVerification/GiveEntries"
import SceduleTournament from "../components/login/dashboardcomp/userVerification/scheduletour"
import userProfile from "../components/login/dashboardcomp/userVerification/userProfile"
import displaydraws from "../components/login/dashboardcomp/userVerification/showResults"
export const dashboardData = [
   


  {
    label: "GIVE ENTRIES",
    pathname: "/",
    value: 0,
    component: subscribeEvent,
    icon: <AssignmentIcon />
  },
  {
    label: "RESULT",
    pathname: "/",
    value: 1,
    component: displaydraws,
    icon: <FileCopyIcon />
  },
  
  
 
 
    // {
    //     label: "PROSPECTUS",
    //        value: 2,
    //   icon: <FileCopyIcon/>,
    //   component: viewProspectus
    // },
  {
    label: "SCHEDULE",
    value: 2,
    component: SceduleTournament,
    icon: <AccessTimeIcon />,
   
  
  },
    {
      label: "EDIT",
      icon: <EditIcon/>,
      component:userProfile,
    
      value: 3
    },
    
 

   
  ];
  
  