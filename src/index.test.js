import addTasks from './addTasks.js';

const { JSDOM } = require('jsdom');

jest.mock('./addTasks.js');
beforeEach(() => jest.resetAllMocks());

describe('unit tests for the To Do list application', () => {
  const dom = new JSDOM('<div class="list-content"><ul id="item-list" class="items"></ul></div>');
  const { window } = dom;

  const localStorageMock = (
    function () {
      let store = {};

      return {
        getItem(key) {
          return store[key];
        },

        setItem(key, value) {
          store[key] = value;
        },

        clear() {
          store = {};
        },

        removeItem(key) {
          delete store[key];
        },

        getAll() {
          return store;
        },
      };
    }()
  );

  Object.defineProperty(window, 'localStorage', { value: localStorageMock });

  const { localStorage } = window;

  const setLocalStorage = (id, data) => {
    window.localStorage.setItem(id, JSON.stringify(data));
  };
  beforeEach(() => {
    window.localStorage.clear();
  });
  jest.mock('./addTasks.js', (data) => {
    const mockJson = {
      index: Object.keys(localStorage.store).length + 1,
      completed: false,
      description: data,
    };
    localStorage.setItem('todo', JSON.stringify(mockJson));
  });

  test('data is added into storage', () => {
    // addTasks('Todo 01');
    // const mockId = '111';
    // const mockJson = { data: 'json data' };
    // setLocalStorage(mockId, mockJson);
    // expect(localStorage.getItem(mockId)).toEqual(JSON.stringify(mockJson));
    console.log(localStorage.getAll());
  });

  test('data in local storage which is overwritten', () => {
    const mockId = '222';
    const mockOldData = { data: 'json data' };
    const mockNewData = { data: ' new data' };

    window.localStorage.setItem(mockId, JSON.stringify(mockOldData));
    expect(localStorage.getItem(mockId)).toEqual(JSON.stringify(mockOldData));

    setLocalStorage(mockId, mockNewData);
    window.localStorage.setItem(mockId, JSON.stringify(mockNewData));
  });

  test('only one ID is in localStorage', () => {
    const mockId = '333';
    const mockOldData = { data: 'json data' };
    const mockNewData = { data: ' new data' };

    window.localStorage.setItem(mockId, JSON.stringify(mockOldData));
    setLocalStorage(mockId, mockNewData);

    const allItems = window.localStorage.getAll();

    expect(Object.keys(allItems).length).toBe(1);
  });
});