import './style.css';

const toDo = [
  {
    index: 1,
    completed: false,
    description: 'Voluptua sea sit laboresed magna sed eos..',
  },
  {
    index: 2,
    completed: false,
    description: 'Sit labore dolor dolor  dolore gubergren. Clita.',
  },
  {
    index: 3,
    completed: false,
    description: 'Voluptua sea sit  et sed magna sed eos..',
  },
  {
    index: 4,
    completed: false,
    description: 'Voluptua sea sit , et sed magna sed eos..',
  },
];

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
  return span;
}

function createView(el) {
  const label = document.createElement('label');
  label.classList.add('label');
  label.tabIndex = '0';
  label.innerText = el.description;

  const textarea = document.createElement('textarea');
  textarea.classList.add('edit', 'chromeless-input');
  textarea.maxLength = '255';
  textarea.innerText = el.description;

  const div = document.createElement('div');
  div.classList.add('view');
  div.appendChild(label);
  div.appendChild(textarea);
  return div;
}

function createInputCheckbox() {
  const input = document.createElement('input');
  input.classList.add('toggle');
  input.type = 'checkbox';
  input.tabIndex = '0';
  return input;
}

function addChildrenToArticle(el, article) {
  article.appendChild(createInputCheckbox());
  article.appendChild(createView(el));
  article.appendChild(createDestroy());
  article.appendChild(createMove());
  return article;
}

function createListItem(el) {
  const li = document.createElement('li');
  li.classList.add('todo');
  let article = document.createElement('article');
  article = addChildrenToArticle(el, article);
  li.appendChild(article);
  return li;
}

function components() {
  const ul = document.getElementById('item-list');
  toDo.forEach((el) => {
    ul.appendChild(createListItem(el));
  });
}

window.addEventListener('DOMContentLoaded', () => {
  components();
});
