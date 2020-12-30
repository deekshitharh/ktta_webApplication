import InboxIcon from '@material-ui/icons/MoveToInbox';
import React, { Component } from "react";
import RedeemIcon from '@material-ui/icons/Redeem';
import HomeIcon from '@material-ui/icons/Home';
import PeopleIcon from '@material-ui/icons/People';
import TodayIcon from '@material-ui/icons/Today';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import ContactsIcon from '@material-ui/icons/Contacts';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import AssessmentIcon from '@material-ui/icons/Assessment';
export const menuData = [
    {
      label: "HOME",
      pathname: "/",
    value: 0,
    icon: <HomeIcon/>
    },
  
    {
      label: "PLAYERS",
      value: 1,
      hash: "#the-hash",
      icon: <AssessmentIcon />,
      choices: [
        {
          isClicked:false, name: "LIST OF PLAYERS", pathname: "/playerlist", label: "PLAYERS", icon: <EmojiPeopleIcon />
        },
        {
          isClicked: false,  name: "RANKING", pathname: "/player_ranking", label: "PLAYERS", icon: <AssessmentIcon/> 
        }
      ]
  },
  {
    label: "LEGAL",
    value: 2,
    icon: <FileCopyIcon />,
    pathname: "/legal"
    // choices: [
    //   { name: "DIRECTIVES", pathname:"/directives" },
    //   { name: "STATE RANKING EVENTS-RULES", pathname: "/player_ranking" },
    //   { name: "GENERAL BODY MEETING", pathname: "/player_ranking" },
    //   { name: "FORMS", pathname: "/player_ranking" }
    // ]
  },
    {
      label: "EVENTS",
      icon: <TodayIcon />,
      pathname: "/tornamentlist",
      value: 3
    },
    //  {
    //   label: "ABOUT",
    //   value: 4,
    //   choices: [
      
    //     { name: "OFFICE BEARERS ", pathname: "/officebereres" },
    //     { name: "REGISTERED CLUBS/ASSOCIATIONS", pathname: "/registreredclubs_Assoc"}
    //   ]
    // },
    // {
    //   label: "NEWS",
    //   value: 5,
    //   pathname: "/newsdata"
    // },
    {
      label: "CONTACT",
      icon: <ContactsIcon />,
      pathname: "/contactus",
      value: 4
    },
 

   
  ];
  
  