//steps schema for player registration

import playerRegister from "../components/login/registerPlayer"
export const steps = [
    {
        activestep: 0,
        label: 'Email Verification',
        component: "",
        
    },
    {
           
        activestep: 1,
        label: 'Register Player',
        component: playerRegister
    },

    
    

  
];