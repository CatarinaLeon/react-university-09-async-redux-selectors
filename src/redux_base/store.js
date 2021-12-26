import { createStore, combineReducers } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';
import citiesReduser from './cities/citiesReducer';
import tutorsReducer from './tutors/tutorsReducer';

// {
//   tutors: [],
//   cities: {
//     items: [],
//     filter: '',
//   },
//   departments: [],
// }

const rootReduser = combineReducers({
  tutors: tutorsReducer,
  departments: () => [],
  cities: citiesReduser,
});

const store = createStore(rootReduser, devToolsEnhancer());

export default store;
