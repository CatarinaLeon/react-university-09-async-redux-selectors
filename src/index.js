import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import App from './components/App/App.jsx';
import { store, persistor } from 'redux/store.js';
import './i18n';

import './styles/index.css';
import './styles/global.module.css';
import './styles/variables.module.css';
import './styles/listStyles';

// МЕМОИЗАЦИЯ

// const memoize = fn => {
//   const cache = {};

//   return (...args) => {
//     console.log('----------------------');
//     console.log('~ args', args);

//     const stringifiedArgs = JSON.stringify(args);
//     console.log('~ stringifiedArgs', stringifiedArgs);
//     console.log(`cache`, cache);

//     if (cache[stringifiedArgs]) {
//       return cache[stringifiedArgs];
//     }

//     cache[stringifiedArgs] = fn(...args);

//     return cache[stringifiedArgs];
//   };
// };

// const multiply = (a, b, c) => {
//   console.log('multiply');
//   return a * b * c;
// };

// const add = (a, b, c) => {
//   console.log('add');
//   return a + b + c;
// };

// const memoizedMultiply = memoize(multiply);
// const memoizedAdd = memoize(add);

// console.log(memoizedMultiply(1, 2, 3)); // 'multiply'
// console.log(memoizedMultiply(2, 3, 4)); // 'multiply'

// console.log(memoizedAdd(1, 2, 3)); // 'add'
// console.log(memoizedAdd(2, 3, 4)); // 'add'

// console.log(memoizedMultiply(1, 2, 3));
// console.log(memoizedMultiply(2, 3, 4));

// console.log(memoizedAdd(1, 2, 3));
// console.log(memoizedAdd(2, 3, 4));

// console.log(multiply(1, 2, 3));
// console.log(multiply(2, 3, 4));

// console.log(multiply(1, 2, 3));
// console.log(multiply(2, 3, 4));

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);
