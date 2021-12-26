import { combineReducers } from 'redux';
import TYPES from './citiesTypes';

// {
//   cities: {
//     items: [],
//     filter: '',
//   },
// }

// action = { type: 'action/type', payload: 'data'}

const itemsReducer = (state = [], action) => {
  switch (action.type) {
    case TYPES.SET:
      return action.payload;
    case TYPES.ADD:
      return [...state, action.payload];
    case TYPES.EDIT:
      return state.map(city =>
        city.id === action.payload.id ? action.payload : city,
      );
    case TYPES.REMOVE:
      return state.filter(city => city.id !== action.payload);
    default:
      return state;
  }
};

const filterReduser = (state = '', action) => {
  switch (action.type) {
    case TYPES.FILTER:
      return action.payload;

    default:
      return state;
  }
};

const citiesReduser = combineReducers({
  items: itemsReducer,
  filter: filterReduser,
});

export default citiesReduser;
