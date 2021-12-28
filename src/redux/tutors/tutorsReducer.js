import { createReducer, combineReducers } from '@reduxjs/toolkit';
// import { addTutor } from './tutorsActions';
import {
  getTutorsRequest,
  getTutorsSuccess,
  getTutorsError,
  addTutorRequest,
  addTutorSuccess,
  addTutorError,
} from './tutorsActions';

const itemsReducer = createReducer([], builder => {
  builder
    .addCase(getTutorsSuccess, (_, action) => action.payload)
    .addCase(addTutorSuccess, (state, action) => [...state, action.payload]);
});

const firstLoadingReducer = createReducer(false, builder => {
  builder
    .addCase(getTutorsRequest, () => true)
    .addCase(getTutorsSuccess, () => false)
    .addCase(getTutorsError, () => false);
});

const loadingReducer = createReducer(false, builder => {
  builder
    .addCase(addTutorRequest, () => true)
    .addCase(addTutorSuccess, () => false)
    .addCase(addTutorError, () => false);
});

const errorReducer = createReducer(null, builder => {
  builder
    .addCase(getTutorsRequest, () => null)
    .addCase(getTutorsError, (_, { payload }) => payload)

    .addCase(addTutorRequest, () => null)
    .addCase(addTutorError, (_, { payload }) => payload);
});

const tutorsReducer = combineReducers({
  items: itemsReducer,
  loading: loadingReducer,
  firstLoading: firstLoadingReducer,
  error: errorReducer,
});

export default tutorsReducer;
