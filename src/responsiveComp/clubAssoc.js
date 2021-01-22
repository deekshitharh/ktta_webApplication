import React from 'react';
import { Desktop, Tablet, Mobile } from "../views"
import ClubAssociation from "../components/about/ClubAsscoc"
import { aboutMenu } from "../formdata"
import Topbar from "../components/landingPage/TopBar"

import Mobileview from "../components/MobileView/mobileView"
//genric component to display the registered association component  in mobile/desktop/tablet
const clubAssoc = (props) => {
    const { classes } = props;

    return (<div>
        <Desktop>
            <ClubAssociation classes={classes} />
        </Desktop>
        <Tablet>
            <Topbar tab={true}/>
            <Mobileview menulist={aboutMenu} classes={classes} />
        </Tablet>
        <Mobile>
            <Topbar tab={true}/>
            <Mobileview menulist={aboutMenu} classes={classes} />
        </Mobile>

    </div>)

}



export default clubAssoc