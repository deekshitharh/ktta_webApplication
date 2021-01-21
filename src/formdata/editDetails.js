//form schema for edit fields
//id ->for finding the target field value
//displayName ->for field name
//error ->for storing  filed error
//required-> for required filed
//type ->type of value
//value -> filed value
export const editData = [
  {
    id: "dateOfBirth",
    disabled: true,
    displayName: "DOB",
    type: "date",
    error: "",
    value: "",
    required: true,
  },
  {
    disabled: true,
    displayName: "Email Address",
    id: "emailAddress",
    type: "string",
    error: "",
    value: "",
    required: true,
  },

  {
    id: "userName",
    displayName: "Username",
    disabled: true,
    type: "string",
    error: "",
    value: "",
    required: true,
  },
  {
    id: "phoneNumber",
    disabled: true,
    displayName: "Phone Number",
    type: "string",
    error: "",
    value: "",
  },

  {
    required: true,
    id: "gender",
    displayName: "Gender",
    disabled: true,
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
    id: "pinCode",
    displayName: "Pincode",
    type: "string",
    error: "",
    value: "",
    required: true,
  },
  {
    id: "address",
    disabled: true,
    displayName: "Address",
    type: "string",
    error: "",
    value: "",
    required: true,
  },
  {
    id: "city",
    displayName: "City",
    type: "string",
    error: "",
    value: "",
    required: true,
  },
];
