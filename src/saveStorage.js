const saveStorage = (arr) => {
  const jsonStr = JSON.stringify(arr);
  localStorage.setItem('todo', jsonStr);
  return true;
};

export default saveStorage;
