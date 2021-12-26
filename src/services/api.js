const BASE_URL = 'https://6137592feac1410017c182b7.mockapi.io';
// const BASE_URL = 'https://61bb5963e943920017784e35.mockapi.io';

// Отправляет запрос с определенными опциями для получ данных
// Получить данные
const fetchData = async (path, options = {}) => {
  const res = await fetch(`${BASE_URL}/${path}`, options);
  return res.ok ? res.json() : Promise.reject(new Error(res.statusText));
};

const getData = (endpoint, options) => fetchData(endpoint, options);

// сохранить элемент
const saveItem = (endpoint, item, options) => {
  const finalOptions = {
    method: 'POST',
    // body: item,
    body: JSON.stringify(item),
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },

    ...options,
  };
  return fetchData(endpoint, finalOptions);
};

// редактировать элемент
const editItem = (endpoint, item, options) => {
  const finalOptions = {
    method: 'PUT',
    body: JSON.stringify(item),
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
    ...options,
  };
  return fetchData(`${endpoint}/${item.id}`, finalOptions);
};

// удалить элементы
const deleteItem = (endpoint, id, options) =>
  fetchData(`${endpoint}/${id}`, { method: 'DELETE', ...options });

export { getData, saveItem, editItem, deleteItem };
