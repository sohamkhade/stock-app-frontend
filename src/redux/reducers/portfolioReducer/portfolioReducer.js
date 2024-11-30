import * as actionTypes from '../../actions/portfolioActions/portfolioActionTypes';

export default (state = "", action) => {
    switch (action.type){
        case actionTypes.PORTFOLIO_NAME:
            return action.portfolio
        default:
            return state;
    }
};