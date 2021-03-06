import React from 'react';
import { Desktop, Tablet, Mobile } from "../views"
import Topbar from "../components/landingPage/TopBar"
//genric component to display the registerSteps.js in mobile/desktop/tablet

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