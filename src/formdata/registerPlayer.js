export const registration = [
    {
        id: "email",
        displayName: "Email ID",
        order: 1,
        key: "emailAddress",
        type: "string",
        error: "",
        value: "",
        disabled:true,
        required: true,
    },

    {
        id: "otp",
        displayName: "Enter OTP",
        order: 2,
        key: "otp",
        type: "number",
        error: "",
        value: "",
        verify: true,
        required: true,
    },

    // {
    //     "key": "dateOfInc", "displayName": "Date Of Incorporation", "order": 3,
    //     "type": "date", "error": "", "value": "", "ss": 123,
    //     "validatorFunc": commons.checkIfPastDate,
    //     "validatorMsg": "Date Of Incorporation shoud be past date"
    // },
    {
        key: "userName",
        id: "name",
        displayName: " PlayerName",
        order: 4,
        type: "string",
        error: "",
        value: "",
        required: true,
    },
    {
        key: "phoneNumber",
        id: "phoneNo",
        displayName: "Mobile Number",
        order: 5,
        type: "string",
        error: "",
        value: "",
        required: true
    },


    {
        "id": "password", "displayName": "Password", "order": 3, "key": "password",
        "type": "password", "error": "", "value": "", "required": true
    },
    {
        "id": "confirmPassword", "displayName": "Confirm Password", "order": 4, "key": "confirmPassword",
        "type": "password", "error": "", "value": "", "required": true
    },
    {
        required: true,
        key: "clubNameId",
        id: "clubNameId",
        displayName: "Academy",
        order: 12,
        select: true,
        type: "select",
        error: "",
        value: "",
        titleCase: true,
        options: [""]


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
            { value: "", key: ""},
            { value: "male", key: "Male" },
            { value: "female", key: "Female" },
        ],
    },

    {
        key: "dateOfBirth",
        id: "DOB",
        displayName: "Date of birth",
        order: 10,
        type: "date",
        error: "",
        value: "",

        required: true
    },

];
