import ViewEntries from "../components/tournaments/ViewsDraws/viewEntries";
import displaydraws from "../components/tournaments/ViewsDraws/showResults";
import ViewDraws from "../components/tournaments/ViewsDraws/draws";
//menus for schema for View  of viewsDraws.js
export const tournamentmenu = [
  {
    label: "Result",
    value: 0,
    component: displaydraws,
  },
  {
    label: "View Entries",
    component: ViewEntries,
    value: 1,
  },

  {
    label: "Draws",
    value: 2,
    component: ViewDraws,
  },
];
