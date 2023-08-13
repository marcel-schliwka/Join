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
  let content = document.getElementById('editDialogSubtaskList');
  content.innerHTML = '';

  for (let i = 0; i < newSubtasks.length; i++) {
    const subtask = newSubtasks[i]['title'];
    // In html rendern
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


function addNewEditSubtask() {
  let input = document.getElementById('Container einsetzen').value;
  if (input !== '') {
    newSubtasks.push({
      title: input,
      property: 'unchecked'
    });
  }
  renderEditSubtasks();
}


function deleteEditSubtask(index) {
  newSubtasks.splice(i, 1);
  renderEditSubtasks();
}

