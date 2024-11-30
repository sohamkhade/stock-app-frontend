import * as actionTypes from "./searchActionTypes";

export const changeSearch = (search) => {
    return {
        type: actionTypes.SEARCH,
        search: search
    }
}