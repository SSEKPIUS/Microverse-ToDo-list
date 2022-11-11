import readStorage from './readStorage.js';
import saveStorage from './saveStorage.js';

const ClearCompletedTasks = () => {
  saveStorage(readStorage().filter((val) => val.completed === false));
};

export default ClearCompletedTasks;