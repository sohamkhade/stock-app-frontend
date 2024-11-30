import * as actionTypes from "./portfolioActionTypes";

export const changePortfolio = (portfolio) => {
    return {
        type: actionTypes.PORTFOLIO_NAME,
        portfolio: portfolio
    }
}