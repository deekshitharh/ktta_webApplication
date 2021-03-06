//top bar menu schema used in TopBar.js component
import React from "react";
import HomeIcon from '@material-ui/icons/Home';
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
   
  },
    {
      label: "EVENTS",
      icon: <TodayIcon />,
      pathname: "/tornamentlist",
      value: 3
    },
 
    {
      label: "CONTACT",
      icon: <ContactsIcon />,
      pathname: "/contactus",
      value: 4
    },
 

   
  ];
  
  