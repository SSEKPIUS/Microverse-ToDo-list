import addTasks from './addTasks.js';
import deleteTask from './deleteTask.js';
import readStorage from './readStorage.js';
import updateTask from './updateTask.js';
import clearCompletedTasks from './clearAllCompleted.js';
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

describe('Testing To Do list - part 1', () => {
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
    expect(window.document.body.querySelectorAll('li').length).toBe(3);
  });
});

describe('Testing To Do list - part 2', () => {
  test('editing the task description', ()=>{
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
    updateTask('1', "todoList 27", 'description');
    loadList(window, readStorage);
    expect(window.document.body.querySelector('ul li .label').innerText).toMatch(/^todoList 27$/);
  });  

  test('updating an items "completed" status', ()=>{
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
    updateTask('1', true, 'completed');
    loadList(window, readStorage);
    expect(window.document.body.querySelector('ul li .toggle').checked).toBeTruthy();
  });

  test('the "Clear all completed" function', ()=>{
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
    loadList(window, readStorage);
    expect(window.document.body.querySelectorAll('li').length).toBe(4);
    updateTask('1', true, 'completed');
    updateTask('2', true, 'completed');
    clearCompletedTasks();
    loadList(window, readStorage);
    expect(window.document.body.querySelectorAll('li').length).toBe(2);
  });

});
