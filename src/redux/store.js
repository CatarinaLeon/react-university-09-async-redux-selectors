import { configureStore } from '@reduxjs/toolkit';
// import { createLogger } from 'redux-logger';
import { customMiddlewareLogger } from './middlewear/logger';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
// import citiesReducer from './cities/citiesSlice';
import citiesReducer from './cities/citiesReducer';
import tutorsReducer from './tutors/tutorsReducer';
// import { customMiddlewareLogger } from './middlewear/logger';

// {
//   tutors: [],
//   cities: {
//     items: [],
//     filter: '',
//   },
//   departments: [],
// }

const persistCitiesConfig = {
  key: 'filter',
  storage,
  whitelist: ['filter'],
};

// const logger = createLogger({
//   collapsed: (getState, action, logEntry) => !logEntry.error,
//   timestamp: false,
// });

const store = configureStore({
  reducer: {
    tutors: tutorsReducer,
    cities: persistReducer(persistCitiesConfig, citiesReducer),
    departments: () => [],
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      // .concat(myMiddleware),
      // .concat(logger),
      .concat(customMiddlewareLogger),
  devTools: process.env.NODE_ENV !== 'production',
});

const persistor = persistStore(store);

export { store, persistor };
