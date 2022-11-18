import addTasks from './addTasks.js';
import deleteTask from './deleteTask.js';
import readStorage from './readStorage.js';
import saveStorage from './saveStorage.js';
import { loadList } from './__mocks__/index.js';
const { localStorage, window } = require('./dom.js');
const $ = require( "jquery" )( window );

jest.mock('./readStorage.js', () => jest.fn());
jest.mock('./saveStorage.js', () => jest.fn());

beforeEach(() => {
  jest.resetAllMocks();
  localStorage.clear();
});


describe('unit tests for the To Do list application', () => {
  test('test if add functions add  exactly one <li> element to the list in the DOM.', () => {    
    readStorage.mockImplementation(()=>{
      return localStorage.hasOwnProperty('todo') ? JSON.parse(localStorage.getItem('todo')) : [];
    });   
    saveStorage.mockImplementation(arr=>{
      return localStorage.setItem('todo', JSON.stringify(arr));
    });
    addTasks("todoList 01");
    loadList(window, readStorage);
    expect(window.document.body.querySelectorAll('li').length).toBe(1);
  });

  test('test if delete functions removes  exactly one <li> element from the list in the DOM.', () => {   
    readStorage.mockImplementation(()=>{
      return localStorage.hasOwnProperty('todo') ? JSON.parse(localStorage.getItem('todo')) : [];
    });   
    saveStorage.mockImplementation(arr=>{
      return localStorage.setItem('todo', JSON.stringify(arr));
    });
    addTasks("todoList 01");
    addTasks("todoList 02");
    addTasks("todoList 03");
    addTasks("todoList 04");
    deleteTask('1');
    loadList(window, readStorage);
    // $('li')[0].querySelector('.destroy').click();
    //$("ul li:first-child article .destroy svg").click();
    // loadList(window, readStorage);
    expect(window.document.body.querySelectorAll('li').length).toBe(3);
  });
});