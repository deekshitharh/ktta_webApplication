//form schema for login
//form schema for passwod channge in fogot password.js componet
//id ->for finding the target field value
//displayName ->for field name
//error ->for storing  filed error
//required-> for required filed
//type->type of value
//verify for otp verifcation
//adoment for field icon
export const formFileds = [
  {
    displayName: "Email",
    id: "emailAddress",
    adorment: "email",
    label: "Email-Id",
    type: "string",
    error: "",
    value: "",
    required: true,
  },

  {
    displayName: "Password",
    id: "password",
    adorment: "password",
    type: "password",
    error: "",
    value: "",
    label: "Password",
    required: true,
  },
];
