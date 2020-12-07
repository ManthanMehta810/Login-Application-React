import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import storage from 'redux-persist/lib/storage';
import rootReducer from './reducers';
import sagas from './sagas';
// configure Persist
const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['ProfileReducer'],
};
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// Persist Reducers with config
const persistedReducer = persistReducer(persistConfig, rootReducer);
// create Middleware
const sagaMiddleware = createSagaMiddleware();
// Configure store
const configureStore = () => {
  // Create Store
  const store = createStore(
    persistedReducer,
    composeEnhancers(applyMiddleware(sagaMiddleware)),
  );
  // Persist Store
  const persistor = persistStore(store);
  // Apply middleware (saga)
  sagaMiddleware.run(sagas);
  const storePersist = {
    store,
    persistor,
  };
  return storePersist;
};
export default configureStore();
