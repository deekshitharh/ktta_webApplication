import MailOutlineIcon from "@material-ui/icons/MailOutline";

import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import SubjectIcon from "@material-ui/icons/Subject";
import MessageIcon from "@material-ui/icons/Message";
import AccountCircle from "@material-ui/icons/AccountCircle";
import React from "react";
const icons = {
  account: AccountCircle,
  email: MailOutlineIcon,
  subject: SubjectIcon,
  message: MessageIcon,
  password: LockOutlinedIcon,
};
//function for material ui component with props as icon name
//props as name
const showIcon = (name) => {
  const Icon = icons[name];
  return Icon ? <Icon /> : null;
};

function FieldIcon(props) {
  return showIcon(props.name);
}

export default FieldIcon;
