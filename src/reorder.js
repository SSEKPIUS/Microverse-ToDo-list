import readStorage from './readStorage.js';
import saveStorage from './saveStorage.js';

const reorder = (currentIndex, dropedIndex) => {
  if (currentIndex === dropedIndex) return;
  let store = readStorage();
  const tmp = store[dropedIndex - 1];
  store.splice(currentIndex - 1, 0, tmp); // insert at
  if (currentIndex > dropedIndex) { // dropping index unchanged
    store.splice(dropedIndex - 1, 1); // remove at
  } else { // dropping index incresed by 1
    store.splice(dropedIndex, 1); // remove at
  }
  store = store.reduce((accumulator, currentValue, currentIndex) => { // remake indices
    accumulator.push({
      index: currentIndex + 1,
      completed: currentValue.completed,
      description: currentValue.description,
    });
    return accumulator;
  }, []);
  saveStorage(store);
};

export default reorder;