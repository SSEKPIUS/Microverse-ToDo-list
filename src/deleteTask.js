import readStorage from './readStorage.js';
import saveStorage from './saveStorage.js';

const deleteTask = (val) => saveStorage(readStorage()
  .filter(function (el) {
    return el.index.toString() !== this.val;
  }, { val })
  .reduce((accumulator, currentValue, currentIndex) => {
    accumulator.push({
      index: currentIndex + 1,
      completed: currentValue.completed,
      description: currentValue.description,
    });
    return accumulator;
  }, []));

export default deleteTask;