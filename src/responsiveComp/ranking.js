import React, { useEffect } from 'react';
import { Desktop, Tablet, Mobile, Default } from "../views"
import ResponsiveRanking from "../components/MobileView/rankingView"

import Topbar from "../components/landingPage/TopBar"
import PlayerRanking from "../components/players/ranking"
import Mobileview from "../components/MobileView/mobileView"
const playerRankViews = (props) => {
    const { classes } = props;

    return (<div>
        <Desktop>
            <PlayerRanking classes={classes} />
        </Desktop>
        <Tablet>
          
            <ResponsiveRanking classes={classes}/>
        </Tablet>
        <Mobile>
          
            <ResponsiveRanking/>
        </Mobile>

    </div>)

}
export default playerRankViews