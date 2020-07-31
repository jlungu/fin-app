import axios from "axios"

import { GET_ERRORS, SET_CURRENT_WATCHLISTS } from "./types"

//ADD NEW WATCHLIST
export const addWatchlist = (watchlist, newUser) => dispatch => {
    //If its a new user, we need to create the watchlists item in local storage
    if (newUser){
        axios.post("/api/watchlists/add", watchlist)
            .then(() => dispatch(setWatchlists([watchlist])))//Updating state.
            .catch(err => dispatch({type: GET_ERRORS, payload: err.response.data}))
    }
    else {
        let oldWatchlists = localStorage.getItem("watchlists")
        axios.post("/api/watchlists/add", watchlist)
            .then(res => dispatch(setWatchlists((oldWatchlists.push(watchlist)))))
            .catch(err => dispatch({type: GET_ERRORS, payload: err.response.data}))
    }
}

//UPDATE EXISTING WATCHLIST
export const updateWatchlist = (id, wl, watchLists) => dispatch => {
    console.log(id, wl, watchLists)
    axios.post("/api/watchlists/update/"+id, wl)
        .then(res => {
            //Filtering them out, splicing out the given id
            watchLists = watchLists.filter(wl => wl.id != id)
            watchLists.push(res)//NOW have correct watchlists!
            dispatch(setWatchlists(watchLists))
        })
        .catch(err => dispatch({type: GET_ERRORS, payload: err})) 
}

//GET ALL WATCHLISTS
export const getWatchlists = (userEmail) => dispatch => {
    const params = {
        email: userEmail
    }
    axios.get("/api/watchlists/getAllWithEmail", {params})
        .then(res => {
            dispatch(setWatchlists(res.data))})
        .catch(err => dispatch({type: GET_ERRORS, payload: err.response.data})) 
}

//DELETE WATCHLISTS
export const deleteWatchlist = (id, watchLists) => dispatch => {
    axios.prototype("/api/watchlists/delete/"+id, {})
        .then(() => {
            let watchlists = localStorage.getItem("watchlists")
            dispatch(setWatchlists(watchlists.filter(wl => wl.id != id)))//Splicing out that watchlist.
        })
        .catch(err => dispatch({type: GET_ERRORS, payload: err.response.data}))
}

//Sets the watchlist we have in state.
export const setWatchlists = watchlists => {
    return{
        type: SET_CURRENT_WATCHLISTS,
        payload: watchlists
    }
}