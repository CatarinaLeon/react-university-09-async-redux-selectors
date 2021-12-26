import TYPES from './citiesTypes';

const setCities = cities => ({
  type: TYPES.SET,
  payload: cities,
});

const addCity = city => ({
  type: TYPES.ADD,
  payload: city,
});

const editCity = city => ({
  type: TYPES.EDIT,
  payload: city,
});

const deleteCity = id => ({
  type: TYPES.REMOVE,
  payload: id,
});

const changeFilter = value => ({
  type: TYPES.FILTER,
  payload: value,
});

export { setCities, addCity, editCity, deleteCity, changeFilter };
