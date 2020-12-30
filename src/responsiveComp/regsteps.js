import registerSteps from "../components/login/registerSteps"
import React, { useEffect } from 'react';
import { Desktop, Tablet, Mobile, Default } from "../views"
import ClubAssociation from "../components/about/ClubAsscoc"
import { aboutMenu } from "../formdata"
import Topbar from "../components/landingPage/TopBar"

import Mobileview from "../components/MobileView/mobileView"
const playerRegistration = (props) => {
    const { classes } = props;

    return (<div>
        <Desktop>
            <registerSteps classes={classes} />
        </Desktop>
        <Tablet>
            <Topbar tab={true} />
            <registerSteps orientation={true} />
        </Tablet>
        <Mobile>
            <Topbar tab={true} />
            <registerSteps orientation={true} />
        </Mobile>

    </div>)

}



export default playerRegistration