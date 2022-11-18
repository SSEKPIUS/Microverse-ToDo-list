const readStorage = () => (localStorage.hasOwnProperty('todo') ? JSON.parse(localStorage.getItem('todo')) : []);

export default readStorage;