// import { createStore, combineReducers } from 'redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
// import { devToolsEnhancer } from 'redux-devtools-extension';
import citiesReduser from './cities/citiesReducer';
import tutorsReducer from './tutors/tutorsReducer';

import { customMiddlewareLogger, myMiddleware } from './middlewear/logger';

// {
//   tutors: [],
//   cities: {
//     items: [],
//     filter: '',
//   },
//   departments: [],
// }

const rootReducer = combineReducers({
  tutors: tutorsReducer,
  departments: () => [],
  cities: citiesReduser,
});

const middleware = [thunk, customMiddlewareLogger, myMiddleware];

// const store = createStore(rootReduser, devToolsEnhancer());

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware)),
);

export default store;
