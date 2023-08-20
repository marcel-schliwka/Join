let currentDraggedElement;
let currentStatus;
let currentTitel;

/**
 * Initializes the board by fetching the logged-in user, updating the HTML, and rendering the top logo.
 * @async
 * @function
 */
async function initBoard() {
  userObj = await getLoggedInUser();
  updateHTML();
  await renderTopLogo(userObj);
}

/**
 * Updates the HTML content of the board by performing a series of operations:
 * - Clearing all tasks
 * - Rendering all to-dos, in-progress tasks, tasks awaiting feedback, and done tasks
 * - Rendering contacts, categories, and subtasks
 * - Starting touch event listeners
 * @function
 */
function updateHTML() {
  clearAllTasks();
  renderTasks();
  checkIfDropAreaEmpty();
  renderContacts();
  renderCategorys();
  startTouchEventListener();
  searchTask();
}

function renderTasks() {
  renderTasksByStatus("to do", "todo", "assignedToDo");
  renderTasksByStatus("in progress", "inProgress", "assignedInProgress");
  renderTasksByStatus(
    "awaiting feedback",
    "awaitingFeedback",
    "assignedAwaitingFeedback"
  );
  renderTasksByStatus("done", "done", "assignedDone");
}

function renderTasksByStatus(status, containerId, assignmentIdPrefix) {
  const filteredTasks = userObj["tasks"].filter(
    (task) => task.status === status
  );
  filteredTasks.forEach((task, index) => {
    const { assigned } = task;
    document.getElementById(containerId).innerHTML += htmlTemplateByStatus(
      task,
      index,
      getPriority(task),
      status
    );
    // checkSubtasks(task);
    const idAssigned = document.getElementById(`${assignmentIdPrefix}${index}`);
    idAssigned.innerHTML = assigned
      .map((assignee, assigneeIndex) =>
        htmlTemplateAssignment(task, assigneeIndex)
      )
      .join("");
  });
}

function checkSubtasks(task) {
  let subtasks = task["subtasks"].length;
  if (subtasks === 0) {
    return -1;
  } else {
    count = countProperty(task);
    return calculateProgressBar(count);
  }
}

function countProperty(task) {
  let checkedCount = 0;
  let uncheckedCount = 0;
  for (let i = 0; i < task["subtasks"].length; i++) {
    const subtasks = task["subtasks"][i];
    if (subtasks.property === "checked") {
      checkedCount++;
    } else if (subtasks.property === "unchecked") {
      uncheckedCount++;
    }
  }
  return { checked: checkedCount, unchecked: uncheckedCount };
}

function calculateProgressBar(count) {
  let propertyLength = count["checked"] + count["unchecked"];
  let percentage = (count["checked"] * 100) / propertyLength;
  return Math.round(percentage);
}

/*
/**
 * Clears all tasks from the board. The tasks are cleared by setting the innerHTML of their respective containers to an empty string.
 * @function
 */
function clearAllTasks() {
  document.getElementById("todo").innerHTML = "";
  document.getElementById("inProgress").innerHTML = "";
  document.getElementById("awaitingFeedback").innerHTML = "";
  document.getElementById("done").innerHTML = "";
}

/**
 * Determines the priority of a given task element and returns the corresponding HTML string for its icon.
 *
 * @function
 * @param {Object} element - The task object which has a "prio" property indicating its priority.
 * @returns {string} HTML string representing the priority icon based on the task's priority. Possible icons are "prioUrgent", "prioMedium", and "prioLow".
 */
function getPriority(element) {
  let priority;
  if (element["prio"] == "urgent") {
    priority = '<img class="prio-icon" src="./img/prioUrgent.svg">';
  } else if (element["prio"] == "medium") {
    priority = '<img class="prio-icon" src="./img/prioMedium.svg">';
  } else {
    priority = '<img class="prio-icon" src="./img/prioLow.svg">';
  }
  return priority;
}

/**
 * Prepares the modal form to add a new task with a specified status.
 * The function saves the task status to local storage, updates the "onsubmit" attribute of the form
 * to add the task with the specified status, and then opens the modal.
 *
 * @function
 * @param {string} status - The status of the task to be added (e.g., "to do", "in progress").
 */
function addTaskByStatus(status) {
  saveStatusLocalstorage(status);
  document
    .querySelector(".popUpBoardTask")
    .setAttribute("onsubmit", `addTask('${status}', event); return false`);
  openModal(document.querySelector(".modal"));
}

/**
 * Toggles the visibility of the task addition window based on the provided state.
 *
 * @function
 * @param {string} state - The desired state for the task window; either "close" or any other value to show the modal.
 * @returns {void} - No return value.
 *
 * @description
 * If the state is "close", the function will hide the task addition window.
 * Otherwise, it will display the task addition window.
 */
function addTaskWindow(state) {
  let taskForm = document.getElementById("add-task-form");
  let taskContainer = document.querySelector(".add-task-container");
  return state == "close"
    ? taskContainer.classList.remove("show-modal")
    : taskContainer.classList.add("show-modal");
}

