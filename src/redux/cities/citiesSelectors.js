import { createSelector } from '@reduxjs/toolkit';

const getCities = state => state.cities.data.items;

const getFilter = state => state.cities.filter;

const getLoading = state => state.cities.data.loading;

const getError = state => state.cities.data.error;

const getFilteredCities = state => {
  const filter = getFilter(state);
  const cities = getCities(state);

  const normalizedFilter = filter.toLowerCase();
  return cities.filter(city =>
    city.name.toLowerCase().includes(normalizedFilter),
  );
};
const getMemoizedFilteredCities = createSelector(
  [getFilter, getCities],
  (filter, cities) => {
    const normalizedFilter = filter.toLowerCase();
    return cities.filter(city =>
      city.name.toLowerCase().includes(normalizedFilter),
    );
  },
);
// const getMemoizedFilteredCities = createSelector(
//     getFilter,
//     getCities,
//     (filter, cities) => {
//         const normalizedFilter = filter.toLowerCase();
//         return cities.filter(city =>
//             city.name.toLowerCase().includes(normalizedFilter),
//         );
//     },
// );

export {
  getCities,
  getFilter,
  getLoading,
  getError,
  getFilteredCities,
  getMemoizedFilteredCities,
};
