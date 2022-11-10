import readStorage from './readStorage.js';
import saveStorage from './saveStorage.js';

const addTasks = (val) => {
  const store = readStorage();
  store.push({
    index: Object.keys(store).length + 1,
    completed: false,
    description: val,
  });
  saveStorage(store);
};

export default addTasks;