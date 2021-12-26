////////////////// ПИШЕМ СЛАЙС МУТИРУЯ СТЕЙТ (immer)

import { createSlice } from '@reduxjs/toolkit';
import { getCities, addCity, editCity, deleteCity } from './citiesOperations';

// const initialState = {
//   items: [],
//   filter: '',
// };
const initialState = {
  data: {
    items: [],
    loading: false,
    error: null,
  },
  filter: '',
};

const citiesSlice = createSlice({
  name: 'cities',
  initialState,
  reducers: {
    // setCities: (state, { payload }) => {
    //   state.items = payload;
    // },

    // addCity: (state, { payload }) => {
    //   state.items.push(payload);
    // },

    // editCity: (state, { payload }) => {
    //   const idx = state.items.findIndex(city => city.id === payload.id);
    //   state.items[idx] = payload;
    // },

    // deleteCity: (state, { payload }) => {
    //   const idx = state.items.findIndex(city => city.id === payload.id);
    //   state.items.splice(idx, 1);
    // },

    changeFilter: (state, { payload }) => {
      state.filter = payload;
    },
  },
  extraReducers: builder => {
    builder
      // ------------------------getCities------------------------------------
      .addCase(getCities.pending, state => {
        state.data.loading = true;
        state.data.error = null;
      })
      .addCase(getCities.fulfilled, (state, { payload }) => {
        state.data.loading = false;
        state.data.items = payload;
      })
      .addCase(getCities.rejected, (state, { payload }) => {
        state.data.loading = false;
        state.data.error = payload;
      })

      // ----------------------addCity--------------------------
      .addCase(addCity.pending, state => {
        state.data.loading = true;
        state.data.error = null;
      })
      .addCase(addCity.fulfilled, (state, { payload }) => {
        state.data.loading = false;
        state.data.items.push(payload);
        // state.data.items= [...state.data.items, payload];
      })
      .addCase(addCity.rejected, (state, { payload }) => {
        state.data.loading = false;
        state.data.error = payload;
      })

      // ----------------------editCity-----------------------------
      .addCase(editCity.pending, state => {
        state.data.loading = true;
        state.data.error = null;
      })
      .addCase(editCity.fulfilled, (state, { payload }) => {
        state.data.loading = false;
        const idx = state.data.items.findIndex(city => city.id === payload.id);
        state.data.items[idx] = payload;
      })
      .addCase(editCity.rejected, (state, { payload }) => {
        state.data.loading = false;
        state.data.error = payload;
      })

      // ----------------------deleteCity--------------------------------
      .addCase(deleteCity.pending, state => {
        state.data.loading = true;
        state.data.error = null;
      })
      .addCase(deleteCity.fulfilled, (state, { payload }) => {
        state.data.loading = false;
        const idx = state.data.items.findIndex(city => city.id === payload.id);
        state.data.items.splice(idx, 1);
      })
      .addCase(deleteCity.rejected, (state, { payload }) => {
        state.data.loading = false;
        state.data.error = payload;
      });
  },
});

export const {
  // setCities,
  // addCity,
  // editCity,
  // deleteCity,
  changeFilter,
} = citiesSlice.actions;

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
