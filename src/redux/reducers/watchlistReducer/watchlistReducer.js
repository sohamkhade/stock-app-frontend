import * as actionTypes from '../../actions/watchlistActions/watchlistActionTypes';

export default (state = "", action) => {
    switch (action.type){
        case actionTypes.WATCHLIST:
            return action.watchlist
        default:
            return state;
    }
};