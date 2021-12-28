import { combineReducers } from 'redux';
import { types } from './departmentsTypes';

const itemsReducer = (state = [], { type, payload }) => {
  switch (type) {
    case types.GET_FULFILLED:
      return payload;
    case types.ADD_FULFILLED:
      return [...state, payload];
    case types.EDIT_FULFILLED:
      return state.map(item => (item.id === payload ? payload : item));
    case types.DELETE_FULFILLED:
      return state.filter(item => item.id !== payload);
    default:
      return state;
  }
};

const loadingReducer = (state = false, { type }) => {
  switch (type) {
    case types.GET_PENDING:
      return true;
    case types.GET_FULFILLED:
      return false;
    case types.GET_REJECTED:
      return false;

    case types.ADD_PENDING:
      return true;
    case types.ADD_FULFILLED:
      return false;
    case types.ADD_REJECTED:
      return false;

    case types.EDIT_PENDING:
      return true;
    case types.EDIT_FULFILLED:
      return false;
    case types.EDIT_REJECTED:
      return false;

    case types.DELETE_PENDING:
      return true;
    case types.DELETE_FULFILLED:
      return false;
    case types.DELETE_REJECTED:
      return false;
    default:
      return state;
  }
};

const errorReducer = (state = null, { type, payload }) => {
  switch (type) {
    case types.GET_PENDING:
      return null;
    case types.GET_REJECTED:
      return payload;

    case types.ADD_PENDING:
      return null;
    case types.ADD_REJECTED:
      return payload;

    case types.EDIT_PENDING:
      return null;
    case types.EDIT_REJECTED:
      return payload;

    case types.DELETE_PENDING:
      return null;
    case types.DELETE_REJECTED:
      return payload;
    default:
      return state;
  }
};

const departmentsReducer = combineReducers({
  items: itemsReducer,
  loading: loadingReducer,
  error: errorReducer,
});
export default departmentsReducer;
