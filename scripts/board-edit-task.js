function saveEditTask(taskIndex, e) {
  e.preventDefault();
  const status = userObj['tasks'][taskIndex]['status'];
  const id = userObj['tasks'][taskIndex]['id'];
  const variable = getEditedVaraible(status, id, taskIndex);
  resetPrioButtons();
}


function resetPrioButtons() {
  const priorities = ['low', 'medium', 'urgent'];
  const images = {};
  const buttons = {};
  priorities.forEach(priority => {
    images[priority] = document.getElementById(`edit-${priority}-img`);
    buttons[priority] = document.getElementById(`edit-${priority}-btn`);
    images[priority].src = `./img/prio_${priority}_color.png`;
    buttons[priority].classList.remove(`${priority}-active`);
  });
}




function getEditedVaraible(status, id, taskIndex) {
  let titel = document.getElementById("title-input");
  let description = document.getElementById("description-input");
  let date = document.getElementById("task-date");
  let category = userObj['tasks'][taskIndex]['category'];
  let assignedTo = assigned;
  let prio = currentPrio;
  let color = userObj['tasks'][taskIndex]['categoryColor'];
  if (prio == undefined) {
    prio = "low";
  }
  let newTask = {
    titel: titel.value,
    description: description.value,
    status: status,
    category: category,
    categoryColor: color,
    assigned: assignedTo,
    date: date.value,
    prio: prio,
    subtasks: newSubtasks,
    id: id,
  };
  return newTask;
}


function editTask(i) {
  renderUserContacts();
  let currentTask = userObj.tasks[i];
  pushSubtasks(currentTask);
  renderEditSubtasks();
  openEditModal(document.getElementById('openEditModal'))
  document.getElementById('editOkBtn').classList.remove('display-none');
  document.getElementById('editTitle').value = currentTask['titel'];
  document.getElementById('editDescription').value = currentTask['description'];
  document.getElementById('editDate').value = currentTask['date'];
  let currentButton = document.getElementById(`${'edit-' + currentTask['prio'] + '-btn'}`);
  let currentButtonImage = document.getElementById(`${'edit-' + currentTask['prio'] + '-img'}`);
  currentButton.classList.add(`${currentTask['prio'] + '-active'}`);
  currentButtonImage.src = `./img/prio_${currentTask['prio']}.png`;
  const checkboxImages = document.querySelectorAll('.checkboxImg');
  const assignedContacts = currentTask['assigned'];
  document.getElementById('editContactContainerList').innerHTML = '';
  for (let c = 0; c < assignedContacts.length; c++) {
    const contact = assignedContacts[c];
    document.getElementById('editContactContainerList').innerHTML +=
      htmlTemplateEditContactIcon(contact);
  }
  for (let i = 0; i < checkboxImages.length; i++) {
    const checkboxImg = checkboxImages[i];
    const listItem = checkboxImg.closest(".contact-item-container");
    if (listItem) {
      const contactName = listItem.querySelector(".contact-item").textContent.trim();
      if (assignedContacts.includes(contactName)) {
        checkboxImg.src = "./img/checkbox_checked.png";
      }
    }
  }
}



function getEditTaskPrio(button, priority) {
  const buttons = document.querySelectorAll(".prioBtn");
  let images = {
    low: document.getElementById("edit-low-img"),
    medium: document.getElementById("edit-medium-img"),
    urgent: document.getElementById("edit-urgent-img"),
  };
  buttons.forEach(function (btn) {
    if (btn.classList.contains(priority + "-active")) {
      btn.classList.remove(priority + "-active");
      currentPrio;
    } else if (btn !== button) {
      btn.classList.remove("low-active", "medium-active", "urgent-active");
      images.low.src = "./img/prio_low_color.png";
      images.medium.src = "./img/prio_medium_color.png";
      images.urgent.src = "./img/prio_urgent_color.png";
    }
  });
  button.classList.add(priority + "-active");
  images[priority].src = `./img/prio_${priority}.png`;
  currentPrio = priority;
}



