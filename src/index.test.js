import { before } from 'lodash';
import addTasks from './addTasks.js';
import clearStorage from './clearStorage.js';
import readStorage from './readStorage.js';
import saveStorage from './saveStorage.js';
import { loadList } from './__mocks__/index.js';
const { localStorage, window } = require('./dom.js');

jest.mock('./clearStorage.js', () => jest.fn());
jest.mock('./readStorage.js', () => jest.fn());
jest.mock('./saveStorage.js', () => jest.fn());

describe('unit tests for the To Do list application', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    clearStorage();
  });

  test('test if add functions add  exactly one <li> element to the list in the DOM.', () => {
    clearStorage.mockImplementation(()=>{
      return localStorage.clear();
    });    
    readStorage.mockImplementation(()=>{
      let haskey = localStorage.hasOwnProperty('todo');
      return localStorage.hasOwnProperty('todo') ? JSON.parse(localStorage.getItem('todo')) : [];
    });   
    saveStorage.mockImplementation(arr=>{
      return localStorage.setItem('todo', JSON.stringify(arr));
    });
    addTasks("xxxxxx");
    loadList(window, readStorage);

    
    //addTasks("yyyyyy");

    // const mockJson = {
    //   index: Object.keys(localStorage.getAll()).length + 1,
    //   completed: false,
    //   description: "TodoList one",
    // };
    // localStorage.setItem('todo', JSON.stringify(mockJson));
    // localStorage.setItem('todo', JSON.stringify(mockJson));

    



    console.log('getAll Store:',localStorage.getAll());
    // addTasks();
    //expect(clearStorage(10)).toBe(10);
  });
});