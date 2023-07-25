/**
 * To-Discuss
 * 
 * AssignedTo ==> New Assigned / New Contact?!
 * 
 * TO-DO
 * 
 * Aktuelles Datum bekommen um das als mindestwert zu setzen.
 * Category-Overflow aktuell verbuggt, wenn nicht in den Developer-Tools unterwegs
 * Dokumentation vervollständigen
 * responsiveness
 * 
 */


let getContacts;



window.addEventListener('DOMContentLoaded', function() {
const taskDateInput = document.getElementById('task-date');
  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  const today = new Date();
  taskDateInput.min = formatDate(today);
});



async function loadUserContacts() {
  getContacts = await getItem('guest_contacts');
}

async function loadTask() {
  getId = await getItem('guest_task');
}


async function setItem(key, value) {
  const PAYLOAD = { key, value, token: STORAGE_TOKEN };
  return fetch(STORAGE_URL, {
    method: "POST",
    body: JSON.stringify(PAYLOAD),
  }).then((res) => res.json());
}



let assigned = [];
let newSubtasks = [];
let subtasks = [];
let currentCategory;
let currentPrio;
let tasks = [];

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



async function init() {
  await loadUserContacts()
  renderContacts();
  renderCategorys();
  renderSubtasks();
}



function hideAssignedToDropdown() {
  let assignedContainer = document.getElementById('contact-container');
  let assignedInput = document.getElementById('assigned-container');
  assignedContainer.classList.add('d-none');
  assignedInput.classList.remove('remove-border');
}

function clearAssigned() {
  let assignedInput = document.getElementById('assigned-input');
  let assignedBtn = document.getElementById('assigned-button');
  assignedInput.innerHTML = generateBasicAssignedInputHTML();
  assignedBtn.innerHTML = generateBasicAssignedButtonHTML();
}



