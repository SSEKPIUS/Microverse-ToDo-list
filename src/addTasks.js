import readStorage from './readStorage.js';
import saveStorage from './saveStorage.js';

const { localStorage, window } = require('./dom.js');

const addTasks = (val) => {
  const store = readStorage();
  return saveStorage(store.push({
    index: Object.keys(store).length + 1,
    completed: false,
    description: val,
  }));
};

export default addTasks;