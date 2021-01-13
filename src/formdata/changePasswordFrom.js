//form schema for passwod change
export const changePasswordForm = [
    {
        "id": "email", "displayName": "Email", "order": 1, "key": "email",
        "type": "string", "error": "",  "value": "", "required": true
    },
    {
        "id": "otp", "displayName": "OTP", "order": 2, "key": "otp",
        "type": "number", "error": "", "value": "", "required": true, verify:true
    },
    {
        "id": "password", "displayName": "Password", "order": 3, "key": "password", 
        "type": "password", "error": "", "value": "", "required": true
    },
    {
        "id": "confirmPassword", "displayName": "Confirm Password", "order": 4, "key": "confirmPassword",
        "type": "password", "error": "", "value": "", "required": true
    },
  
   

]