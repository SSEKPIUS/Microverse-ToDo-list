import readStorage from './readStorage.js';
import saveStorage from './saveStorage.js';

const updateTask = (position, val, section) => {
  const store = readStorage();
  store.forEach((element, index, array) => {
    if (element.index.toString() === position) {
      switch (section) {
        case 'description':
          array[index].description = val;
          break;
        case 'completed':
          array[index].completed = val;
          break;
        default:
      }
    }
  });
  saveStorage(store);
};

export default updateTask;