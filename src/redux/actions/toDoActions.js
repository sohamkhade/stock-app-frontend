import * as actionTypes from './actionTypes';

export const createToDo = (todo) => {
    return {
        type: actionTypes.CREATE_NEW_TODO,
        todo: todo
    }
};

export const deleteToDo = (id) => {
    return {
        type: actionTypes.REMOVE_TODO,
        id: id
    }
};

export const changeTickerName = (name) => {
    return {
        type: actionTypes.TICKER_NAME,
        ticker: name
    }
}