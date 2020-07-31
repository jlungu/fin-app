import { combineReducers } from "redux"
import authReducer from "./authReducer" 
import errorReducer from "./errorReducer"
import watchlistReducer from "./watchlistReducer";

//Combining reducers into rootReducer
export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    watchlists: watchlistReducer
});