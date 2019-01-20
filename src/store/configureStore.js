import { createStore, applyMiddleware, compose } from 'redux';

import rootReducer from './reducers/rootReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const configureStore = () => {
    return createStore(rootReducer, composeEnhancers(applyMiddleware()));
};

export default configureStore;