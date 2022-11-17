import readStorage from './readStorage.js';
import saveStorage from './saveStorage.js';

const clearCompletedTasks = () => {
  saveStorage(readStorage().filter((val) => val.completed === false));
};

export default clearCompletedTasks;