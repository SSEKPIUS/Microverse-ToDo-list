const clearStorage = () => localStorage.setItem('todo', JSON.stringify([]));

export default clearStorage;