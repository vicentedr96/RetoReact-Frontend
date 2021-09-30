import { createStore, compose, applyMiddleware } from 'redux';
import reducers from "./Reducers";
import thunk from "redux-thunk";


const middleware = [thunk];

export const store = createStore(
    reducers,
    compose(
        applyMiddleware(...middleware),
        window.__REDUX_DEVTOOLS_EXTENSION__
            ? window.__REDUX_DEVTOOLS_EXTENSION__()
            : f => f
    )
);
