//form schema for edit fields

export const editData = [

    {
        key: "dateOfBirth",
        disabled: true,
        id: "DOB",
        displayName: "DOB",
        order: 10,
        type: "date",
        error: "",
        value: "",

        required: true
    },
    {
        id: "email",
      disabled:true,
        order: 1,
        displayName: "Email Address",
        key: "emailAddress",
        type: "string",
        error: "",
        value: "",
        required: true,
    },

   

    {
        key: "userName",
        id: "userName",
        displayName: "Username",
        order: 4,
        type: "string",
        error: "",
        value: "",
        required: true,
    },
    {
        key: "phoneNumber",
        id: "phoneNo",
        disabled: true,
        displayName: "Phone Number",
        order: 5,
        type: "string",
        error: "",
        value: "",
        
    },


   

    {
        required: true,
        key: "gender",
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
        key: "pinCode",
        id: "pinCode",
      
        displayName: "Pincode",
        order: 5,
        type: "string",
        error: "",
        value: "",
        required: true
    },
    {
        key: "address",
        id: "address",
      
        displayName: "Address",
        order: 5,
        type: "string",
        error: "",
        value: "",
        required: true
    },
    {
        key: "city",
        id: "city",

        displayName: "City",
        order: 5,
        type: "string",
        error: "",
        value: "",
        required: true
    },
    
  

];