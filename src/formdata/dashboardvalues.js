import React, { Component } from "react";
import ViewUserEntries from "../components/login/dashboardcomp/userVerification/viewUserEntries"
import SceduleTournament from "../components/login/dashboardcomp/userVerification/scheduletour"
import userProfile from "../components/login/dashboardcomp/userVerification/userProfile"
import viewProspectus from "../components/login/dashboardcomp/userVerification/viewProspectus"
export const dashboardMenu = [
    {
        label: "Give Entries",

        name:"Give Entries",
        component: ViewUserEntries,
        value: 0,
       
    },

    {
        label: "Result",
        value: 1,
        name: "View Results",
        component:"hello"
    },
    {
        label: "Procpectus",
        value: 2,
        name: "",
        component: viewProspectus
    },
    {
        label: "Schedule",
        value: 3,
        name: "Scedule",
        component: SceduleTournament
    },
    {
          
        label: "Edit Pofile",
        value: 4,
        name: "",
        component: userProfile
    },

    
   



];