function addTask() {
  getSubtasks();
  let titel = document.getElementById('title-input').value;
  let description = document.getElementById('description-input').value;
  let date = document.getElementById('task-date').value;
  let prio = currentPrio;
  let color = document.querySelector('.category-input circle').getAttribute('fill');
  if (prio == undefined) {
    prio = 'low';
  }
  let assignedTo = assigned;
  let category = document.querySelector('.category-input').innerText;
  let selectedSubtasks = newSubtasks;

  let newTask = {
    titel: titel,
    description: description,
    status: 'to do',
    category: category,
    categoryColor: color,
    assigned: assignedTo,
    date: date,
    prio: prio,
    subtasks: selectedSubtasks
  };
  tasks.push(newTask);
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


/**
 * Category Section
 * 
*/

function clearCategory() {
  let category = document.getElementById('category-input');
  let categoryBtn = document.getElementById('category-button');
  category.innerHTML = generateBasicCategoryInputHTML();
  categoryBtn.innerHTML = generateBasicCategoryButtonHTML();
}

/**
 * This eventslistener change the color inside the HTML when a color gets selected
 */
document.addEventListener('coloris:pick', event => {
  document.querySelector('.colorpicker').style.backgroundColor = event.detail.color;

});

document.addEventListener('coloris:change', event => {
  document.querySelector('.colorpicker').style.backgroundColor = event.detail.color;
});


/**
 * 
 * This function gets called, when the task gets generated
 * it pushes the color value && the selected category into the category-object
 * 
 */
function addNewCategory() {
  let input = document.getElementById('generatedInput').value;
  let color = document.querySelector('.colorpicker').value;
  let category = document.getElementById('category-input');
  let categoryBtn = document.getElementById('category-button');
  let hiddenError = document.getElementById('hidden-error');

  if (input == '' && color == '') {
    hiddenError.innerText = 'Oops.. something went wrong';
    hiddenError.classList.remove('d-none');
  } else if (input == '') {
    hiddenError.innerText = 'You need to type a new category';
    hiddenError.classList.remove('d-none');
  } else if (color == '') {
    hiddenError.innerText = 'You need to pick a color';
    hiddenError.classList.remove('d-none');
  } else {
    hiddenError.innerText = '';
    hiddenError.classList.add('d-none');
    categorys.push({
      name: input,
      color: color
    });
    renderCategorys();
    category.innerHTML = generateBasicCategoryInputHTML();
    categoryBtn.innerHTML = generateBasicCategoryButtonHTML();
    let index = categorys.length;
    category.innerHTML = generateSelectedCategoryHTML(categorys, index - 1);
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
  selection.innerHTML = generateSelectedCategoryHTML(categorys, i);
  currentCategory = selection.innerText;
  category.classList.add('d-none')
  categoryContainer.classList.remove('remove-border');
}

/**
 * ASSIGNED
 */

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


function renderContacts() {
  let contacts = document.getElementById('renderContacts');
  contacts.innerHTML = '';
  contacts.innerHTML += generateUserAssignedHTML();

  for (let i = 0; i < getContacts.length; i++) {
    const contact = getContacts[i];
    contacts.innerHTML += renderContactsHTML(contact, i);
  }

  contacts.innerHTML += generateAddNewContact();
}



/**
 * SUBTASKS
 */


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


function changeToSubtask() {
  let subtasksInput = document.getElementById('subtasks-input');
  let subtasksBtn = document.getElementById('subtasks-button');
  subtasksInput.innerHTML = generateBasicSubtaskInputHTML();
  subtasksBtn.innerHTML = generateBasicSubtaskButtonHTML();
}


function changeSubtaskCheckbox(i) {
  let checkboxImg = document.getElementById(`subtask-checkbox${i}`);

  if (checkboxImg.getAttribute('src') === './img/checkbox.png') {
    checkboxImg.src = './img/checkbox_checked.png';
    checkboxImg.setAttribute('checked', 'true');
  } else {
    checkboxImg.src = './img/checkbox.png';
    changeCheckbox.setAttribute('checked', 'false');
  }
}


function getSubtasks() {
  let subtaskCheckboxes = document.querySelectorAll('.subtaskCheckboxImg');
  for (let i = 0; i < subtaskCheckboxes.length; i++) {
    const subCb = subtaskCheckboxes[i];
    const subCbValidation = subCb.getAttribute('checked');
    if (subCbValidation == 'true') {
      newSubtasks.push(subCb.parentNode.parentNode.children[1].innerText);
    }
  }
}

/**
 * Helper function Section
 */


/**
 * 
 * @param {id} containerId 
 * @param {id} buttonId 
 * This function gets the id from the input-container && button-container
 * according to the clicked container the new input field & buttons get generated
 * 
 */
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


/**
 * 
 * This function gets the id from an input-field and gets called via onclick
 * onclick the input field gets emptied
 * 
 * @param {id} element 
 */
function clearInput(element) {
  let input = element.parentNode.parentNode.parentNode.querySelector('input');
  input.value = '';
}


/**
 * 
 * This function gets the id from the checkbox-images.
 * Onclick the src gets changed to show a checked checkbox
 * @param {integer} i 
 */
function changeCheckbox(i) {
  let checkboxImg = document.getElementById(`checkboxImg${i}`);
  if (checkboxImg.getAttribute('src') === './img/checkbox.png') {
    checkboxImg.src = './img/checkbox_checked.png'
  } else {
    checkboxImg.src = './img/checkbox.png'
  }
}


/**
 * This function gets called, when clicked on the Clear-Button
 * If clicked, it clears the Arrays Subtasks and deletes the current Category
 * 
 */
function clearAll() {
  const categoryContainer = document.getElementById('category-input');
  const categoryBtn = document.getElementById('category-button');
  document.getElementById('urgentBtn').classList.remove('urgent-active');
  document.getElementById('mediumBtn').classList.remove('medium-active');
  document.getElementById('lowBtn').classList.remove('low-active');
  categoryContainer.innerHTML = generateBasicCategoryInputHTML();
  categoryBtn.innerHTML = generateBasicCategoryButtonHTML();
  currentPrio;
  subtasks = [];
  newSubtasks = [];
  currentCategory;
  renderCategorys();
  renderSubtasks();
}


/**
 * 
 * This section generates category templates
 *
 * @returns Category HTML-templates
*/

//Generates the input field, when clicked on "Add new Category" 
function generateCategoryInputHTML() {
  return `
  <div>
    <input id="generatedInput" placeholder="Enter new category" class="ol-none b-none">
  </div>
  `;
}

//Generates the new buttons, when clicked on "Add new Category" 
function generateCategoryButtonHTML() {
  return `
  <div class="generated-Btn-Container">
  <input required class="coloris instance2 colorpicker" type="text" data-coloris>
  <button onclick="clearInput(this), clearCategory()" type="button"><img  src="./img/cancel_icon.png"></button>
  <svg class="btn-seperator" xmlns="http://www.w3.org/2000/svg" width="2" height="31" viewBox="0 0 2 31" fill="none">
  <path d="M1 0V31" stroke="#D1D1D1"/>
  </svg>
  <button onclick="addNewCategory()" type="button"><img src="./img/check_black_icon.png"></button>
  </div>`;
}

//Generates the dropdown menu option "Add new category" before the aviable categorys gets renderd
function generateAddNewCategoryHTML() {
  return `
  <div onclick="changeToInput('category-input', 'category-button')" class="category-generated-list font20">
  <li class="font20 category-li-item" >Add new category</li>
  </div>
  `;
}

//Generates new HTML for rendering the aviable categorys + the newly added one
function renderCategorysHTML(i, cat) {
  return `<div class="category-dropdown-items" onclick="useCategory(${i})">
  <li class="font20 category-li-item"">${cat['name']} <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
  <circle cx="10" cy="10.5" r="9" fill="${cat['color']}" stroke="white" stroke-width="2" />
</svg></li>
  </div>`;
}

//If a Category gets selected, the category gets written in the innerText from the category dropdown menu
function generateSelectedCategoryHTML(categorys, i) {
  return `<div>
  ${categorys[i]['name']} <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
  <circle cx="10" cy="10.5" r="9" fill="${categorys[i]['color']}" stroke="white" stroke-width="2" />
</svg>
  </div>`;
}

//Generates the basic input field for categorys, from the HTML
function generateBasicCategoryInputHTML() {
  return `
  <div class="category-input cursor-p" id="category-input">
  <span>Select task category</span>`;
}

//Generates the basic button for categorys, from the HTML
function generateBasicCategoryButtonHTML() {
  return `
  <button type="button"><img src="./img/arrow_down.png"></button>
  `;
}

/**
 * 
 * This section generates assigned templates
 *
 * @returns Assigned HTML-templates
*/

//Generates the basic button for categorys, from the HTML
function generateBasicAssignedButtonHTML() {
  return `
  <div class="assigned-button-container" id="assigned-button">
    <button type="button"><img src="./img/arrow_down.png"></button>
  </div>
  `;
}

//Generates the basic input for categorys, from the HTML
function generateBasicAssignedInputHTML() {
  return `
  <div class="assigned-input" id="assigned-input">
    <span>Select contacts to assign</span>
  </div>
  `;
}

//Generates the input field, when clicked on "Invite new contact"
function generateAssignedInputHTML() {
  return `
  <div>
    <input "type="email" id="generatedInput" placeholder="Contact email" class="ol-none b-none">
  </div>
  `;
}

//Generates the buttons, when clicked on "Invite new contact"
function generateAssigendButtonHTML() {
  return `
  <div class="generated-Btn-Container">
  <button class="cancel-btn" onclick="clearInput(this); clearAssigned()" type="button"><img src="./img/cancel_icon.png"></button>
  <svg class="btn-seperator" xmlns="http://www.w3.org/2000/svg" width="2" height="31" viewBox="0 0 2 31" fill="none">
  <path d="M1 0V31" stroke="#D1D1D1"/>
  </svg>
  <button class="check-btn" type="button"><img src="./img/check_black_icon.png"></button>
  </div>`;
}

//Generates the User option, when the dropdown menu "Assigned to" (You) gets opend
function generateUserAssignedHTML() {
  return `
  <div class="contact-item-container">
    <li class="contact-item">You<a onclick="changeCheckbox(0)"><img class="checkboxImg cursor-p" id="checkboxImg0" src="./img/checkbox.png"></a></li>
  </div>
  `;
}

//Generates new HTML for rendering the aviable contacts + the newly added one
function renderContactsHTML(contact, i) {
  return `
    <div class="contact-item-container">
      <li class="contact-item">${contact['name']} <a onclick="changeCheckbox(${i + 1})"><img class="checkboxImg cursor-p" id="checkboxImg${i + 1}" src="./img/checkbox.png"></a></li>
    </div>
    `;
}

//Generates the input field, when clicked on "Invite new contact" to insert a new User Mail
function generateAddNewContact() {
  return `
  <div>
    <li onclick="changeToInput('assigned-input', 'assigned-button'); hideAssignedToDropdown()" class="contact-item">Invite new contact <img class="cursor-p"src="./img/contacts_black.png"></li>
  </div>
  `;
}

/**
 * 
 * This section generates subtask templates
 *
 * @returns Subtask HTML-templates
*/

//Generates the input field, when clicked on "Add new subtask"
function generateSubtaskInputHTML() {
  return `
    <div>
      <input id="generatedSubtaskInput" placeholder="Enter a new subtask" class="ol-none b-none">
    </div>
    `;
}

//Generates the new buttons inside the input field, when clicked on "Add new subtask"
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

//Generates the basic-styled "Add new subtask" input field (from html), when new subtask was added
function generateBasicSubtaskInputHTML() {
  return `
  <input onclick="changeToInput('subtasks-input', 'subtasks-button')" class="subtask-input  ol-none" type="text"
  placeholder="Add new subtask">
  `;
}

//Generates the basic-styled "Add new subtask" buttons (from html), when new subtask was added
function generateBasicSubtaskButtonHTML() {
  return `
  <div class="subtasks-button-container" id="subtasks-button">
    <button type="button"><img src="./img/plus_icon.png"></button>
  </div>
  `;
}

//Generates new HTML for rendering the newly added subtasks
function generateNewSubtaskHTML(i, subt) {
  return `
    <div class="generated-subtask-container w-422">
    <div onclick="changeSubtaskCheckbox(${i})"><img checked="false" class="subtaskCheckboxImg" id="subtask-checkbox${i}" src="./img/checkbox.png"></div>
    <div class="font16" id="subtask${i}">${subt}</div>
    </div>
    `;
}