import axios from "axios"
import setAuthToken from "../utils/setAuthToken"
import jwt_decode from "jwt-decode"

import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING } from "./types"

//REGISTER
export const registerUser = (userData, history) => dispatch => {
    axios.post("/api/users/register", userData)
        .then(res => history.push("/login"))//Redir to login page!
        .catch(err => dispatch({type: GET_ERRORS, payload: err.response.data})
    );
};

//LOGIN
export const loginUser = (userData) => dispatch  => {
    axios.post("http://localhost:5000/api/users/login", userData)
        .then(res => {
            //SAVING TOKEN TO LOCAL STORAGE
            const { token } = res.data
            localStorage.setItem("jwtToken", token);
            //SAVING USER EMAIL TO LOCAL STORAGE AS WELL
            localStorage.setItem("email", userData.email)
            setAuthToken(token)
            const usr = jwt_decode(token)
            dispatch(setCurrentUser(usr))
        })
        .catch(err => dispatch({type: GET_ERRORS, payload: err.response.data}))
}

//SETTING SESSION USER
export const setCurrentUser = usr => {
    return {
        type: SET_CURRENT_USER,
        payload: usr
    }
}
//SETTING USER LOADING
export const setUserLoading = () => {
    return {
        type: USER_LOADING
    }
}

export const logoutUser = () => dispatch => {
    //REMOVE TOKEN FROM LOCAL STORAGE
    localStorage.removeItem("jwtToken")
    localStorage.removeItem("email")
    setAuthToken(false)
    //NOW, NO CURRENT USER
    dispatch(setCurrentUser({}))
}