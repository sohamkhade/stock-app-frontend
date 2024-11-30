import * as actionTypes from "./watchlistActionTypes";

export const changeWatchList = (watchlist) => {
    return {
        type: actionTypes.WATCHLIST,
        watchlist: watchlist
    }
}