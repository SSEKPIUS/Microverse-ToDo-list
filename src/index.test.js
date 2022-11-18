import { before } from 'lodash';
import addTasks from './addTasks.js';
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
  console.log('#########################################');
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
    //addTasks("todoList 03");
    loadList(window, readStorage);

    console.log(localStorage.getAll());
    console.log('JQuery', $('li'));
    // expect(window.document.body.querySelectorAll('li').length).toBe(1);
  });
});