import ViewEntries  from "../components/tournaments/ViewsDraws/viewEntries";
import displaydraws from "../components/tournaments/ViewsDraws/showResults"
import ViewDraws from "../components/tournaments/ViewsDraws/draws";
//menus for schema for View  Entries/draws 
export const tournamentmenu = [
    {
        label: "Result",
        link: 'second-tab',
        value: 0,
        component:displaydraws 
    },
    {
        label: "View Entries",

        link: 'fist-tab',
        component: ViewEntries,
        value: 1
    },

    {
        label: "Draws",
        link: 'second-tab',
        value: 2,
        component:ViewDraws
    },
   



];


