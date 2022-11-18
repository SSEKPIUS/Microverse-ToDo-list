const { JSDOM } = require('jsdom');

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

      hasOwnProperty(key) {
        return store.hasOwnProperty(key);
      },
    };
  }()
);
Object.defineProperty(window, 'localStorage', { value: localStorageMock });
const { localStorage } = window;
export { localStorage, window };