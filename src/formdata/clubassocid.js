import RegisteredAssoc from "../components/about/registeredAssoc";
import RegisteredClubs from "../components/about/registeredClub";
//menus used in clubAssoc.js component
export const aboutMenu = [
  {
    label: "Registered Clubs",
   component: RegisteredClubs,
    value: 0,
  },

  {
    label: "Registered Associations",
    value: 1,
    component:RegisteredAssoc,
  },
];
