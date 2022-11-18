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
    addTasks("todoList 01");
    loadList(window, readStorage);
    expect(window.document.body.querySelectorAll('li').length).toBe(1);
  });
});