/**
 * Initializes the dragging operation for a card.
 *
 * @function
 * @param {string} id - The ID of the dragged element.
 * @param {HTMLElement} card - The HTML element representing the card being dragged.
 * @global
 * @requires currentDraggedElement: A global variable to hold the ID of the dragged element.
 * @requires currentStatus: A global variable to hold the current status of the dragged element.
 * @requires currentTitel: A global variable to hold the title of the dragged element.
 */
function startDragging(id, card) {
  currentDraggedElement = id;
  currentStatus = card.getAttribute("status");
  currentTitel = card.getAttribute("titel");
  card.classList.add("cardMove");
}

/**
 * Allows a drop operation to take place and highlights the drop area.
 *
 * @function
 * @param {Event} ev - The event object.
 * @param {HTMLElement} element - The element representing the drop area.
 */
function allowDrop(ev, element) {
  element.classList.add("moveBackground");
  ev.preventDefault();
}

/**
 * Removes the highlight from the drop area when dragging is over.
 *
 * @function
 * @param {HTMLElement} element - The element representing the drop area.
 */
function leaveDropArea(element) {
  element.classList.remove("moveBackground");
}

/**
 * Moves a task to a new status category after a drag-and-drop operation.
 *
 * @function
 * @param {string} status - The new status to assign to the task.
 * @param {HTMLElement} element - The drop area element.
 * @global
 * @requires userObj: An object containing user tasks.
 * @requires currentStatus: A global variable holding the current status of the dragged element.
 * @requires currentTitel: A global variable holding the title of the dragged element.
 * @requires setItem: A function that sets a new item in local storage.
 * @returns {number} 0 if there's an issue with the element or status, or if the task isn't found.
 */
function moveTo(status, element) {
  if (!element || !status) {
    return 0;
  }

  element.classList.remove("moveBackground");

  let index = userObj.tasks.findIndex(
    (task) => task.status == currentStatus && task.titel == currentTitel
  );

  if (index !== -1) {
    userObj.tasks[index].status = status;
    setItem(userObj.email, JSON.stringify(userObj));
    setTimeout(updateHTML, 0);
  } else {
    return 0;
  }
}

/**
 * Opens a popup with details of a task on the board.
 *
 * @function
 * @param {number} i - The index or ID of the task.
 * @param {HTMLElement} card - The HTML element representing the task card.
 * @global
 * @requires currentStatus: A global variable holding the current status of the task.
 * @requires currentTitel: A global variable holding the title of the task.
 * @requires userObj: An object containing user tasks.
 */
function boardOpenPopUpTask(i, card) {
  taskCard = card;
  taskIndex = i;
  currentStatus = card.getAttribute("status");
  currentTitel = card.getAttribute("titel");
  let index = userObj.tasks.findIndex(
    (task) => task.status == currentStatus && task.titel == currentTitel
  );

  let element = userObj.tasks[index];
  document.getElementById("popUpBoard").classList.remove("dNone");
  document.getElementById("popUpBoard").innerHTML = "";
  document.getElementById("popUpBoard").innerHTML = htmlTemplatePopUpTask(
    index,
    getThePriority(element)
  );
  document.getElementById("boardTasksMembers").innerHTML = "";
  for (let j = 0; j < element["assigned"].length; j++) {
    const element2 = element["assigned"][j];
    document.getElementById("boardTasksMembers").innerHTML +=
      htmlTemplatePopUpMembers(element2);
  }
  let subtaskContainer = document.getElementById("boardTasksSubtasks");
  if (element["subtasks"].length > 0) {
    subtaskContainer.innerHTML += generateSubtaskHeader();
    for (let k = 0; k < element["subtasks"].length; k++) {
      const element3 = element["subtasks"][k]["title"];
      subtaskContainer.innerHTML += generateBordSubtaskHTML(
        element3,
        k,
        element
      );
    }
    getProperty(element, i);
  }
}

function closeAddTaskModal() {
  let modal = document.querySelector(".modal");
  resetPrioButtons();
  closeModal(modal);
  updateHTML();
}

function checkIfDropAreaEmpty() {
  document.querySelectorAll(".dropArea").forEach((area) => {
    if (!area.hasChildNodes()) {
      if (area.id == "todo") {
        area.innerHTML = htmlTemplateEmptyDropArea("No task To do");
      }
      if (area.id == "inProgress") {
        area.innerHTML = htmlTemplateEmptyDropArea("No task in progress");
      }
      if (area.id == "awaitingFeedback") {
        area.innerHTML = htmlTemplateEmptyDropArea("No task awaiting Feedback");
      }
      if (area.id == "done") {
        area.innerHTML = htmlTemplateEmptyDropArea("No task done");
      }
    }
  });
}

function emptyTaskText(element) {
  let parentId = element.parentNode.id;
  if (parentId == "todo") {
    return "No task To Do";
  }
}

/**
 * Closes the task detail popup on the board.
 *
 * @function
 */
