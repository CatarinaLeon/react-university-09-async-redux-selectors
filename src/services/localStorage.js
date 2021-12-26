// ф-ция сохранения в локал стор
const save = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    return null;
  }
};

// ф-ция получения в локал стор (считывает данные и парсит их)
const get = key => {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch (error) {
    return null;
  }
};
// ф-ция удаления с локал стор
const remove = key => {
  try {
    return localStorage.removeItem(key);
  } catch (error) {
    return null;
  }
};

export { get, save, remove };
