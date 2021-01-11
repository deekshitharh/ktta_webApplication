import React from 'react';
import { Desktop, Tablet, Mobile } from "../views"

import Topbar from "../components/landingPage/TopBar"

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