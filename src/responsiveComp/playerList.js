import React, { useEffect } from 'react';
import { Desktop, Tablet, Mobile, Default } from "../views"
import ResponsivePlayerList from "../components/MobileView/playerlistView"

import Topbar from "../components/landingPage/TopBar"
import PlayerList from "../components/players/playerList"

const playerListViews = (props) => {
    const { classes } = props;

    return (<div>
        <Desktop>
            <PlayerList classes={classes} />
        </Desktop>
        <Tablet>

            <ResponsivePlayerList classes={classes} />
        </Tablet>
        <Mobile>

            <ResponsivePlayerList />
        </Mobile>

    </div>)

}
export default playerListViews