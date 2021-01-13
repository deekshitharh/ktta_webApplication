import ViewEntries  from "../components/tournaments/ViewsDraws/viewEntries";

import ViewDraws from "../components/tournaments/ViewsDraws/draws";
//menus for schema for View Entries/draws
export const tournamentmenu = [
    {
        label: "View Entries",

        link: 'fist-tab',
        component: ViewEntries,
        value: 0
    },

    {
        label: "Draws",
        link: 'second-tab',
        value: 1,
        component:ViewDraws
    },



];


