import { createReducer, createAction, combineReducers } from '@reduxjs/toolkit';
import { getCities, addCity, editCity, deleteCity } from './citiesOperations';

const changeFilter = createAction('cities/changeFilter');

const itemsReducer = createReducer([], builder => {
  builder
    .addCase(getCities.fulfilled, (_, { payload }) => payload)
    .addCase(addCity.fulfilled, (state, { payload }) => [...state, payload])
    .addCase(editCity.fulfilled, (state, { payload }) =>
      state.map(city => (city.id === payload.id ? payload : city)),
    )
    .addCase(deleteCity.fulfilled, (state, { payload }) =>
      state.filter(city => city.id !== payload.id),
    );
});

const loadingReducer = createReducer(false, builder => {
  builder
    .addCase(getCities.pending, () => true)
    .addCase(getCities.fulfilled, () => false)
    .addCase(getCities.rejected, () => false)

    .addCase(addCity.pending, () => true)
    .addCase(addCity.fulfilled, () => false)
    .addCase(addCity.rejected, () => false)

    .addCase(editCity.pending, () => true)
    .addCase(editCity.fulfilled, () => false)
    .addCase(editCity.rejected, () => false)

    .addCase(deleteCity.pending, () => true)
    .addCase(deleteCity.fulfilled, () => false)
    .addCase(deleteCity.rejected, () => false);
});

const errorReducer = createReducer(null, builder => {
  builder
    .addCase(getCities.pending, () => null)
    .addCase(getCities.rejected, (_, { payload }) => payload)

    .addCase(addCity.pending, () => null)
    .addCase(addCity.rejected, (_, { payload }) => payload)

    .addCase(editCity.pending, () => null)
    .addCase(editCity.rejected, (_, { payload }) => payload)

    .addCase(deleteCity.pending, () => null)
    .addCase(deleteCity.rejected, (_, { payload }) => payload);
});

const filterReducer = createReducer('', builder => {
  builder.addCase(changeFilter, (_, { payload }) => payload);
});

const dataReducer = combineReducers({
  items: itemsReducer,
  loading: loadingReducer,
  error: errorReducer,
});

const citiesReducer = combineReducers({
  data: dataReducer,
  filter: filterReducer,
});

export { changeFilter };

export default citiesReducer;
