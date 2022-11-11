import readStorage from './readStorage.js';
import saveStorage from './saveStorage.js';

const deleteTask = (val) => {
  const store = readStorage().filter(function (el) {
    return el.index != this.val;
  }, { val }).reduce((accumulator, currentValue, currentIndex) => {
    accumulator.push({
      index: currentIndex + 1,
      completed: currentValue.completed,
      description: currentValue.description,
    });
    return accumulator;
  }, []);
  saveStorage(store);
};

export default deleteTask;