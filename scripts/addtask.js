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
    cId.innerHTML += generateCategoryInputHTML();
    bId.innerHTML += generateCategoryButtonHTML();
    document.querySelector('.colorpicker').click();


  } else if (cId.id.includes('assigned-input')) {
    cId.innerHTML += generateAssignedInputHTML();
    bId.innerHTML += generateAssigendButtonHTML();
    
  } else {
    bId.innerHTML += generateSubtaskButtonHTML();
    cId.innerHTML += generateSubtaskInputHTML();
  }
}


function addNewCategory() {
  let input = document.getElementById('generatedInput').value;
  let color = document.querySelector('.colorpicker').value;
  if (!input == '' || !color == undefined) {
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
  contacts.innerHTML += `
  <div>
    <li class="contact-item">You<a onclick="changeCheckbox(0)"><img class="checkboxImg cursor-p" id="checkboxImg0" src="./img/checkbox.png"></a></li>
  </div>
  `;

  for (let i = 0; i < getContacts.length; i++) {
    const contact = getContacts[i];
    contacts.innerHTML += `
    <div>
      <li class="contact-item">${contact['name']} <a onclick="changeCheckbox(${i + 1})"><img class="checkboxImg cursor-p" id="checkboxImg${i + 1}" src="./img/checkbox.png"></a></li>
    </div>
    `;
  }

  contacts.innerHTML += `
  <div>
    <li onclick="changeToInput('assigned-input', 'assigned-button')" class="contact-item">Invite new contact <img class="cursor-p"src="./img/contacts_black.png"></li>
  </div>
  `;
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
  category.innerHTML = generateAddNewCategoryHTML();

  for (let i = 0; i < categorys.length; i++) {
    const cat = categorys[i];
    category.innerHTML += renderCategorysHTML(i, cat);
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
  let subtasksInput = document.getElementById('subtasks-input');
  let subtasksBtn = document.getElementById('subtasks-button');
  subtasksInput.innerHTML = generateBasicSubtaskInputHTML();
  subtasksBtn.innerHTML = generateBasicSubtaskButtonHTML();
}




function renderSubtasks() {
  let content = document.getElementById('subtask-content');
  let buttonContainer = document.getElementById('form-btn-container');
  content.innerHTML = '';
  for (let i = 0; i < subtasks.length; i++) {
    const subt = subtasks[i];
    content.innerHTML += generateNewSubtaskHTML(i, subt);
    let margin = 150;
    let calculatedMargin = margin - (29 * [i + 1])
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
  let input = document.querySelector('.category-input input');
  category.classList.toggle('d-none');
  categoryContainer.classList.toggle('remove-border');
  if (input !== null) {
    categoryContainer.classList.remove('remove-border');
    category.classList.add('d-none')
  } else {
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
}

function toggleAssigndMenu() {
  let contacts = document.getElementById('contact-container');
  let contactContainer = document.getElementById('assigned-container');
  let input = document.querySelector('.assigned-input input');
  contacts.classList.toggle('d-none');
  contactContainer.classList.toggle('remove-border');

  if (input !== null) {
    contacts.classList.add('d-none');
    contactContainer.classList.remove('remove-border');
  } else {
    document.addEventListener('click', event => {
      if (!contactContainer.contains(event.target)) {
        contacts.classList.add('d-none');
        contactContainer.classList.remove('remove-border');
      }
    });
    contacts.addEventListener('click', event => {
      event.stopPropagation();
    });
  }
}


function clearAll() {
  subtasks = [];
  newSubtasks = [];
  currentCategory;
  renderCategorys();
  renderSubtasks();
}


function changeToSubtask() {
  let subtasksInput = document.getElementById('subtasks-input');
  let subtasksBtn = document.getElementById('subtasks-button');
  subtasksInput.innerHTML = generateBasicSubtaskInputHTML();
  subtasksBtn.innerHTML = generateBasicSubtaskButtonHTML();
}






/**
 * 
 * This section generates subtask templates
 *
 * @returns Subtask HTML-templates
*/

function generateSubtaskInputHTML() {
  return `
    <div>
      <input id="generatedSubtaskInput" placeholder="Enter a new subtask" class="ol-none b-none">
    </div>
    `;
}


function generateSubtaskButtonHTML() {
  return `
    <div class="generated-Btn-Container">
    <button onclick="clearInput(this); changeToSubtask()" type="button"><img src="./img/cancel_icon.png"></button>
    <svg class="btn-seperator" xmlns="http://www.w3.org/2000/svg" width="2" height="31" viewBox="0 0 2 31" fill="none">
    <path d="M1 0V31" stroke="#D1D1D1"/>
    </svg>
    <button onclick="addSubtask()" type="button"><img src="./img/check_black_icon.png"></button>
    </div>`;
}


function generateBasicSubtaskInputHTML() {
  return `
  <input onclick="changeToInput('subtasks-input', 'subtasks-button')" class="subtask-input  ol-none" type="text"
  placeholder="Add new subtask">
  `;
}


function generateBasicSubtaskButtonHTML() {
  return `
  <div class="subtasks-button-container" id="subtasks-button">
    <button type="button"><img src="./img/plus_icon.png"></button>
  </div>
  `;
}


function generateNewSubtaskHTML(i, subt) {
  rturn `
    <div class="generated-subtask-container w-422">
    <div onclick="changeSubtaskCheckbox(${i})"><img checked="false" class="subtaskCheckboxImg" id="subtask-checkbox${i}" src="./img/checkbox.png"></div>
    <div class="font16" id="subtask${i}">${subt}</div>
    </div>
    `;
}


function renderCategorysHTML(i, cat) {
  return `<div class="category-dropdown-items" onclick="useCategory(${i})">
  <li class="font20 category-li-item"">${cat['name']} <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
  <circle cx="10" cy="10.5" r="9" fill="${cat['color']}" stroke="white" stroke-width="2" />
</svg></li>
  </div>`;
}


/**
 * 
 * This section generates category templates
 *
 * @returns Category HTML-templates
*/

function generateCategoryInputHTML() { 
  return `
  <div>
    <input id="generatedInput" placeholder="Enter new category" class="ol-none b-none">
  </div>
  `;
}


function generateCategoryButtonHTML() {
  return `
  <div class="generated-Btn-Container">
  <input required class="coloris instance2 colorpicker" type="text" data-coloris>
  <button onclick="clearInput(this)" type="button"><img  src="./img/cancel_icon.png"></button>
  <svg class="btn-seperator" xmlns="http://www.w3.org/2000/svg" width="2" height="31" viewBox="0 0 2 31" fill="none">
  <path d="M1 0V31" stroke="#D1D1D1"/>
  </svg>
  <button onclick="addNewCategory()" type="button"><img src="./img/check_black_icon.png"></button>
  </div>`;
}


function generateAddNewCategoryHTML() {
  return `
  <div onclick="changeToInput('category-input', 'category-button')" class="category-generated-list font20">
  <li class="font20 category-li-item" >Add new category</li>
  </div>
  `;
}



/**
 * 
 * This section generates assigned templates
 *
 * @returns Assigned HTML-templates
*/

function generateAssignedInputHTML() { 
  return `
  <div>
    <input "type="email" id="generatedInput" placeholder="Contact email" class="ol-none b-none">
  </div>
  `;
}

function generateAssigendButtonHTML() {
  return `
  <div class="generated-Btn-Container">
  <button class="cancel-btn" onclick="clearInput(this)" type="button"><img src="./img/cancel_icon.png"></button>
  <svg class="btn-seperator" xmlns="http://www.w3.org/2000/svg" width="2" height="31" viewBox="0 0 2 31" fill="none">
  <path d="M1 0V31" stroke="#D1D1D1"/>
  </svg>
  <button class="check-btn" type="button"><img src="./img/check_black_icon.png"></button>
  </div>`;
}
