//dashboard menu schema used in dashboard.js
import React from "react";
import AssignmentIcon from "@material-ui/icons/Assignment";
import EditIcon from "@material-ui/icons/Edit";
import subscribeEvent from "../components/login/dashboardcomp/userVerification/GiveEntries";
import SceduleTournament from "../components/login/dashboardcomp/userVerification/scheduletour";
import userProfile from "../components/login/dashboardcomp/userVerification/userProfile";
import AccessTimeIcon from '@material-ui/icons/AccessTime';
export const dashboardData = [
  {
    label: "GIVE ENTRIES",
    pathname: "/",
    value: 0,
    component: subscribeEvent,
    icon: <AssignmentIcon />,
  },
  {
    label: "SCHEDULE",
    value: 1,
    component: SceduleTournament,
    icon: <AccessTimeIcon />,
  },
  {
    label: "EDIT",
    icon: <EditIcon />,
    component: userProfile,
    value: 2,
  },
];
