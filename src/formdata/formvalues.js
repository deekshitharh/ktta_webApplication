//form schema for contact us in contact.js component
//form schema for passwod channge in fogot password.js componet
//id ->for finding the target field value
//displayName ->for field name
//error ->for storing  filed error
//required-> for required filed
//type->type of value
//verify for otp verifcation
const fileds = [
  {
    id: "userName",
    displayName: "Name",
    adorment: "account",
    label: "Name",
    type: "string",
    error: "",
    value: "",
    required: true,
  },

  {
    id: "email",
    displayName: "Email",
    adorment: "email",
    label: "Email-Id",
    type: "string",
    error: "",
    value: "",
    required: true,
  },

  {
    id: "subject",
    displayName: "subject",
    label: "Subject",
    adorment: "subject",
    type: "text",
    value: "",
    required: true,
  },
  {
    id: "Messege",
    displayName: "Messege",
    label: "Messege",
    adorment: "message",
    type: "text",
    value: "",
    required: true,
    multiline: true,
  
  },
];

export default fileds;
