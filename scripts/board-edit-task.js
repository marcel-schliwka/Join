let newSubtasks = [];
let editedAssigned = [];

function saveEditTask(taskIndex, e) {
  e.preventDefault();
  const variable = getEditedVaraible(taskIndex);
  console.log(variable.newTask);
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


function getEditedVaraible(taskIndex) {
  const currentTask = userObj['tasks'][taskIndex];
  const title = document.getElementById('editTitle');
  const description = document.getElementById('editDescription');
  const status = currentTask['status'];
  const category = currentTask['category'];
  const categoryColor = currentTask['color'];
  const date = document.getElementById('editDate');
  const prio = currentPrio;
  if (prio == undefined) {
    prio = currentTask['prio']
  };
  const id = currentTask['id'];
  getEditAssignedContacts();
  let newTask = {
    titel: title.value,
    description: description.value,
    status: status,
    category: category,
    categoryColor: categoryColor,
    assigned: editedAssigned,
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
  contacts.innerHTML += generateEditUserAssignedHTML();
  for (let i = 0; i < userObj.contacts.length; i++) {
    const contact = userObj.contacts[i];
    contacts.innerHTML += renderEditContactsHTML(contact, i);
  }
  contacts.innerHTML += generateAddNewEditContact();
}


function changeEditCheckbox(i) {
  let checkboxImg = document.getElementById(`checkboxEditImg${i}`);
  if (checkboxImg.getAttribute("src") === "./img/checkbox.png") {
    checkboxImg.src = "./img/checkbox_checked.png";
  } else {
    checkboxImg.src = "./img/checkbox.png";
  }
}


function editGeneratedSubtask(index) {
  let subtask = document.getElementById(`subtask-text${index}`);
  let btnContainer = document.getElementById(`subtaskButtonsContainer${index}`);
  let container = document.getElementById(`listItem${index}`);
  let subtaskCircle = document.getElementById(`subtaskCircle${index}`);
  container.classList.toggle("no-hover");
  subtaskCircle.classList.add('display-none')
  btnContainer.style.display =
    btnContainer.style.display === "none" ? "flex" : "none";
  subtask.innerHTML = generateEditSubtaskEditInput(subtask.innerText, index);
}


function acceptEditEditedSubtask(index) {
  let input = document.getElementById(`editedSubtask-input${index}`);
  console.log(input);
  newSubtasks[index] = input.value;
  console.log(newSubtasks);
  renderEditSubtasks();
}



function getEditAssignedContacts() {
  let test = document.querySelectorAll(".checkboxImg");
  for (let i = 0; i < test.length; i++) {
    const t = test[i];
    const source = t["currentSrc"];
    if (source.includes("/img/checkbox_checked.png")) {
      let index = i - 1;
      if (index == -1) {
        editedAssigned.push(userObj.name);
      } else {
        editedAssigned.push(userObj["contacts"][index]["name"]);
      }
    }
  }
}


function toggleEditAssignedMenu() {
  const contacts = document.getElementById('edit-contact-container');
  const contactContainer = document.getElementById('edit-assigned-container');
  const input = document.querySelector('.assigned-input input');
  contacts.classList.toggle('display-none');
  contactContainer.classList.toggle('remove-border');
  if (!input) {
    document.addEventListener('click', (event) => {
      if (!contactContainer.contains(event.target)) {
        contacts.classList.add('display-none');
        contactContainer.classList.remove('remove-border');
      }
    });
    contacts.addEventListener('click', (event) => {
      event.stopPropagation();
    })
  }
}


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


function deleteGeneratedEditSubtask(index) {
  newSubtasks.splice(index, 1);
  renderEditSubtasks();
}


function acceptEditEditedSubtask(index) {
  let input = document.getElementById(`editedSubtask-input${index}`);
  subtasks[index] = input.value;
  renderSubtasks();
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



