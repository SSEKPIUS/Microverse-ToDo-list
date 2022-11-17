import addTasks from './addTasks.js';
import clearStorage from './clearStorage.js';

describe('unit tests for the To Do list application', () => {
  beforeEach(() => {
    clearStorage();
    jest.resetAllMocks();
  });
  afterEach(() => {
    console.log(localStorage.getAll());
  });

  test('data is added into storage', () => {
    addTasks();
  });
});