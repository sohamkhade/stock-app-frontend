import * as actionTypes from '../actions/actionTypes';

export default (state= "", action) => {
    switch (action.type){
        case actionTypes.TICKER_NAME:
            return action.ticker;
        default:
            return state;
    }
};