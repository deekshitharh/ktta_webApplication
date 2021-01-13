
//form schema for contact us

const fileds = [

  {
    "id": "name", "displayName": "Name", "order": 1, "key": "userName", adorment: "account", label: "Name",
    "type": "string", "error": "", "value": "", "required": true
  },


  {
    "id": "email", "displayName": "Email", "order": 2, "key": "emailAddress", adorment: "email", label: "Email-Id",
    "type": "string", "error": "", "value": "", "required": true
  },


 
  {
    id: "subject",
    "displayName": "subject",
    label: "Subject",
    adorment: "subject",
    type: "text",
    value: "",
    key:"subject",
    "required": true
  },
  {
    id: "Messege",
    "displayName": "Messege",
    label: "Messege",
    adorment: "message",
    type: "text",
    value: "",
    key: "message",
    "required": true,
     "multiline": true,
    "rows": "5",
  },
];

export default fileds;
