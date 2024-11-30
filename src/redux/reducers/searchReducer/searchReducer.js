import * as actionTypes from '../../actions/searchActions/searchActionTypes';

export default (state = "", action) => {
    switch (action.type){
        case actionTypes.SEARCH:
            return action.search
        default:
            return state;
    }
};