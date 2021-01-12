import React from 'react';
import { Desktop, Tablet, Mobile } from "../views"
import ResponsivePlayerList from "../components/MobileView/playerlistView"


import PlayerList from "../components/players/playerList"
//genric component to display the playerList in mobile/desktop/tablet

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