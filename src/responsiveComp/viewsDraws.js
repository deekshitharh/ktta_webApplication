import React from 'react';
import { Desktop, Tablet, Mobile } from "../views"
import Topbar from "../components/landingPage/TopBar"
import { tournamentmenu } from "../formdata"
import Entriesdraws from "../components/tournaments/viewsDraws"
import Mobileview from "../components/MobileView/mobileView"
//genric component to display the ViewsDraws in mobile/desktop/tablet
const ViewsDraws= (props) => {
    const { classes } = props;

    return (<div>
        <Desktop>
            <Entriesdraws classes={classes} />
        </Desktop>
        <Tablet>
            <Topbar tab={true} />
            <Mobileview menulist={tournamentmenu} classes={classes} />
        </Tablet>
        <Mobile>
            <Topbar tab={true} />
            <Mobileview menulist={tournamentmenu} classes={classes} />
        </Mobile>

    </div>)

}



export default ViewsDraws