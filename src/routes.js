import React from "react";
import { Route, HashRouter, Switch } from "react-router-dom";
import Tournament from "./components/tournaments/tornament";
import Officebearers from "./components/about/officeBeareres";
import Main from "./components/Main";
import Legal from "./components/legal/legal"
import ClubAssociation  from "./components/about/ClubAsscoc";
import Contact from "./components/contact/contact";
import PlayerList from "./components/players/playerList";
import newsInfo from "./components/news/newsinfo";
import PlayerRanking from "./components/players/ranking";
import DetailedNews from "./components/news/detailednews";
import { withStyles } from "@material-ui/core/styles";
import newsStyles from "./styles/newsStyle";
import Entriesdraws from "./components/tournaments/viewsDraws"
import Login from "./components/login/login"
import Dashboard from "./components/login/dashboardcomp/dashboard"
import FogotPassword from "./components/login/fogotPassword"
import registerSteps from "./components/login/registerSteps"
import playerRegister from "./components/login/registerPlayer"
import clubAssoc from "./responsiveComp/clubAssoc"
import  showdraws from "./components/login/dashboardcomp/userVerification/showdraws"
import playerRankViews from "./responsiveComp/ranking"
import playerListViews from "./responsiveComp/playerList"
import playerRegistration from "./responsiveComp/regsteps"
import { sessioncommons } from "./commons" 
import ViewsDraws from "./responsiveComp/viewsDraws"
import PrivateRoute from "./PrivateRoutes"
function renderComponent(Component, defaultProps, customProps) {
  console.log(" routes..default", defaultProps)
  let props = { ...defaultProps, ...customProps };
  console.log(" props.default", props)
  let StyledComponent = withStyles(newsStyles)(Component);
  return <StyledComponent {...props} />;
}



const AppRoutes = (props1) => {
  console.log("appproutes",props1)
  return (
    <HashRouter>
      <Switch>
        <Route
          exact
          path="/"
          render={props => renderComponent(Main, props, props1)}
        />
        <Route
          exact
          path="/registreredclubs_Assoc"
          render={props => renderComponent(clubAssoc, props, props1)}
        />
        <Route
          exact
          path="/fogotPassword"
          render={props => renderComponent(FogotPassword, props, props1)}
        />
        <Route
          exact
          path="/showdraws/:id"
          render={props => renderComponent(showdraws, props, props1)}
        />

        <Route
          exact
          path="/login"
          render={props => renderComponent(Login, props, props1)}
        />
        <PrivateRoute
          exact
          path="/dashboard"
          data={{
           
           // toggleTheme: props.toggleTheme

          }}
          component={Dashboard}
        />

    
        <Route
          exact
          path="/entriesDraws/:id"
          render={props => renderComponent(ViewsDraws, props, props1)}
        />
        <Route
          exact
          path="/registerPlayer4"
          render={props => renderComponent(playerRegister, props, props1)}
        />
        <Route
          exact
          path="/registerSteps"
          render={props => renderComponent(registerSteps, props, props1)}
        />

 
        <Route
          exact
          path="/legal"
          render={props => renderComponent(Legal, props, props1)}
        />
     
        <Route
          exact
          path="/newsdata"
          render={props => renderComponent(newsInfo, props, props1)}
        />
        <Route
          exact
          path="/officebearers"
          render={props => renderComponent(Officebearers, props, props1)}
        />
   
        <Route
          exact
          path="/detailednews/:id"
          render={props => renderComponent(DetailedNews, props, props1)}
        />
        <Route
          exact
          path="/contactus"
          render={props => renderComponent(Contact, props, props1)}
        />
        <Route
          exact
          path="/playerlist"
          render={props => renderComponent(playerListViews, props, props1)}
        />
        <Route
          exact
          path="/tornamentlist"
          render={props => renderComponent(Tournament, props, props1)}
        />
        <Route
          exact
          path="/player_ranking"
          render={props => renderComponent(playerRankViews, props, props1)}
        />
      </Switch>
    </HashRouter>
  )
}
export default AppRoutes 