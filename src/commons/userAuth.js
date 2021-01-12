

const sessioncommons = {}

//local storage for  setting playerdetails data
sessioncommons.setplayerSession = (user) => {

    localStorage.setItem("playerdetails", JSON.stringify(user))

}
//local storage for  setting client key
sessioncommons.setApiKey = (key ,value) => {

    localStorage.setItem(key, value)

}



//local storage for getting tournamentData data
sessioncommons.getTournament =() => {

    const tournament = localStorage.getItem("tournamentData");
    if (tournament) return JSON.parse(tournament);
    else return null;
}
//local storage for setting tournamentData data
sessioncommons.setTournament = (tdata) => {

    localStorage.setItem("tournamentData", JSON.stringify(tdata))

}
//local storage for getting drawData data
sessioncommons.getdrawData = () => {

    const drawDetails = localStorage.getItem("drawData");
    if (drawDetails) return JSON.parse(drawDetails);
    else return null;
}
//local storage for setting drawData data
sessioncommons.setdrawData = (drawData) => {

    localStorage.setItem("drawData", JSON.stringify(drawData))

}



//local storage for getting playerdetails data
sessioncommons.getplayerDetails = () => {

    const playerdetails = localStorage.getItem("playerdetails");
    if (playerdetails) return JSON.parse(playerdetails);
    else return null;
}



//local storage for setting userInfo data
sessioncommons.setUserSession = (user) => {
    
       localStorage.setItem("userInfo", JSON.stringify(user))

}
//local storage for getting getUser data
sessioncommons.getUser = () => {

    const userStr = localStorage.getItem("userInfo");
    if (userStr) return JSON.parse(userStr);
    else return null;
}
//remove sessions
sessioncommons.removeUserSession = () => {
    localStorage.removeItem("tournamentData");
    localStorage.removeItem("userInfo");
    localStorage.removeItem("playerdetails");
    localStorage.removeItem("drawData");
}
export default sessioncommons