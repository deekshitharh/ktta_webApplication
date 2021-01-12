import { sessioncommons } from "./commons"
const ANONY_USER = { "status": false, "user": null }
const VALID_USER = { "status": true, "user": null }


//autentication checking function annoy/valid user for private route ie dashboard

export const checkToken = () => {
    let user = sessioncommons.getUser();
    if (user == null) {
        return ANONY_USER;
    }
    return VALID_USER;
}
    


