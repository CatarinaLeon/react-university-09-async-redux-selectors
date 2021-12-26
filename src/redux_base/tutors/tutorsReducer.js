import TYPES from './tutorsTypes';

const tutorsReducer = (state = [], action) => {
  switch (action.type) {
    // case 'tutors/set':
    case TYPES.SET:
      return action.payload;
    case TYPES.ADD:
      return [...state, action.payload];

    default:
      return state;
  }
};
export default tutorsReducer;
