import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMale,
  faCircle,
  faTrophy,
  faFemale,
  faLocationArrow,
  faIdBadge,
  faPhone,
  faAddressBook,
  faEnvelope,
  faUser,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import React from "react";
const icons = {
  male: faMale,
  female: faFemale,
  route: faLocationArrow,
  contact: faIdBadge,
  phone: faPhone,
  designation: faAddressBook,
  email: faEnvelope,
  name: faUser,
  close: faTimesCircle,
  circle: faCircle,
  winner: faTrophy,
  facebook: faFacebook,
  instagram: faInstagram,
  twitter: faTwitter,
};
//font awesome icon function used in tournament.js,matchresults.js,assoclist.js,standingContent.js,mediaExtract.js,commitedetails.js,showdraws.js,showresults.js files to display the icons
const showIcon = (name, size, style) => {
  const Icon = icons[name];
  return Icon ? (
    <FontAwesomeIcon icon={Icon} size={size} style={style} />
  ) : null;
};

//function for fontawesome component
//props with icon name size,style
function Fontawsome(props) {
  return showIcon(props.name, props.size, props.style);
}

export default Fontawsome;
