

const sessioncommons = {}


sessioncommons.setplayerSession = (user) => {

    localStorage.setItem("playerdetails", JSON.stringify(user))

}

sessioncommons.setLocalStorage = (key ,value) => {

    localStorage.setItem(key, value)

}
sessioncommons.gettLocalStorage = () => {

    const tournament = localStorage.getItem("tournamentData");
    if (tournament) return JSON.parse(tournament);
    else return null;

}


sessioncommons.getTournament =() => {

    const tournament = localStorage.getItem("tournamentData");
    if (tournament) return JSON.parse(tournament);
    else return null;
}

sessioncommons.setTournament = (tdata) => {

    localStorage.setItem("tournamentData", JSON.stringify(tdata))

}

sessioncommons.getdrawData = () => {

    const drawDetails = localStorage.getItem("drawData");
    if (drawDetails) return JSON.parse(drawDetails);
    else return null;
}

sessioncommons.setdrawData = (drawData) => {

    localStorage.setItem("drawData", JSON.stringify(drawData))

}




sessioncommons.getplayerDetails = () => {

    const playerdetails = localStorage.getItem("playerdetails");
    if (playerdetails) return JSON.parse(playerdetails);
    else return null;
}




sessioncommons.setUserSession = (user) => {
    
       localStorage.setItem("userInfo", JSON.stringify(user))

}

sessioncommons.getUser = () => {

    const userStr = localStorage.getItem("userInfo");
    if (userStr) return JSON.parse(userStr);
    else return null;
}

sessioncommons.removeUserSession = () => {
    localStorage.removeItem("tournamentData");
    localStorage.removeItem("userInfo");
    localStorage.removeItem("playerdetails");
    localStorage.removeItem("drawData");
}
export default sessioncommons