// import { createStore } from 'redux';
// import rootReducer from '../reducers';
//
// export default function configureStore(initialState) {
//     return createStore(rootReducer, initialState);
// }

import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import logger from 'redux-logger';

export default function configureStore(initialState) {
    const store = createStore(
        rootReducer,
        initialState,
        applyMiddleware(
            logger, // Add redux-logger middleware
            // Add any other middleware you want to use here
        )
    );

    return store;
}
