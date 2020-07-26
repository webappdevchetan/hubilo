import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import rootReducer from '../reducers/rootReducer';

const middlewares = applyMiddleware(logger);

export const store =
  process.env.NODE_ENV === 'development' ? createStore(rootReducer, middlewares) : createStore(rootReducer);

export const dispatch = (action) => {
  store.dispatch(action);
};
