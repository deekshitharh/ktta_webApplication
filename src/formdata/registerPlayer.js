//form schema for player registration
//id ->for finding the target field value
//displayName ->for field name
//error ->for storing  field error
//required-> for required filed
//type->type of value
export const registration = [
  {
    displayName: "Email ID",
    order: 1,
    id: "emailAddress",
    type: "string",
    error: "",
    value: "",
    disabled: true,
    required: true,
  },

  {
    displayName: "Enter OTP",
    order: 2,
    id: "otp",
    type: "number",
    error: "",
    value: "",
    verify: true,
    required: true,
  },

  {
    id: "userName",

    displayName: "PlayerName",
    order: 4,
    type: "string",
    error: "",
    value: "",
    required: true,
  },
  {
    id: "phoneNumber",

    displayName: "Mobile Number",
    order: 5,
    type: "string",
    error: "",
    value: "",
    required: true,
  },

  {
    displayName: "Password",
    order: 3,
    id: "password",
    type: "password",
    error: "",
    value: "",
    required: true,
  },
  {
    displayName: "Confirm Password",
    order: 4,
    id: "confirmPassword",
    type: "password",
    error: "",
    value: "",
    required: true,
  },
  {
    required: true,
    id: "clubNameId",

    displayName: "Academy",
    order: 12,
    select: true,
    type: "select",
    error: "",
    value: "",
    titleCase: true,
    options: [""],
  },

  {
    required: true,
    id: "gender",

    displayName: "Gender",
    order: 12,
    select: true,
    type: "select",
    error: "",
    value: "",
    titleCase: true,
    options: [
      { value: "", key: "" },
      { value: "male", key: "Male" },
      { value: "female", key: "Female" },
    ],
  },

  {
    id: "dateOfBirth",

    displayName: "Date of birth",
    order: 10,
    type: "date",
    error: "",
    value: "",

    required: true,
  },
];
