let getContacts = [
  {
    name: 'Max Mustermann'
  },
  {
    name: 'Peter Lustig'
  }
];

let categorys = [
  {
    name: 'Sales',
    color: '#FC71FF'
  },
  {
    name: 'Backoffice',
    color: '#38EAFF'
  },
  {
    name: 'Design',
    color: '#FFC701'
  }
];

let assigned = [];
let newSubtasks = [];
let subtasks = [];
let currentCategory;
let currentPrio;

function init() {
  renderContacts();
  renderCategorys();
  renderSubtasks();
}

let tasks = [
  {
    titel: '',
    description: '',
    status: '',
    category: '',
    categoryColor: '',
    assigned: [],
    date: '',
    prio: '',
    subtasks: []
  }
];


document.addEventListener('coloris:pick', event => {
  document.querySelector('.colorpicker').style.backgroundColor = event.detail.color;
});

document.addEventListener('coloris:change', event => {
  document.querySelector('.colorpicker').style.backgroundColor = event.detail.color;
});


function addTask() {
  getSubtasks();
  let titel = document.getElementById('title-input').value;
  let description = document.getElementById('description-input').value;
  let date = document.getElementById('task-date').value;
  let prio = currentPrio;
  let color = document.querySelector('.colorpicker').value;

  if (prio == undefined) {
    prio = 'low';
  }
  let assignedTo = assigned;
  let category = currentCategory;
  let selectedSubtasks = newSubtasks;

  console.log('Titel: ', titel);
  console.log('Description: ', description);
  console.log('Date: ', date);
  console.log('Prio: ', prio);
  console.log('Assigned: ', assignedTo);
  console.log('Category: ', category);
  console.log('Subtasks', selectedSubtasks);
  console.log('Color ', color);
}


function getTaskPrio(button, priority) {
  const buttons = document.querySelectorAll('.prioBtn');
  let images = {
    low: document.getElementById('lowImg'),
    medium: document.getElementById('mediumImg'),
    urgent: document.getElementById('urgentImg')
  };

  buttons.forEach(function (btn) {
    if (btn.classList.contains(priority + '-active')) {
      btn.classList.remove(priority + '-active');
      currentPrio;
    } else if (btn !== button) {
      btn.classList.remove('low-active', 'medium-active', 'urgent-active');
      lowImg.src = './img/prio_low_color.png';
      mediumImg.src = './img/prio_medium_color.png';
      urgentImg.src = './img/prio_urgent_color.png';
    }
  });
  button.classList.add(priority + '-active');
  images[priority].src = `./img/prio_${priority}.png`;
  currentPrio = priority;
}


function changeToInput(containerId, buttonId) {
  let cId = document.getElementById(containerId);
  let bId = document.getElementById(buttonId);
  cId.innerHTML = '';
  bId.innerHTML = '';

  if (cId.id.includes('category-input')) {
    cId.innerHTML += `
    <div>
      <input id="generatedInput" placeholder="Enter new category" class="ol-none b-none">
    </div>
    `;
    bId.innerHTML += `
  <div class="generated-Btn-Container">
  <input required class="coloris instance2 colorpicker" type="text" data-coloris>
  <button onclick="clearInput(this)" type="button"><img  src="./img/cancel_icon.png"></button>
  <svg xmlns="http://www.w3.org/2000/svg" width="2" height="31" viewBox="0 0 2 31" fill="none">
  <path d="M1 0V31" stroke="#D1D1D1"/>
  </svg>
  <button onclick="addNewCategory()" type="button"><img src="./img/check_black_icon.png"></button>
  </div>`;
    document.querySelector('.colorpicker').click();


  } else if (cId.id.includes('assigned-input')) {
    bId.innerHTML += `
    <div class="generated-Btn-Container">
    <button onclick="clearInput(this)" type="button"><img src="./img/cancel_icon.png"></button>
    <svg xmlns="http://www.w3.org/2000/svg" width="2" height="31" viewBox="0 0 2 31" fill="none">
    <path d="M1 0V31" stroke="#D1D1D1"/>
    </svg>
    <button type="button"><img src="./img/check_black_icon.png"></button>
    </div>`;
    cId.innerHTML += `
    <div>
      <input id="generatedInput" placeholder="Enter new contact" class="ol-none b-none">
    </div>
    `;
  } else {
    bId.innerHTML += `
    <div class="generated-Btn-Container">
    <button onclick="clearInput(this)" type="button"><img src="./img/cancel_icon.png"></button>
    <svg xmlns="http://www.w3.org/2000/svg" width="2" height="31" viewBox="0 0 2 31" fill="none">
    <path d="M1 0V31" stroke="#D1D1D1"/>
    </svg>
    <button onclick="addSubtask()" type="button"><img src="./img/check_black_icon.png"></button>
    </div>`;
    cId.innerHTML += `
    <div>
      <input id="generatedSubtaskInput" placeholder="Enter a new subtask" class="ol-none b-none">
    </div>
    `;
  }
}


