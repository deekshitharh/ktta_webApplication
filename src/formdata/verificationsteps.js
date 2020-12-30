
import Idverification from "../components/login/dashboardcomp/userVerification/idverifiction"
import Emailverification from "../components/login/Emailverification"
import playerRegister from "../components/login/registerPlayer"
export const steps = [
    {
        activestep: 0,
        label: 'Email Verification',
        component: Emailverification,
        
    },
    {
           
        activestep: 1,
        label: 'Register Player',
        component: playerRegister
    },

    
    

  
];