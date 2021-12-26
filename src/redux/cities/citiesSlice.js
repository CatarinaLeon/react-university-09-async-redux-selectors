////////////////// ПИШЕМ СЛАЙС МУТИРУЯ СТЕЙТ (immer)

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  filter: '',
};

const citiesSlice = createSlice({
  name: 'cities',
  initialState,
  reducers: {
    setCities: (state, { payload }) => {
      state.items = payload;
    },

    addCity: (state, { payload }) => {
      state.items.push(payload);
    },

    // addCity:  {
    //   reducer: (state, action) => {
    //     state.push(action.payload)
    //   },
    //   prepare: (text) => {
    //     const id = nanoid()
    //     return { payload: { id, text } }
    //   },
    // },

    editCity: (state, { payload }) => {
      const idx = state.items.findIndex(city => city.id === payload.id);
      state.items[idx] = payload;
    },

    deleteCity: (state, { payload }) => {
      const idx = state.items.findIndex(city => city.id === payload.id);
      state.items.splice(idx, 1);
    },

    changeFilter: (state, { payload }) => {
      state.filter = payload;
    },
  },
});

export const { setCities, addCity, editCity, deleteCity, changeFilter } =
  citiesSlice.actions;

export default citiesSlice.reducer;

////////////////// ПИШЕМ СЛАЙС НЕ МУТИРУЯ СТЕЙТ

// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   items: [],
//   filter: '',
// };

// const citiesSlice = createSlice({
//   name: 'cities',
//   initialState,
//   reducers: {
//     setCities: (state, { payload }) => ({ ...state, items: payload }),

//     addCity: (state, { payload }) => ({
//       ...state,
//       items: [...state.items, payload],
//     }),

//     editCity: (state, { payload }) => ({
//       ...state,
//       items: state.items.map(city => (city.id === payload.id ? payload : city)),
//     }),

//     deleteCity: (state, { payload }) => ({
//       ...state,
//       items: state.items.filter(city => city.id !== payload),
//     }),

//     changeFilter: (state, { payload }) => ({ ...state, filter: payload }),
//   },
// });

// export const { setCities, addCity, editCity, deleteCity, changeFilter } =
//   citiesSlice.actions;

// export default citiesSlice.reducer;

/////////////// SEPARATE SLICES FOR EACH PIECE OF STATE

// import { createSlice, combineReducers } from '@reduxjs/toolkit';

// const itemsSlice = createSlice({
//   name: 'items',
//   initialState: [],
//   reducers: {
//     setCities: (_, { payload }) => payload,

//     addCity: (state, { payload }) => [...state, payload],

//     editCity: (state, { payload }) =>
//       state.map(city => (city.id === payload.id ? payload : city)),

//     deleteCity: (state, { payload }) =>
//       state.filter(city => city.id !== payload),
//   },
// });

// const filterSlice = createSlice({
//   name: 'filter',
//   initialState: '',
//   reducers: {
//     changeFilter: (_, { payload }) => payload,
//   },
// });

// export const { setCities, addCity, editCity, deleteCity } = itemsSlice.actions;
// export const { changeFilter } = filterSlice.actions;

// const citiesReducer = combineReducers({
//   [itemsSlice.name]: itemsSlice.reducer,
//   [filterSlice.name]: filterSlice.reducer,
// });

// export default citiesReducer;