function renderUserContacts() {
  let contacts = document.getElementById('editRenderContacts');
  contacts.innerHTML = "";
  contacts.innerHTML += generateUserAssignedHTML();
  for (let i = 0; i < userObj.contacts.length; i++) {
    const contact = userObj.contacts[i];
    contacts.innerHTML += renderContactsHTML(contact, i);
  }
  contacts.innerHTML += generateAddNewContact();
}


function toggleEditAssignedMenu() {
  const contacts = document.getElementById('edit-contact-container');
  const contactContainer = document.getElementById('edit-assigned-container');
  const input = document.querySelector('.assigned-input input');
  contacts.classList.toggle('display-none');
  contactContainer.classList.toggle('remove-border');
  if (!input) {
    document.addEventListener('click', (event) => {
      if(!contactContainer.contains(event.target)) {
        contacts.classList.add('display-none');
        contactContainer.classList.remove('remove-border');
      }
    });
    contacts.addEventListener('click', (event) => {
      event.stopPropagation();
    })
  }
}

let newSubtasks = [];


function renderEditSubtasks() {
  let content = document.getElementById('subtask-edit-content');
  content.innerHTML = '';

  for (let i = 0; i < newSubtasks.length; i++) {
    const subtask = newSubtasks[i]['title'];
    content.innerHTML += generateEditSubtaskHTML(i, subtask);
  }
}


function pushSubtasks(currentTask) {
  for (let i = 0; i < currentTask['subtasks'].length; i++) {
    const subT = currentTask['subtasks'][i];
    newSubtasks.push({
      title: subT['title'],
      property: subT['property']
    })
  }
}


function addEditedSubtask() {
  let input = document.getElementById('generatedSubtaskInput').value;
  if (input !== '') {
    newSubtasks.push({
      title: input,
      property: 'unchecked'
    });
  }
  renderEditSubtasks();
  console.log(newSubtasks);
}


function deleteEditSubtask(index) {
  newSubtasks.splice(index, 1);
  renderEditSubtasks();
}


function changeToEditInput() {
  let input = document.getElementById('subtask-edit-input');
  let button = document.getElementById('subtasks-edit-button');
  input.innerHTML = generateEditInputHTML();
  button.innerHTML = generateEditButtonHTML();
  let generatedInput = document.getElementById("generatedSubtaskInput");
  if (generatedInput) {
    generatedInput.focus();
  }
}

function changeToEditSubtask() {
  let input = document.getElementById('subtask-edit-input');
  let button = document.getElementById('subtasks-edit-button');
  input.innerHTML = generateBasicEditSubtaskInputHTML();
  button.innerHTML = generateBasicEditSubtaskButtonHTML();
}


function generateBasicEditSubtaskInputHTML() {
  return `
  <input onclick="changeToEditInput()" class="subtask-input  ol-none"
              type="text" placeholder="Add new subtask">
  `;
}


function generateBasicEditSubtaskButtonHTML() {
  return `          
    <button type="button"><img src="./img/plus_icon.png"></button>
    `;
}



function generateEditInputHTML() {
  return `
      <div>
        <input onkeydown="handleKeyPress(event, addSubtask, changeToSubtask)" id="generatedSubtaskInput" placeholder="Enter a new subtask" class="ol-none b-none">
      </div>
      `;
}

function generateEditButtonHTML() {
  return `
  <div class="generated-Btn-Container">
  <button onclick="changeToEditSubtask()" type="button"><img src="./img/cancel_icon.png"></button>
  <svg class="btn-seperator" xmlns="http://www.w3.org/2000/svg" width="2" height="31" viewBox="0 0 2 31" fill="none">
  <path d="M1 0V31" stroke="#D1D1D1"/>
  </svg>
  <button onclick="addEditedSubtask()" type="button"><img src="./img/check_black_icon.png"></button>
  </div>`;
}







