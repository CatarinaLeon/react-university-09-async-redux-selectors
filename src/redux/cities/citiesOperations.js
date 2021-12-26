import { createAsyncThunk } from '@reduxjs/toolkit';
import * as api from 'services/api';

const API_ENDPOINT = 'cities';

const getCities = createAsyncThunk('cities/getCitiesStatus', () =>
  api.getData(API_ENDPOINT),
);

const addCity = createAsyncThunk('cities/addCityStatus', newCity =>
  api.saveItem(API_ENDPOINT, newCity),
);

const editCity = createAsyncThunk('cities/editCityStatus', updatedCity =>
  api.editItem(API_ENDPOINT, updatedCity),
);

const deleteCity = createAsyncThunk('cities/deleteCityStatus', id =>
  api.deleteItem(API_ENDPOINT, id),
);

export { getCities, addCity, editCity, deleteCity };
