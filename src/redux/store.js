import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers';
//import { composeWithDevTools } from 'redux-devtools-extension';

//import { persistStore, persistReducer } from 'redux-persist';
//import storage from 'redux-persist/lib/storage';
//import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

import thunk from 'redux-thunk';

// Initial state
const initialState = {
    playlists: {},
    user: {}
}

// Config for redux-persist
// const persistConfig = {
//     key: "root",
//     storage: storage,
//     stateReconciler: autoMergeLevel2
// };
// const pReducer = persistReducer(persistConfig, rootReducer);

// Create the store, where...
export const store = createStore(
    rootReducer, // This is our reducer (currently the redux-persist one)...
    initialState, // This is our initial state...
    compose( // These are the middlewares we're applying:
        applyMiddleware(thunk), // redux-thunk, and...
        window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f // The devttools
    )
);

// Enable persistence of the store
//export const persistor = persistStore(store);