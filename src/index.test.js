import { before } from 'lodash';
import addTasks from './addTasks.js';
import clearStorage from './clearStorage.js';
const { localStorage, window } = require('./dom.js');

jest.mock('./clearStorage.js', () => jest.fn());

describe('unit tests for the To Do list application', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    clearStorage();
  });

  test('data is added into storage', () => {
    clearStorage.mockImplementation(()=>{
      localStorage.clear();
    });
    const mockJson = {
      index: Object.keys(localStorage.getAll()).length + 1,
      completed: false,
      description: "TodoList one",
    };
    localStorage.setItem('todo', JSON.stringify(mockJson));
    console.log(localStorage.getAll());
    // addTasks();
    //expect(clearStorage(10)).toBe(10);
  });
});