import readStorage from './readStorage.js';
import saveStorage from './saveStorage.js';

const updateTask = (position, val) => {
  const store = readStorage();
  store.forEach((element, index, array) => {
    if (element.index.toString === position) array[index].description = val;
  });
  saveStorage(store);
};

export default updateTask;