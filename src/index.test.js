import addTasks from './addTasks.js';

const { localStorage, window } = require('./dom.js');

describe('unit tests for the To Do list application', () => {
  beforeEach(() => {
    localStorage.clear();
  });
  afterEach(() => {
    console.log(localStorage.getAll());
  });

  test('data is added into storage', () => {
    addTasks();
  });
});