import { combineReducers } from 'redux';
import todo from './toDoReducers';
import ticker from './tickerNameReducer';
import search from './searchReducer/searchReducer';
import watchlist from './watchlistReducer/watchlistReducer';
import portfolio from './portfolioReducer/portfolioReducer';

export default combineReducers({
    todo: todo,
    ticker: ticker,
    search: search,
    watchlist: watchlist,
    portfolio: portfolio
});