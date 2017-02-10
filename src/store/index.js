import { createStore, applyMiddleware, combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers';
import { reducer as formReducer } from 'redux-form';

const configureStore = (client, initialState) => {

  const middlewares = [
    thunkMiddleware,
    client.middleware()
  ];

  const store = createStore(
    combineReducers({
      rootReducer,
      form: formReducer,
      apollo: client.reducer(),
      routing: routerReducer
    }),
    initialState,
    applyMiddleware(
      ...middlewares
    )
  );

  if(module.hot) {
  	module.hot.accept('../reducers', () => {
  		store.replaceReducer(require('../reducers').default);
  	});
  }

  return store;
};

export default configureStore;