function generateEditSubtaskHTML(i, subtask) {
  return `
  <li id="listItem${i}">
    <div class="d-flex justify-content-between align-items-center w-100">
      <div class="font16 w-230 ov-scroll subtask-item" id="subtask${i}">
        <div class="d-flex align-items-center">
          <svg id="subtaskCircle${i}" class="subtask-circle" xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10">
            <circle cx="5" cy="5" r="5" fill="black" />
          </svg>
          <div id="subtask-text${i}" class="ml-15">${subtask}</div>
        </div>
        <div id="subtaskButtonsContainer${i}" class="subtask-buttons">
          <svg onclick="editSubtask(${i})" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none">
            <mask id="mask0_71421_3311" style="mask-type: alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
              <rect width="24" height="24" fill="#D9D9D9"></rect>
            </mask>
            <g mask="url(#mask0_71421_3311)">
            <path class="my-path" d="M5 19H6.4L15.025 10.375L13.625 8.975L5 17.6V19ZM19.3 8.925L15.05 4.725L16.45 3.325C16.8333 2.94167 17.3042 2.75 17.8625 2.75C18.4208 2.75 18.8917 2.94167 19.275 3.325L20.675 4.725C21.0583 5.10833 21.2583 5.57083 21.275 6.1125C21.2917 6.65417 21.1083 7.11667 20.725 7.5L19.3 8.925ZM17.85 10.4L7.25 21H3V16.75L13.6 6.15L17.85 10.4Z" fill="#2A3647"></path>
            </g>
          </svg>
          <svg class="btn-seperator" xmlns="http://www.w3.org/2000/svg" width="2" height="22" viewBox="0 0 2 31" fill="none">
          <path d="M1 0V31" stroke="#D1D1D1"></path>
          </svg>
          <svg onclick="deleteEditSubtask(${i})" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none">
              <mask id="mask0_71421_4770" style="mask-type: alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                <rect width="24" height="24" fill="#D9D9D9"></rect>
              </mask>
              <g mask="url(#mask0_71421_4770)">
                <path class="my-path" d="M7 21C6.45 21 5.97917 20.8042 5.5875 20.4125C5.19583 20.0208 5 19.55 5 19V6C4.71667 6 4.47917 5.90417 4.2875 5.7125C4.09583 5.52083 4 5.28333 4 5C4 4.71667 4.09583 4.47917 4.2875 4.2875C4.47917 4.09583 4.71667 4 5 4H9C9 3.71667 9.09583 3.47917 9.2875 3.2875C9.47917 3.09583 9.71667 3 10 3H14C14.2833 3 14.5208 3.09583 14.7125 3.2875C14.9042 3.47917 15 3.71667 15 4H19C19.2833 4 19.5208 4.09583 19.7125 4.2875C19.9042 4.47917 20 4.71667 20 5C20 5.28333 19.9042 5.52083 19.7125 5.7125C19.5208 5.90417 19.2833 6 19 6V19C19 19.55 18.8042 20.0208 18.4125 20.4125C18.0208 20.8042 17.55 21 17 21H7ZM7 6V19H17V6H7ZM9 16C9 16.2833 9.09583 16.5208 9.2875 16.7125C9.47917 16.9042 9.71667 17 10 17C10.2833 17 10.5208 16.9042 10.7125 16.7125C10.9042 16.5208 11 16.2833 11 16V9C11 8.71667 10.9042 8.47917 10.7125 8.2875C10.5208 8.09583 10.2833 8 10 8C9.71667 8 9.47917 8.09583 9.2875 8.2875C9.09583 8.47917 9 8.71667 9 9V16ZM13 16C13 16.2833 13.0958 16.5208 13.2875 16.7125C13.4792 16.9042 13.7167 17 14 17C14.2833 17 14.5208 16.9042 14.7125 16.7125C14.9042 16.5208 15 16.2833 15 16V9C15 8.71667 14.9042 8.47917 14.7125 8.2875C14.5208 8.09583 14.2833 8 14 8C13.7167 8 13.4792 8.09583 13.2875 8.2875C13.0958 8.47917 13 8.71667 13 9V16Z" fill="#2A3647"></path>
              </g>
          </svg>
        </div>
      </div>
  </li>`;
}
