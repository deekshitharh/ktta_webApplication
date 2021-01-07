import React, { useEffect } from 'react';
import { Desktop, Tablet, Mobile, Default } from "../views"
import ClubAssociation from "../components/about/ClubAsscoc"
import { aboutMenu } from "../formdata"
import Topbar from "../components/landingPage/TopBar"
import { tournamentmenu } from "../formdata"
import Entriesdraws from "../components/tournaments/viewsDraws"
import Mobileview from "../components/MobileView/mobileView"
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