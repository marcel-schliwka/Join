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
  let subtaskTexts = getSubtasks();
  let newSubtasks = subtaskTexts.map((subtaskTitle) => ({
    title: subtaskTitle,
    property: "unchecked",
  }));
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














function changeToSubtask() {
  let subtasksInput = document.getElementById("editSubtasksInput");
  let subtasksBtn = document.getElementById("editSubtasksButton");
  subtasksInput.innerHTML = generateBasicSubtaskInputHTML();
  subtasksBtn.innerHTML = generateBasicSubtaskButtonHTML();
}

function renderSubtasksEditDialog(subtasks, i) {
  for (let s = 0; s < subtasks.length; s++) {
    const sub = subtasks[s];
    document.getElementById('editDialogSubtaskList').innerHTML += renderSubtaskListForEditDialog(sub, i);
  }
}
function editChangeToInput(inputId, buttonId) {
  let input = document.getElementById(inputId);
  let button = document.getElementById(buttonId);
  input.innerHTML = '';
  button.innerHTML = '';

  if (input.id.includes('editSubtasksInput')) {
    button.innerHTML += generateEditSubtasksButtonHTML();
    input.innerHTML += generateEditSubtaskInputHTML();

  }
}

function addEditedSubtask() {
  let input = document.getElementById("editSubtasksInput").value;
  if (input !== "") {
    subtasks.push({
      title: input,
      property: 'unchecked'
    });
  }
  renderSubtasksEditDialog();
  let subtasksInput = document.getElementById("editSubtasksInput");
  let subtasksBtn = document.getElementById("editSubtasksButton");
  subtasksInput.innerHTML = generateBasicSubtaskInputHTML();
  subtasksBtn.innerHTML = generateBasicSubtaskButtonHTML();
}

function addSubtask() {
  let input = document.getElementById("generatedSubtaskInput").value;
  if (input !== "") {
    subtasks.push(input);
  }
  renderSubtasks();
  let subtasksInput = document.getElementById("subtasks-input");
  let subtasksBtn = document.getElementById("subtasks-button");
  subtasksInput.innerHTML = generateBasicSubtaskInputHTML();
  subtasksBtn.innerHTML = generateBasicSubtaskButtonHTML();
}

function renderBoardSubtasks(currentTask) {
  const content = document.getElementById('subtask-content');
  const buttonContainer = document.getElementById('form-btn-container');
  content.innerHTML = '';

  for (let i = 0; i < currentTask['subtasks'].length; i++) {
    const subtaskTitle = currentTask['subtasks'][i]['title'];
    const subtaskProperty = currentTask['subtasks'][i]['property'];
    subtasks.push({
      title: subtaskTitle,
      property: subtaskProperty,

    });
    for (let j = 0; j < subtasks.length; j++) {
      const st = subtasks[j];
      content.innerHTML += generateTemplateSubtasks(st, j);
    }
  }
}
