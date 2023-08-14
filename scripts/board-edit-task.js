let newSubtasks = [];
let editedAssigned = [];
let taskIndex;
let taskCard;

/**
 * Saves the edited task by updating the user's tasks, storing the data, and performing UI updates.
 */
function saveEditTask() {
  let updatedTask = getEditedVaraible();
  userObj["tasks"][taskIndex] = updatedTask;
  setItem(userObj.email, JSON.stringify(userObj));
  resetPrioButtons();
  closeEditModal(document.getElementById("openEditModal"));
  document.getElementById("templateEditTask").innerHTML = "";
  boardClosePopUpTask();
  boardOpenPopUpTask(taskIndex, taskCard);
}

/**
 * Resets the priority buttons to their default state by updating images and classes.
 */
function resetPrioButtons() {
  const priorities = ["low", "medium", "urgent"];
  const images = {};
  const buttons = {};
  priorities.forEach((priority) => {
    images[priority] = document.getElementById(`edit-${priority}-img`);
    buttons[priority] = document.getElementById(`edit-${priority}-btn`);
    images[priority].src = `./img/prio_${priority}_color.png`;
    buttons[priority].classList.remove(`${priority}-active`);
  });
}

/**
 * Collects and returns the edited task data as an object with updated values.
 *
 * @returns {Object} The edited task object with updated values.
 */
