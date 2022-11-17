import './style.css';
import addTODO from './addTasks.js';
import readStorage from './readStorage.js';
import deleteTask from './deleteTask.js';
import updateTask from './updateTask.js';
import ClearComplete from './clearAllCompleted.js';
import reorder from './reorder.js';

let toDo = [];

function createMove() {
  const span = document.createElement('span');
  span.classList.add('move');
  span.innerHTML = `
  <svg width="24px" height="24px" viewBox="0 0 24 24" id="three-dots" xmlns="http://www.w3.org/2000/svg">
    <g id="_20x20_three-dots--grey" data-name="20x20/three-dots--grey" transform="translate(24) rotate(90)">
      <rect id="Rectangle" width="24" height="24" fill="none"/>
      <circle id="Oval" cx="1" cy="1" r="1" transform="translate(5 11)" stroke="#000" stroke-miterlimit="10" stroke-width="0.5"/>
      <circle id="Oval-2" data-name="Oval" cx="1" cy="1" r="1" transform="translate(11 11)" stroke="#000" stroke-miterlimit="10" stroke-width="0.5"/>
      <circle id="Oval-3" data-name="Oval" cx="1" cy="1" r="1" transform="translate(17 11)" stroke="#000" stroke-miterlimit="10" stroke-width="0.5"/>
    </g>
  </svg>`;
  span.addEventListener('mouseenter', (e) => {
    const parentTag = e.target.closest('li');
    parentTag.setAttribute('draggable', 'true');
    parentTag.focus();
  });
  span.addEventListener('mouseleave', (e) => {
    const parentTag = e.target.closest('li');
    parentTag.setAttribute('draggable', 'false');
  });
  return span;
}

function createDestroy() {
  const span = document.createElement('span');
  span.classList.add('destroy');
  span.innerHTML = `
  <svg class="destroy" version="1.1" baseProfile="tiny" id="Layer_1" xmlns:x="&ns_extend;" xmlns:i="&ns_ai;" xmlns:graph="&ns_graphs;"
    xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:a="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/"
        x="0px" y="0px" width="42px" height="42px" viewBox="-0.5 0.5 42 42" xml:space="preserve">
    <path d="M12.5,16.5v17h3v-17H12.5z M18.5,16.5v17h3v-17H18.5z M24.5,16.5v17h3v-17H24.5z M27.5,4.5c0-2.5-0.609-3-3-3h-10
        c-2.52,0-2.98,0.55-2.98,3.01L11.5,7.5h-8c-1.48,0-2,0.49-2,2v1c0,1.55,0.52,2,2,2h1v26c0,2.49,0.55,3,3,3h24c2.5,0,4-0.471,4-3v-26
        h1c1.51,0,2-0.48,2-2v-1c0-1.48-0.43-2-2-2h-9V4.5z M24.5,4.5v3h-10v-3H24.5z M9.5,12.5h21v24h-21V12.5z"/>
  </svg>`;
  span.querySelector('svg').addEventListener('click', (e) => {
    e.stopImmediatePropagation();
    deleteTask(e.target.parentNode.parentNode.parentNode.querySelector('.index').innerText);
    loadList();
  });
  return span;
}

function createView(el) {
  const index = document.createElement('span');
  index.classList.add('index');
  index.innerText = el.index;

  const label = document.createElement('label');
  label.classList.add('label');
  label.tabIndex = '0';
  label.innerText = el.description;
  label.addEventListener('click', (e) => {
    document.querySelectorAll('.todo').forEach((el) => {
      el.classList.remove('editing');
    });
    e.target.parentNode.parentNode.parentNode.classList.add('editing');
  });

  const textarea = document.createElement('textarea');
  textarea.classList.add('edit', 'chromeless-input');
  textarea.maxLength = '255';
  textarea.innerText = el.description;
  textarea.addEventListener('keypress', (e) => {
    if (e.code === 'Enter' && e.target.value) {
      const parent = e.target.parentNode.parentNode.parentNode;
      e.stopImmediatePropagation();
      updateTask(parent.querySelector('.index').innerText, e.target.value, 'description');
      parent.querySelector('.label').innerText = e.target.value;
      parent.classList.remove('editing');
      e.preventDefault();
    }
  });

  const div = document.createElement('div');
  div.classList.add('view');
  div.appendChild(index);
  div.appendChild(label);
  div.appendChild(textarea);
  return div;
}

function createInputCheckbox(el) {
  const input = document.createElement('input');
  input.classList.add('toggle');
  input.type = 'checkbox';
  input.tabIndex = '0';
  input.checked = el.completed;
  input.addEventListener('change', (e) => {
    const parent = e.target.parentNode.parentNode;
    parent.classList.remove('editing');
    if (e.target.checked) {
      parent.classList.add('completed');
    } else {
      parent.classList.remove('completed');
    }
    updateTask(parent.querySelector('.index').innerText, e.target.checked, 'completed');
  });
  return input;
}

function addChildrenToArticle(el, article) {
  article.appendChild(createInputCheckbox(el));
  article.appendChild(createView(el));
  article.appendChild(createDestroy());
  article.appendChild(createMove());
  return article;
}

function createListItem(el) {
  const div = document.createElement('div');
  div.classList.add('shadow');
  const li = document.createElement('li');
  li.classList.add('todo', el.completed ? 'completed' : null);
  let article = document.createElement('article');
  article = addChildrenToArticle(el, article);
  li.appendChild(div);
  li.appendChild(article);
  li.setAttribute('draggable', 'false');
  li.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('index', e.target.querySelector('.index').innerText);
  });
  li.addEventListener('dragover', (e) => {
    e.preventDefault();
    e.target.closest('ul').querySelectorAll('.shadow').forEach((el) => {
      el.style.display = 'none';
    });
    e.target.closest('li').querySelector('.shadow').style.display = 'block';
  });
  li.addEventListener('drop', (e) => {
    e.preventDefault();
    const dropedIndex = e.dataTransfer.getData('index');
    const currentIndex = e.target.closest('li').querySelector('.index').innerText;
    reorder(currentIndex, dropedIndex);
    e.target.closest('ul').querySelectorAll('.shadow').forEach((el) => {
      el.style.display = 'none';
    });
    loadList();
  });
  return li;
}

function loadList() {
  toDo = readStorage();
  const ul = document.getElementById('item-list');
  ul.innerHTML = '';
  document.querySelector('.refresh').setAttribute('data-after', toDo.length);
  toDo.forEach((el) => {
    ul.appendChild(createListItem(el));
  });
}

function components() {
  loadList();
  document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
    const node = e.target.querySelector('#new-item');
    if (node.value) {
      addTODO(node.value);
      node.value = '';
      loadList();
    }
  });
  document.getElementById('new-item').addEventListener('keypress', (e) => {
    if (e.code === 'Enter' && e.target.value) {
      addTODO(e.target.value);
      e.target.value = '';
      loadList();
    }
  });
  document.querySelector('.refresh').addEventListener('click', () => {
    loadList();
  });
  document.querySelector('.link-button.clear-completed').addEventListener('click', () => {
    ClearComplete();
    loadList();
  });
}
window.addEventListener('DOMContentLoaded', () => {
  window.addEventListener('storage', () => {
    loadList();
  });
  components();
});
