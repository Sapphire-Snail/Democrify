import { createStore, applyMiddleware, compose } from 'redux';

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

import thunk from 'redux-thunk';
import rootReducer from './reducers';

// Initial state
const initialState = {
  playlists: {},
  user: {},
  tracks: {},
  webplayer: {}
};

// Config for redux-persist
const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['webplayer', 'search'],
  stateReconciler: autoMergeLevel2,
};
const pReducer = persistReducer(persistConfig, rootReducer);

// Create the store
export const store = createStore(
  pReducer,
  initialState,
  compose(
    // Middlewares we're applying:
    applyMiddleware(thunk), // redux-thunk
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : (f) => f, // Devttools
  ),
);

// Enable persistence of the store
export const persistor = persistStore(store);