function addNewCategory() {
  let input = document.getElementById('generatedInput').value;
  let color = document.querySelector('.colorpicker').value;
  if (input == '' || color == undefined) {
    // Do nothing
  } else {
    categorys.push({
      name: input,
      color: color
    })
  }
  renderCategorys();
}


function renderContacts() {
  let contacts = document.getElementById('renderContacts');
  contacts.innerHTML = '';


  for (let i = 0; i < getContacts.length; i++) {
    const contact = getContacts[i];
    contacts.innerHTML += `
    <div>
      <li class="contact-item">${contact['name']} <a onclick="changeCheckbox(${i})"><img class="checkboxImg cursor-p" id="checkboxImg${i}" src="./img/checkbox.png"></a></li>
    </div>
    `;
  }
}

function changeCheckbox(i) {
  let checkboxImg = document.getElementById(`checkboxImg${i}`);

  if (checkboxImg.getAttribute('src') === './img/checkbox.png') {
    checkboxImg.src = './img/checkbox_checked.png'
  } else {
    checkboxImg.src = './img/checkbox.png'
  }
}



function getAssignedContacts() {
  let test = document.querySelectorAll('.checkboxImg');
  for (let i = 0; i < test.length; i++) {
    const t = test[i];
    const source = t['currentSrc'];
    if (source.includes('/img/checkbox_checked.png')) {
      let index = i;
      assigned.push(getContacts[index]['name']);
    }
  }
}

function renderCategorys() {
  let category = document.getElementById('renderCategorys');
  category.innerHTML = '';
  category.innerHTML = `
  <div onclick="changeToInput('category-input', 'category-button')" class="category-generated-list font20">
  <li class="font20 category-li-item" >Add new category</li>
  </div>
  `;

  for (let i = 0; i < categorys.length; i++) {
    const cat = categorys[i];
    category.innerHTML += `<div class="category-dropdown-items" onclick="useCategory(${i})">
    <li class="font20 category-li-item"">${cat['name']} <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
    <circle cx="10" cy="10.5" r="9" fill="${cat['color']}" stroke="white" stroke-width="2" />
  </svg></li>
    </div>`;
  }
}

function useCategory(i) {
  let selection = document.querySelector('.category-input');
  let category = document.getElementById('renderCategorys');
  let categoryContainer = document.getElementById('category-container');
  selection.innerHTML = `<div>
  ${categorys[i]['name']} <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
  <circle cx="10" cy="10.5" r="9" fill="${categorys[i]['color']}" stroke="white" stroke-width="2" />
</svg>
  </div>`;
  currentCategory = selection.innerText;
  category.classList.add('d-none')
  categoryContainer.classList.remove('remove-border');
}


function clearInput(element) {
  let input = element.parentNode.parentNode.parentNode.querySelector('input');
  input.value = '';
}


function addSubtask() {
  let input = document.getElementById('generatedSubtaskInput').value;
  if (input !== '') {
    subtasks.push(input);
  }
  renderSubtasks();
}

function renderSubtasks() {
  let content = document.getElementById('subtask-content');
  let buttonContainer = document.getElementById('form-btn-container');
  content.innerHTML = '';

  for (let i = 0; i < subtasks.length; i++) {
    const subt = subtasks[i];
    content.innerHTML += `
    <div class="generated-subtask-container w-422">
    <div onclick="changeSubtaskCheckbox(${i})"><img checked="false" class="subtaskCheckboxImg" id="subtask-checkbox${i}" src="./img/checkbox.png"></div>
    <div class="font16" id="subtask${i}">${subt}</div>
    </div>
    `;
    let margin = 150;

    let calculatedMargin = margin - (29 * [i])
    margin = calculatedMargin;
    if (margin > 39) {
      buttonContainer.style.marginTop = margin;
    }
  }
}

function changeSubtaskCheckbox(i) {
  let checkboxImg = document.getElementById(`subtask-checkbox${i}`);

  if (checkboxImg.getAttribute('src') === './img/checkbox.png') {
    checkboxImg.src = './img/checkbox_checked.png'
    checkboxImg.setAttribute('checked', 'true');
  } else {
    checkboxImg.src = './img/checkbox.png'
    changeCheckbox.setAttribute('checked', 'false')
  }
}


function getSubtasks() {
  let test = document.querySelectorAll('.subtaskCheckboxImg');

  for (let i = 0; i < test.length; i++) {
    const t = test[i];
    const ti = t.getAttribute('checked');
    if (ti == 'true') {
      newSubtasks.push(t.parentNode.parentNode.firstElementChild.innerText);
    }
  }
}


function toggleCatgoryMenu() {
  let category = document.getElementById('renderCategorys');
  let categoryContainer = document.getElementById('category-container');
  category.classList.toggle('d-none');
  categoryContainer.classList.toggle('remove-border');
  document.addEventListener('click', event => {
    if (!categoryContainer.contains(event.target)) {
      category.classList.add('d-none');
      categoryContainer.classList.remove('remove-border');
    }
  });
  category.addEventListener('click', event => {
    event.stopPropagation();
  });
}

function clearAll() {
  subtasks = [];
  newSubtasks = [];
  currentCategory;
  renderCategorys();
  renderSubtasks();
}
