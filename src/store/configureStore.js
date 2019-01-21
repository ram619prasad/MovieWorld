import { createStore, applyMiddleware, compose } from 'redux';
import ReduxThunk from 'redux-thunk'

import rootReducer from './reducers/rootReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const configureStore = () => {
    return createStore(rootReducer, composeEnhancers(applyMiddleware(ReduxThunk)));
};

export default configureStore;