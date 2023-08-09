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
  renderAllToDos();
  renderAllInProgress();
  renderAllAwaitingFeedback();
  renderAllDone();
  renderContacts();
  renderCategorys();
  renderSubtasks();
  startTouchEventListener();
}

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
 * Renders all tasks with the status "to do" to the DOM.
 * For each task, the function generates the HTML template for the task and its assigned members.
 * It uses the `htmlTemplateToDo` for the task and `htmlTemplateAssignment` for each assigned member.
 * @function
 * @global
 */
function renderAllToDos() {
  let stillToDo = userObj.tasks.filter((t) => t["status"] === "to do");

  stillToDo.forEach((element, i) => {
    document.getElementById("todo").innerHTML += htmlTemplateToDo(
      element,
      i,
      getPriority(element)
    );

    let idAssigned = document.getElementById(`assignedToDo${i}`);
    idAssigned.innerHTML = element["assigned"]
      .map((_, j) => htmlTemplateAssignment(element, j))
      .join("");
  });
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
 * Generates the HTML template for a given task element for the "to do" category.
 *
 * @function
 * @param {Object} element - The task object containing details like title, description, category, category color, etc.
 * @param {number} i - The index or identifier for the task, used to generate unique IDs for DOM elements.
 * @param {string} priority - The HTML string representing the priority icon for the task.
 * @returns {string} HTML template string for the task, which includes details like category, title, description, and assigned members.
 */
function htmlTemplateToDo(element, i, priority) {
  return `<div status="to do" currentId="${i}" titel="${element["titel"]}" id="cardTodo${i}" onclick="boardOpenPopUpTask(this.getAttribute('currentId'), this)"  draggable="true" ondragstart="startDragging(this.getAttribute('currentId'), this)" class="moveableCard bgWhite2 cursorPointer boxShadow border rounded-5 p-2 my-3 d-flex flex-column align-items-start">
            <div class="textWhite border rounded-3 px-3 m-2 task-headline" style="background-color:${element["categoryColor"]}">
                ${element["category"]}
            </div>
            <div class="mt-2 mx-2 bold sub-headline">
                ${element["titel"]}
            </div>
            <div class="cardText mx-2 my-1">
                ${element["description"]}
            </div>
            <div class="d-flex justify-content-between mx-2 my-1 w-100 pe-4 align-items-center">
                <div class="d-flex textWhite" id="assignedToDo${i}"></div>
                <div>${priority}</div>
            </div>
        </div>`;
}

/**
 * Generates the HTML template for a given assignment element, typically representing a member assigned to a task.
 *
 * @function
 * @param {Object} element - The task object containing an "assigned" property which is an array of member names.
 * @param {number} j - The index of the member in the "assigned" array, used to fetch the specific member.
 * @returns {string} HTML template string for the assigned member, which includes the member's initials set against a background color.
 */
function htmlTemplateAssignment(element, j) {
  return `<div class="margin-4 contact-icon d-flex justify-content-center align-items-center border rounded-circle p-2" style="background-color:${
    MemberColors[getColorSign(element["assigned"][j])]
  }">
            ${getInitials(element["assigned"][j])}
        </div>`;
}

// --------------- IN PROGRESS --------------- \\

/**
 * Renders all tasks with the status "in progress" to the DOM.
 * For each task, the function generates the HTML template for the task and its assigned members.
 * It uses the `htmlTemplateInProgress` for the task and `htmlTemplateAssignment` for each assigned member.
 *
 * @function
 * @global
 */
function renderAllInProgress() {
  let stillInProgress = userObj.tasks.filter(
    (t) => t["status"] === "in progress"
  );

  stillInProgress.forEach((element, i) => {
    document.getElementById("inProgress").innerHTML += htmlTemplateInProgress(
      element,
      i,
      getPriority(element)
    );

    let idAssigned = document.getElementById(`assignedInProgress${i}`);
    idAssigned.innerHTML = element["assigned"]
      .map((_, j) => htmlTemplateAssignment(element, j))
      .join("");
  });
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
 * Generates the HTML template for a given task element for the "in progress" category.
 *
 * @function
 * @param {Object} element - The task object containing details like title, description, category, category color, etc.
 * @param {number} i - The index or identifier for the task, used to generate unique IDs for DOM elements.
 * @param {string} priority - The HTML string representing the priority icon for the task.
 * @returns {string} HTML template string for the task, which includes details like category, title, description, and assigned members.
 */
function htmlTemplateInProgress(element, i, priority) {
  return `<div status="in progress" currentId="${i}" titel="${element["titel"]}" id="cardInProgress${i}" onclick="boardOpenPopUpTask(this.getAttribute('currentId'), this)" draggable="true" ondragstart="startDragging(this.getAttribute('currentId'), this)" class="moveableCard bgWhite2 cursorPointer boxShadow border rounded-5 p-2 my-3 d-flex flex-column align-items-start">
            <div class="textWhite border rounded-3 px-3 m-2 task-headline" style="background-color:${element["categoryColor"]}">
                ${element["category"]}
            </div>
            <div class="mt-2 mx-2 bold sub-headline">
                ${element["titel"]}
            </div>
            <div class="cardText mx-2 my-1">
                ${element["description"]}
            </div>
            <div class="d-flex justify-content-between mx-2 my-1 w-100 pe-4 align-items-center">
                <div class="d-flex textWhite" id="assignedInProgress${i}"></div>
                <div>${priority}</div>
            </div>
        </div>`;
}

// --------------- AWAITING FEEDBACK --------------- \\
/**
 * Renders all tasks that are awaiting feedback.
 *
 * For each task that is awaiting feedback, this function:
 * 1. Appends the task to the awaiting feedback container.
 * 2. Renders all assigned users for the task.
 *
 * @function
 * @global
 * @requires userObj: An object containing user tasks, where each task has a status and assigned property.
 * @requires htmlTemplateAwaitingFeedback: A function that returns HTML markup for a task awaiting feedback.
 * @requires getPriority: A function that determines the priority of a task.
 * @requires htmlTemplateAssignment: A function that returns HTML markup for a task assignment.
 */
function renderAllAwaitingFeedback() {
  const awaitingFeedbackTasks = userObj.tasks.filter(
    (task) => task.status === "awaiting feedback"
  );

  awaitingFeedbackTasks.forEach((task, index) => {
    const { assigned } = task;

    // Append task to the awaiting feedback container
    document.getElementById("awaitingFeedback").innerHTML +=
      htmlTemplateAwaitingFeedback(task, index, getPriority(task));

    // Render all assigned users for the task
    const idAssigned = document.getElementById(
      `assignedAwaitingFeedback${index}`
    );
    idAssigned.innerHTML = assigned
      .map((assignee, assigneeIndex) =>
        htmlTemplateAssignment(task, assigneeIndex)
      )
      .join("");
  });
}

/**
 * Generates and returns the HTML markup for a task that's awaiting feedback.
 *
 * @function
 * @param {Object} element - The task object.
 * @param {number} i - The index or ID of the task.
 * @param {string} priority - The priority of the task.
 * @returns {string} HTML markup for the task.
 *
 * @property {string} element.titel - The title of the task.
 * @property {string} element.categoryColor - The background color for the category label.
 * @property {string} element.category - The category name of the task.
 * @property {string} element.description - A brief description of the task.
 */
function htmlTemplateAwaitingFeedback(element, i, priority) {
  return `<div status="awaiting feedback" currentId="${i}" id="cardAwaitingFeedback${i}" titel="${element["titel"]}" onclick="boardOpenPopUpTask(this.getAttribute('currentId'), this)" draggable="true" ondragstart="startDragging(this.getAttribute('currentId'), this)" class="moveableCard bgWhite2 cursorPointer boxShadow border rounded-5 p-2 my-3 d-flex flex-column align-items-start">
        <div class="textWhite border rounded-3 px-3 m-2 task-headline" style="background-color: ${element["categoryColor"]}">
            ${element["category"]}
        </div>
        <div class="mt-2 mx-2 bold sub-headline">
            ${element["titel"]}
        </div>
        <div class="cardText mx-2 my-1">
            ${element["description"]}
        </div>
        <div class="d-flex justify-content-between mx-2 my-1 w-100 pe-4 align-items-center">
            <div class="d-flex textWhite" id="assignedAwaitingFeedback${i}"></div>
            <div>${priority}</div>
        </div>
    </div>`;
}

// --------------- DONE --------------- \\
/**
 * Renders all tasks that are marked as "done".
 *
 * For each task that is marked as "done", this function:
 * 1. Appends the task to the "done" container.
 * 2. Renders all assigned users for the task.
 *
 * @function
 * @global
 * @requires userObj: An object containing user tasks, where each task has a status and assigned property.
 * @requires htmlTemplateDone: A function that returns HTML markup for a task that's marked as "done".
 * @requires getPriority: A function that determines the priority of a task.
 * @requires htmlTemplateAssignment: A function that returns HTML markup for a task assignment.
 */
function renderAllDone() {
  const doneTasks = userObj.tasks.filter((task) => task.status === "done");

  doneTasks.forEach((task, index) => {
    const { assigned } = task;

    // Append task to the done container
    document.getElementById("done").innerHTML += htmlTemplateDone(
      task,
      index,
      getPriority(task)
    );

    // Render all assigned users for the task
    const idAssigned = document.getElementById(`assignedDone${index}`);
    idAssigned.innerHTML = assigned
      .map((assignee, assigneeIndex) =>
        htmlTemplateAssignment(task, assigneeIndex)
      )
      .join("");
  });
}

/**
 * Generates and returns the HTML markup for a task that's marked as "done".
 *
 * @function
 * @param {Object} element - The task object.
 * @param {number} i - The index or ID of the task.
 * @param {string} priority - The priority of the task.
 * @returns {string} HTML markup for the task.
 *
 * @property {string} element.titel - The title of the task.
 * @property {string} element.categoryColor - The background color for the category label.
 * @property {string} element.category - The category name of the task.
 * @property {string} element.description - A brief description of the task.
 */
function htmlTemplateDone(element, i, priority) {
  return `<div status="done" id="cardDone${i}" currentId="${i}" titel="${element["titel"]}" onclick="boardOpenPopUpTask(this.getAttribute('currentId'), this)" draggable="true" ondragstart="startDragging(this.getAttribute('currentId'), this)" class="moveableCard cursorPointer bgWhite2 boxShadow border rounded-5 p-2 my-3 d-flex flex-column align-items-start">
        <div class="textWhite border rounded-3 px-3 m-2 task-headline" style="background-color:${element["categoryColor"]}">
            ${element["category"]}
        </div>
        <div class="mt-2 mx-2 bold sub-headline">
            ${element["titel"]}
        </div>
        <div class="cardText mx-2 my-1">
            ${element["description"]}
        </div>
        <div class="d-flex justify-content-between mx-2 my-1 w-100 pe-4 align-items-center">
            <div class="d-flex textWhite" id="assignedDone${i}"></div>
            <div>${priority}</div>
        </div>
    </div>`;
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
  // Prüfe, ob das Element oder der Status nicht definiert sind
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
  let taskForm = document.querySelector(".popUpBoardTask");
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
  taskForm.setAttribute("onsubmit", `saveEditTask(${index}, event)`);
}

/**
 * Saves the edited details of a task.
 *
 * @function
 * @param {number} taskIndex - The index or ID of the task being edited.
 * @global
 * @requires userObj: An object containing user tasks.
 * @requires setItem: A function that sets a new item in local storage.
 */
function saveEditTask(taskIndex) {
  let titel = document.getElementById("title-input");
  let description = document.getElementById("description-input");
  let date = document.getElementById("task-date");
  let category = document.querySelector(".category-input");
  let assignedTo = assigned;
  let selectedSubtasks = newSubtasks;
  let prio = currentPrio;
  let color = document
    .querySelector(".category-input circle")
    .getAttribute("fill");
  if (prio == undefined) {
    prio = "low";
  }
  let newTask = {
    titel: titel.value,
    description: description.value,
    status: userObj.tasks[taskIndex].status,
    category: category.innerText,
    categoryColor: color,
    assigned: assignedTo,
    date: date.value,
    prio: prio,
    subtasks: selectedSubtasks,
    id: userObj.tasks.length,
  };
  userObj.tasks[taskIndex] = newTask;
  setItem(userObj.email, JSON.stringify(userObj));
}

/**
 * Closes the task detail popup on the board.
 *
 * @function
 */
function boardClosePopUpTask() {
  document.getElementById("popUpBoard").classList.add("dNone");
}

/**
 * Generates and returns the HTML markup for a task detail popup on the board.
 *
 * @function
 * @param {number} i - The index or ID of the task.
 * @param {string} priority - The priority of the task.
 * @returns {string} HTML markup for the task detail popup.
 *
 * @global
 * @requires userObj: An object containing user tasks.
 */
function htmlTemplatePopUpTask(i, priority) {
  return `<div class="popUpBoardTask px-4 pt-4 pb-1 rounded-4 d-flex flex-column align-items-start">
        <img onclick="boardClosePopUpTask()" class="boardTaskClose cursorPointer" src="./img/closeIt.svg" alt="close">
        <div class="boardTaskEdit d-flex">
            <img class="cursorPointer heightWidth35Px" src="./img/deleteButton.svg" alt="delete" onclick="deleteTask(${i})">
            <img class="cursorPointer heightWidth35Px" src="./img/editButton.svg" alt="edit" onclick="editTask(${i})">
        </div>
        <div style="background-color: ${userObj.tasks[i]["categoryColor"]}" class="textWhite px-3 rounded-2">${userObj.tasks[i].category}</div>
        <div class="size3Em bold font-61">${userObj.tasks[i]["titel"]}</div>
        <div class="pb-2 max-size">${userObj.tasks[i]["description"]}</div>
        <div class="pb-2 d-flex">
            <div class="pe-3 bold">Due date:</div>
            <div class="bold">${userObj.tasks[i]["date"]}</div>
        </div>
        <div class="pb-2 d-flex align-items-center">
            <div class="pe-3 bold">Priority:</div>
            <div>${priority}</div>
        </div>
        <div>
            <div class="pb-3 bold">Assigned to:</div>
            <div id="boardTasksMembers" class="d-flex flex-column"></div>
        </div>
    </div>`;
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

/**
 * Generates and returns the HTML markup for the member icon in a popup.
 *
 * @function
 * @param {Object} element2 - The member object.
 * @global
 * @requires MemberColors: An object mapping member names to their respective colors.
 * @requires getColorSign: A function that gets the color sign for a member.
 * @requires getInitials: A function that gets the initials of a member's name.
 * @returns {string} HTML markup for the member icon.
 */
function htmlTemplatePopUpMembers(element2) {
  return `<div class="d-flex flex-row"><div class="textWhite contact-icon d-flex justify-content-center align-items-center border rounded-circle p-2 mb-3" style="background-color:${
    MemberColors[getColorSign(element2)]
  }">${getInitials(element2)}</div><div class="bold boardMember-margin">${element2}</div><div>
    `;
}

/**
 * Searches for tasks based on a search term and updates the UI.
 *
 * @function
 * @global
 * @requires renderSearchTodo: A function that filters and renders "to do" tasks.
 * @requires renderSearchInProgress: A function that filters and renders "in progress" tasks.
 * @requires renderSearchAwaitingFeedback: A function that filters and renders "awaiting feedback" tasks.
 * @requires renderSearchDone: A function that filters and renders "done" tasks.
 */
function searchTask() {
  let search = document.getElementById("boardInput").value;
  search = search.toLowerCase();
  renderSearchTodo(search);
  renderSearchInProgress(search);
  renderSearchAwaitingFeedback(search);
  renderSearchDone(search);
}

/**
 * Renders tasks that match the search query within the "to do" status.
 * @param {string} search - The search query.
 */
function renderSearchTodo(search) {
  let stillToDo = userObj.tasks.filter((t) => t["status"] == "to do");
  document.getElementById("todo").innerHTML = "";

  for (let i = 0; i < stillToDo.length; i++) {
    let title = stillToDo[i].titel;
    let description = stillToDo[i].description;
    if (
      title.toLowerCase().includes(search) ||
      description.toLowerCase().includes(search)
    ) {
      const element = stillToDo[i];
      document.getElementById("todo").innerHTML += htmlTemplateToDo(
        element,
        i,
        getPriority(element)
      );

      let idAssigned = document.getElementById(`assignedToDo${i}`);

      idAssigned.innerHTML = "";

      for (let j = 0; j < element["assigned"].length; j++) {
        idAssigned.innerHTML += htmlTemplateAssignment(element, j);
      }
    }
  }
}

/**
 * Renders tasks that match the search query within the "in progress" status.
 * @param {string} search - The search query.
 */
function renderSearchInProgress(search) {
  let stillInProgress = userObj.tasks.filter(
    (t) => t["status"] == "in progress"
  );
  document.getElementById("inProgress").innerHTML = "";

  for (let i = 0; i < stillInProgress.length; i++) {
    let title = stillInProgress[i].titel;
    let description = stillInProgress[i].description;
    if (
      title.toLowerCase().includes(search) ||
      description.toLowerCase().includes(search)
    ) {
      const element = stillInProgress[i];
      document.getElementById("inProgress").innerHTML += htmlTemplateInProgress(
        element,
        i,
        getPriority(element)
      );

      let idAssigned = document.getElementById(`assignedInProgress${i}`);

      idAssigned.innerHTML = "";

      for (let j = 0; j < element["assigned"].length; j++) {
        idAssigned.innerHTML += htmlTemplateAssignment(element, j);
      }
    }
  }
}

/**
 * Renders tasks that match the search query within the "awaiting feedback" status.
 * @param {string} search - The search query.
 */
function renderSearchAwaitingFeedback(search) {
  let stillAwaitingFeedback = userObj.tasks.filter(
    (t) => t["status"] == "awaiting feedback"
  );
  document.getElementById("awaitingFeedback").innerHTML = "";
  for (let i = 0; i < stillAwaitingFeedback.length; i++) {
    let title = stillAwaitingFeedback[i].titel;
    let description = stillAwaitingFeedback[i].description;
    if (
      title.toLowerCase().includes(search) ||
      description.toLowerCase().includes(search)
    ) {
      const element = stillAwaitingFeedback[i];
      document.getElementById("awaitingFeedback").innerHTML +=
        htmlTemplateAwaitingFeedback(element, i, getPriority(element));

      let idAssigned = document.getElementById(`assignedAwaitingFeedback${i}`);

      idAssigned.innerHTML = "";

      for (let j = 0; j < element["assigned"].length; j++) {
        idAssigned.innerHTML += htmlTemplateAssignment(element, j);
      }
    }
  }
}

/**
 * Renders tasks that match the search query within the "done" status.
 * @param {string} search - The search query.
 */
function renderSearchDone(search) {
  let isDone = userObj.tasks.filter((t) => t["status"] == "done");
  document.getElementById("done").innerHTML = "";
  for (let i = 0; i < isDone.length; i++) {
    let title = isDone[i].titel;
    let description = isDone[i].description;
    if (
      title.toLowerCase().includes(search) ||
      description.toLowerCase().includes(search)
    ) {
      const element = isDone[i];
      document.getElementById("done").innerHTML += htmlTemplateDone(
        element,
        i,
        getPriority(element)
      );

      let idAssigned = document.getElementById(`assignedDone${i}`);

      idAssigned.innerHTML = "";

      for (let j = 0; j < element["assigned"].length; j++) {
        idAssigned.innerHTML += htmlTemplateAssignment(element, j);
      }
    }
  }
}

/**
 * Opens the board dialog.
 */
function boardOpenDialog() {
  let openDialog = document.getElementById("boardOpenDialog");
  openDialog.show();
}

/**
 * Edits a specified task.
 * @param {number} i - The index of the task to be edited.
 */
function editTask(i) {
  let currentTask = userObj.tasks[i];
  boardClosePopUpTask();
  openModal(document.querySelector(".modal"));
  let modalFields = getModalFields();
  modalFields.title.value = currentTask.titel;
  modalFields.description.value = currentTask.description;
  toggleCatgoryMenu();
  modalFields.category.innertText = currentTask.category;
}

/**
 * Retrieves the input fields from the modal.
 * @returns {Object} An object containing references to the modal input fields.
 */
function getModalFields() {
  const modalFields = {
    title: document.getElementById("title-input"),
    description: document.getElementById("description-input"),
    category: document.getElementById("category-input"),
    date: document.getElementById("task-date"),
  };
  return modalFields;
}