function boardClosePopUpTask() {
  document.getElementById("popUpBoard").classList.add("dNone");
  updateHTML();
}

async function changeToCheckbox(k) {
  const checkbox = document.getElementById(`subtask-checkbox${k}`);
  const index = userObj.tasks.findIndex(
    (task) => task.status === currentStatus && task.titel === currentTitel
  );
  if (checkbox.getAttribute("src") === "./img/checkbox.png") {
    checkbox.src = "./img/checkbox_checked.png";
    toggleSubtaskProperty(checkbox, "checked", index);
  } else if (checkbox.getAttribute("src") === "./img/checkbox_checked.png") {
    checkbox.src = "./img/checkbox.png";
    toggleSubtaskProperty(checkbox, "unchecked", index);
  }
  await setItem(userObj.email, JSON.stringify(userObj));
}

function toggleSubtaskProperty(checkbox, newProperty, taskIndex) {
  const subtaskIndex = parseInt(checkbox.id.match(/\d+$/)[0]);
  if (subtaskIndex >= 0 && taskIndex >= 0) {
    userObj.tasks[taskIndex].subtasks[subtaskIndex].property = newProperty;
  }
}

function getProperty(element, index) {
  let properties = element["subtasks"];
  const images = [
    {
      property: "unchecked",
      image: "./img/checkbox.png",
    },
    {
      property: "checked",
      image: "./img/checkbox_checked.png",
    },
  ];
  for (let i = 0; i < properties.length; i++) {
    const property = properties[i]["property"];
    const checkbox = document.getElementById(`subtask-checkbox${i}`);
    if (property == "unchecked") {
      checkbox.src = images[0].image;
    }
    if (property == "checked") {
      checkbox.src = images[1].image;
    }
  }
}

function generateSubtaskHeader() {
  return `
  <div class="pb-3 bold">Subtasks:</div>
  `;
}

/**
 * Deletes a task based on its index and updates the UI.
 *
 * @function
 * @param {number} i - The index of the task to be deleted.
 * @global
 * @requires userObj: An object containing user tasks.
 * @requires setItem: A function that sets a new item in local storage.
 * @requires updateHTML: A function that updates the HTML representation of tasks.
 */
function deleteTask(i) {
  boardClosePopUpTask();
  userObj.tasks.splice(i, 1);
  setItem(userObj.email, JSON.stringify(userObj));
  updateHTML();
}

/**
 * Determines and returns the priority image based on the task's priority.
 *
 * @function
 * @param {Object} element - The task object.
 * @returns {string} HTML markup of the priority image.
 */
function getThePriority(element) {
  let priority;
  if (element["prio"] == "urgent") {
    priority = '<img class="height35Px" src="./img/urgentPriority.png">';
  } else if (element["prio"] == "medium") {
    priority = '<img class="height35Px" src="./img/mediumPriority.png">';
  } else {
    priority = '<img class="height35Px" src="./img/lowPriority.png">';
  }
  return priority;
}

function searchTask() {
  let search = document.getElementById("boardInput").value;
  search = search.toLowerCase();
  renderSearchTasksByStatus(search, "to do", "todo", "assignedToDo");
  renderSearchTasksByStatus(
    search,
    "in progress",
    "inProgress",
    "assignedInProgress"
  );
  renderSearchTasksByStatus(
    search,
    "awaiting feedback",
    "awaitingFeedback",
    "assignedAwaitingFeedback"
  );
  renderSearchTasksByStatus(search, "done", "done", "assignedDone");
  checkIfDropAreaEmpty();
}

function renderSearchTasksByStatus(
  search,
  status,
  containerId,
  assignmentIdPrefix
) {
  const filteredTasks = userObj.tasks.filter((t) => t["status"] === status);
  document.getElementById(containerId).innerHTML = "";
  for (let i = 0; i < filteredTasks.length; i++) {
    let title = filteredTasks[i].titel;
    let description = filteredTasks[i].description;
    if (
      title.toLowerCase().includes(search) ||
      description.toLowerCase().includes(search)
    ) {
      const element = filteredTasks[i];
      document.getElementById(containerId).innerHTML += htmlTemplateByStatus(
        element,
        i,
        getPriority(element),
        status
      );
      let idAssigned = document.getElementById(`${assignmentIdPrefix}${i}`);
      idAssigned.innerHTML = element["assigned"]
        .map((_, j) => htmlTemplateAssignment(element, j))
        .join("");
    }
  }
}

function htmlTemplateByStatus(task, index, priority, status) {
  switch (status) {
    case "to do":
      return htmlTemplateToDo(task, index, priority);
    case "in progress":
      return htmlTemplateInProgress(task, index, priority);
    case "awaiting feedback":
      return htmlTemplateAwaitingFeedback(task, index, priority);
    case "done":
      return htmlTemplateDone(task, index, priority);
    default:
      return "";
  }
}

/**
 * Opens the board dialog.
 */
function boardOpenDialog() {
  let openDialog = document.getElementById("boardOpenDialog");
  openDialog.show();
}
