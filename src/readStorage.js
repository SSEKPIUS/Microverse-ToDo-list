const readStorage = () => {
  if (localStorage.hasOwnProperty('todo')) {
    return JSON.parse(localStorage.getItem('todo'));
  }
  return [];
};

export default readStorage;