import axios from "axios"

//Deletes auth token, or sets it; depends if user is logged in!
const setAuthToken = token => {
    if (token){
        axios.defaults.headers.common["Authorization"] = token
    } 
    else {
        delete axios.defaults.headers.common["Authorization"]
    }
}

export default setAuthToken;