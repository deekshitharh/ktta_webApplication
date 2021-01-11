import React from 'react';
import { Desktop, Tablet, Mobile} from "../views"
import ResponsiveRanking from "../components/MobileView/rankingView"


import PlayerRanking from "../components/players/ranking"
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