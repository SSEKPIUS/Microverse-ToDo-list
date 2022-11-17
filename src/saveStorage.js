const saveStorage = (arr) => localStorage.setItem('todo', JSON.stringify(arr));

export default saveStorage;