function getEditedVaraible() {
  let currentTask = userObj["tasks"][taskIndex];
  let title = document.getElementById("editTitle");
  let description = document.getElementById("editDescription");
  let status = currentTask["status"];
  let category = currentTask["category"];
  let categoryColor = currentTask["categoryColor"];
  let date = document.getElementById("editDate");
  let prio = currentPrio;
  if (prio == undefined) {
    prio = currentTask["prio"];
  }
  const id = currentTask["id"];
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

/**
 * Initiates the editing of a task by populating the edit task dialog with task data.
 * Updates various elements and components within the dialog.
 *
 * @param {number} i - The index of the task to be edited.
 */
function editTask(i) {
  document.getElementById("templateEditTask").innerHTML = generateEditTaskDialog();
  openEditModal(document.getElementById("openEditModal"));
  taskIndex = i;
  renderUserContacts();
  let currentTask = userObj.tasks[i];
  pushSubtasks(currentTask);
  renderEditSubtasks();
  document.getElementById("editOkBtn").classList.remove("display-none");
  document.getElementById("editTitle").value = currentTask["titel"];
  document.getElementById("editDescription").value = currentTask["description"];
  document.getElementById("editDate").value = currentTask["date"];
  setEditButtons(currentTask);
  renderEditAssignedContacts(currentTask);
}

/**
 * Sets the active state and updates the image of the priority button in the edit view.
 *
 * @param {Object} currentTask - The task object containing priority information.
 */
function setEditButtons(currentTask) {
  let currentButton = document.getElementById(`${"edit-" + currentTask["prio"] + "-btn"}`);
  let currentButtonImage = document.getElementById(`${"edit-" + currentTask["prio"] + "-img"}`);
  currentButton.classList.add(`${currentTask["prio"] + "-active"}`);
  currentButtonImage.src = `./img/prio_${currentTask["prio"]}.png`;
}

/**
 * Renders the assigned contacts for the edit view of a task.
 *
 * @param {Object} currentTask - The task object containing assigned contacts.
 */
function renderEditAssignedContacts(currentTask) {
  const assignedContacts = currentTask["assigned"];
  document.getElementById("editContactContainerList").innerHTML = "";
  for (let c = 0; c < assignedContacts.length; c++) {
    const contact = assignedContacts[c];
    document.getElementById("editContactContainerList").innerHTML +=
      htmlTemplateEditContactIcon(contact);
  }
  renderEditCheckboxes(assignedContacts)
}

/**
 * Renders the edit checkboxes based on assigned contacts, marking them as checked if needed.
 *
 * @param {string[]} assignedContacts - An array of contact names that are assigned.
 */
function renderEditCheckboxes(assignedContacts) {
  const checkboxImages = document.querySelectorAll(".checkboxEditImg");
  for (let j = 0; j < checkboxImages.length; j++) {
    const checkboxImg = checkboxImages[j];
    const listItem = checkboxImg.closest(".contact-item-container");
    if (listItem) {
      const contactName = listItem
        .querySelector(".edit-contact-item")
        .textContent.trim();
      if (assignedContacts.includes(contactName)) {
        checkboxImg.src = "./img/checkbox_checked.png";
      }
      if (assignedContacts.includes(userObj["name"])) {
        checkboxImg.src = "./img/checkbox_checked.png";
      }
    }
  }
}

/**
 * Updates the task priority selection in the edit view based on the selected button.
 * Adjusts the active classes and image sources accordingly.
 *
 * @param {HTMLElement} button - The priority button that was clicked.
 * @param {string} priority - The priority level associated with the button.
 */
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

/**
 * Renders the user's contacts in the edit view by populating the HTML content.
 */
function renderUserContacts() {
  let contacts = document.getElementById("editRenderContacts");
  contacts.innerHTML = "";
  contacts.innerHTML += generateEditUserAssignedHTML();
  for (let i = 0; i < userObj.contacts.length; i++) {
    const contact = userObj.contacts[i];
    contacts.innerHTML += renderEditContactsHTML(contact, i);
  }
  contacts.innerHTML += generateAddNewEditContact();
}

/**
 * Toggles the state of an edit checkbox image between checked and unchecked.
 *
 * @param {number} i - The index of the checkbox to be toggled.
 */
function changeEditCheckbox(i) {
  let checkboxImg = document.getElementById(`checkboxEditImg${i}`);
  if (checkboxImg.getAttribute("src") === "./img/checkbox.png") {
    checkboxImg.src = "./img/checkbox_checked.png";
  } else {
    checkboxImg.src = "./img/checkbox.png";
  }
}

/**
 * Initiates the editing of a generated subtask by replacing its content with an edit input.
 *
 * @param {number} index - The index of the subtask to be edited.
 */
function editGeneratedSubtask(index) {
  let subtask = document.getElementById(`subtask-text${index}`);
  let btnContainer = document.getElementById(`subtaskButtonsContainer${index}`);
  let subtaskCircle = document.getElementById(`subtaskCircle${index}`);
  subtaskCircle.classList.add("display-none");
  btnContainer.style.display =
    btnContainer.style.display === "none" ? "flex" : "none";
  subtask.innerHTML = generateEditSubtaskEditInput(subtask.innerText, index);
}

/**
 * Accepts the edited subtask input and updates the subtask at the specified index.
 * Renders the updated subtask content.
 *
 * @param {number} index - The index of the subtask to be updated.
 */
function acceptEditEditedSubtask(index) {
  let input = document.getElementById(`editedSubtask-input${index}`).value;
  console.log(input);
  (newSubtasks[index] = {
    title: input,
    property: "unchecked",
  }),
    renderEditSubtasks();
}

/**
 * Retrieves the list of edited assigned contacts based on checked checkboxes.
 * Populates the 'editedAssigned' array with the names of selected contacts.
 */
function getEditAssignedContacts() {
  editedAssigned = [];
  let checkboxImages = document.querySelectorAll(".checkboxEditImg");
  for (let i = 0; i < checkboxImages.length; i++) {
    const checkbox = checkboxImages[i];
    const source = checkbox["currentSrc"];
    if (source.includes("/img/checkbox_checked.png")) {
      let index = i - 1;
      if (index == -1) {
        editedAssigned.push(userObj["name"]);
      } else {
        editedAssigned.push(userObj["contacts"][index]["name"]);
      }
    }
  }
}

/**
 * Toggles the visibility and styling of the assigned menu and handles outside click events.
 */
function toggleEditAssignedMenu() {
  const contacts = document.getElementById("edit-contact-container");
  const contactContainer = document.getElementById("edit-assigned-container");
  const input = document.querySelector(".assigned-input input");
  contacts.classList.toggle("display-none");
  contactContainer.classList.toggle("remove-border");
  if (!input) {
    document.addEventListener("click", (event) => {
      if (!contactContainer.contains(event.target)) {
        contacts.classList.add("display-none");
        contactContainer.classList.remove("remove-border");
      }
    });
    contacts.addEventListener("click", (event) => {
      event.stopPropagation();
    });
  }
}

/**
 * Renders the edit subtasks by populating the HTML content with subtask data.
 */
function renderEditSubtasks() {
  let content = document.getElementById("subtask-edit-content");
  content.innerHTML = "";
  for (let i = 0; i < newSubtasks.length; i++) {
    const subtask = newSubtasks[i]["title"];
    content.innerHTML += generateEditSubtaskHTML(i, subtask);
  }
}

/**
 * Copies subtasks from the given current task and returns a new array of subtasks.
 *
 * @param {Object} currentTask - The current task containing subtasks.
 * @returns {Array} An array of new subtasks copied from the current task.
 */
function pushSubtasks(currentTask) {
  newSubtasks = [];
  for (let i = 0; i < currentTask["subtasks"].length; i++) {
    const subT = currentTask["subtasks"][i];
    newSubtasks.push({
      title: subT["title"],
      property: subT["property"],
    });
  }
}





function addEditedSubtask() {
  let input = document.getElementById("generatedSubtaskInput").value;
  if (input !== "") {
    newSubtasks.push({
      title: input,
      property: "unchecked",
    });
  }
  renderEditSubtasks();
}




function deleteGeneratedEditSubtask(index) {
  newSubtasks.splice(index, 1);
  renderEditSubtasks();
}





function changeToEditInput() {
  let input = document.getElementById("subtask-edit-input");
  let button = document.getElementById("subtasks-edit-button");
  input.innerHTML = generateEditInputHTML();
  button.innerHTML = generateEditButtonHTML();
  let generatedInput = document.getElementById("generatedSubtaskInput");
  if (generatedInput) {
    generatedInput.focus();
  }
}



function changeToEditSubtask() {
  let input = document.getElementById("subtask-edit-input");
  let button = document.getElementById("subtasks-edit-button");
  input.innerHTML = generateBasicEditSubtaskInputHTML();
  button.innerHTML = generateBasicEditSubtaskButtonHTML();
}
