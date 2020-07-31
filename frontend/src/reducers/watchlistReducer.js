import { SET_CURRENT_WATCHLISTS } from "../actions/types"

const initialState = {
    watchlists: []
};
//Updating state according to authorization updates.
export default function(state = initialState, action) {
    switch (action.type) {
        case SET_CURRENT_WATCHLISTS:{
            return {
                ...state,
                watchlists: action.payload
            };
        }
        default:
            return state;
    }
}