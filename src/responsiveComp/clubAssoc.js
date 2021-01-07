import React, { useEffect } from 'react';
import { Desktop, Tablet, Mobile, Default } from "../views"
import ClubAssociation from "../components/about/ClubAsscoc"
import { aboutMenu } from "../formdata"
import Topbar from "../components/landingPage/TopBar"

import Mobileview from "../components/MobileView/mobileView"
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