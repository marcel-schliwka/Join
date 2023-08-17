let getContacts;
let userObj;
let assigned = [];
let subtasks = [];
let currentCategory;
let currentPrio;
let tasks = [];

/**
 * Initialization function. Gets the logged-in user object and renders the contacts, categories, subtasks, and the initials.
 * @function
 */
async function init() {
  showLoadingScreen();
  userObj = await getLoggedInUser();
  checkIfEditTask();
  renderContacts();
  renderCategorys();
  renderSubtasks();
  renderTopLogo(userObj);
  deleteLoadingScreen();
}

/**
 * Edits a subtask's content and toggles its editing interface.
 * @param {number} index - The index of the subtask to be edited.
 */
function editSubtask(index) {
  const subtask = document.getElementById(`subtask-text${index}`);
  const btnContainer = document.getElementById(
    `subtaskButtonsContainer${index}`
  );
  const container = document.getElementById(`listItem${index}`);
  const subtaskCircle = document.getElementById(`subtaskCircle${index}`);
  container.classList.toggle("no-hover");
  subtaskCircle.classList.add("display-none");
  btnContainer.style.display =
    btnContainer.style.display === "none" ? "flex" : "none";
  const editedSubtaskInput = generateEditSubtaskInput(subtask.innerText, index);
  subtask.innerHTML = editedSubtaskInput;
}

/**
 * Deletes a subtask at the specified index and updates the subtasks list.
 * @param {number} index - The index of the subtask to be deleted.
 */
function deleteSubtask(index) {
  subtasks.splice(index, 1);
  renderSubtasks();
}

/**
 * Accepts the edited content of a subtask and updates the subtasks list.
 * @param {number} index - The index of the subtask to be edited.
 */
function acceptEditedSubtask(index) {
  let input = document.getElementById(`editedSubtask-input${index}`);
  subtasks[index] = input.value;
  renderSubtasks();
}

/**
 * Clears the assigned contacts input and resets the assigned contacts button.
 */
function clearAssigned() {
  let assignedInput = document.getElementById("assigned-input");
  let assignedBtn = document.getElementById("assigned-button");
  assignedInput.innerHTML = generateBasicAssignedInputHTML();
  assignedBtn.innerHTML = generateBasicAssignedButtonHTML();
}

/**
 * Adds a new task to the user's tasks list and redirects to the board page.
 */
async function addTask() {
  if (checkIfCategoryIsSelected()) {
    document.getElementById("submit-btn-web").disabled = true;
    document.getElementById("submit-btn-responsive").disabled = true;
    const status = getStatusLocalStorage() || "to do";
    const task = await createTask(status);
    userObj.tasks.push(task);
    setItem(userObj.email, JSON.stringify(userObj));
    spliceStatusLocalStorage();
    clearAll();
    showBoardButtonIfNeeded();
    showTopDown("Task created");
    redirectToBoardAfterDelay();
  } else {
    error = document.getElementById("hidden-error");
    error.classList.remove("display-none");
    error.innerText = "Please select a category";
  }
}

/**
 * Checks if a category is selected based on the presence and color of a category circle element.
 *
 * @function
 * @returns {boolean} Returns `true` if a category is selected, `false` otherwise.
 */
function checkIfCategoryIsSelected() {
  const categoryCircle = document.querySelector(".category-input circle");
  if (!categoryCircle || categoryCircle.getAttribute("fill") === null) {
    return false;
  } else {
    return true;
  }
}

/**
 * Creates a new task object based on the provided status.
 * Retrieves subtasks and task variables using helper functions to construct the new task object.
 *
 * @param {string} status - The status of the new task ("to do", "in progress", "awaiting feedback", or "done").
 * @returns {Object} The new task object containing task details.
 */
async function createTask(status) {
  getSubtasks();
  const taskVariables = getAddTaskVariables(status);
  return taskVariables;
}

/**
 * Shows the "Board" button if the current page is the "addtask" page.
 * Checks if the current page's site name is "addtask" and then calls the function to show the "Board" button.
 */
function showBoardButtonIfNeeded() {
  if (getSiteName() === "addtask") {
    showBoardButton();
  }
}

/**
 * Redirects to the "board.html" page after a specified delay.
 * Uses a setTimeout function to delay the redirection to the "board.html" page by 2000 milliseconds (2 seconds).
 */
function redirectToBoardAfterDelay() {
  setTimeout(function () {
    redirectTo("board.html");
  }, 2000);
}

/**
 * Retrieves task-related variables to create a new task object.
 * @param {string} status - The status of the new task ("to do", "in progress", "awaiting feedback", or "done").
 * @returns {Object} - The new task object containing task details.
 */
function getAddTaskVariables(status) {
  let titel = document.getElementById("title-input");
  let description = document.getElementById("description-input");
  let date = document.getElementById("task-date");
  let category = document.querySelector(".category-input");
  getAssignedContacts();
  let assignedTo = assigned;
  let subtaskTexts = getSubtasks();
  let newSubtasks = subtaskTexts.map((subtaskTitle) => ({
    title: subtaskTitle,
    property: "unchecked",
  }));
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
    status: status,
    category: category.innerText,
    categoryColor: color,
    assigned: assignedTo,
    date: date.value,
    prio: prio,
    subtasks: newSubtasks,
    id: userObj.tasks.length,
  };
  return newTask;
}

/**
 * Updates the task priority and visuals based on the provided button and priority.
 * @param {HTMLElement} button - The button element representing the selected priority.
 * @param {string} priority - The priority value ("low", "medium", or "urgent").
 */

function getTaskPrio(button, priority) {
  const buttons = document.querySelectorAll(".prioBtn");
  let images = {
    low: document.getElementById("lowImg"),
    medium: document.getElementById("mediumImg"),
    urgent: document.getElementById("urgentImg"),
  };
  buttons.forEach(function (btn) {
    if (btn.classList.contains(priority + "-active")) {
      btn.classList.remove(priority + "-active");
      currentPrio;
    } else if (btn !== button) {
      btn.classList.remove("low-active", "medium-active", "urgent-active");
      lowImg.src = "./img/prio_low_color.png";
      mediumImg.src = "./img/prio_medium_color.png";
      urgentImg.src = "./img/prio_urgent_color.png";
    }
  });
  button.classList.add(priority + "-active");
  images[priority].src = `./img/prio_${priority}.png`;
  currentPrio = priority;
}

/**
 * Clears the selected category input and button content.
 */
function clearCategory() {
  let category = document.getElementById("category-input");
  let categoryBtn = document.getElementById("category-button");
  category.innerHTML = generateBasicCategoryInputHTML();
  categoryBtn.innerHTML = generateBasicCategoryButtonHTML();
}

/**
 * Checks if the category input element exists in the DOM.
 *
 * @returns {HTMLElement|null} Returns the category input element if found, otherwise returns null.
 */

function checkIfCategoryInputExists() {
  return document.getElementById("generatedInput");
}

/**
 * Adds a new category to the list of categories.
 * Validates input and color, updates UI, and displays error messages if needed.
 *
 * @returns {boolean} Returns false if an error occurs during execution.
 */
function addNewCategory() {
  try {
    const categoryVar = getCategoryVaraible();
    const { input, color, hiddenError, category, categoryBtn } = categoryVar;
    if (!input || !color) {
      hiddenError.innerText =
        !input && !color
          ? "Oops.. something went wrong"
          : !input
          ? "You need to type a new category"
          : "You need to pick a color";
      hiddenError.classList.remove("display-none");
    } else {
      hiddenError.innerText = "";
      hiddenError.classList.add("display-none");
      categorys.push({ name: input, color });
      renderCategorys();
      category.innerHTML = generateBasicCategoryInputHTML();
      categoryBtn.innerHTML = generateBasicCategoryButtonHTML();
      category.innerHTML = generateSelectedCategoryHTML(
        categorys,
        categorys.length - 1
      );
    }
  } catch (error) {
    return false;
  }
}

/**
 * Retrieves various category-related variables from the DOM.
 *
 * @returns {Object} An object containing input, color, category, categoryBtn, and hiddenError elements.
 */
function getCategoryVaraible() {
  const input = document.getElementById("generatedInput").value;
  const color = document.querySelector(".circle-picker").value;
  const category = document.getElementById("category-input");
  const categoryBtn = document.getElementById("category-button");
  const hiddenError = document.getElementById("hidden-error");
  return { input, color, category, categoryBtn, hiddenError };
}

/**
 * Collects assigned contacts based on checked checkboxes.
 * Gathers the names of assigned contacts based on checked checkbox images.
 */
function getAssignedContacts() {
  let test = document.querySelectorAll(".checkboxImg");
  for (let i = 0; i < test.length; i++) {
    const t = test[i];
    const source = t["currentSrc"];
    if (source.includes("/img/checkbox_checked.png")) {
      let index = i - 1;
      if (index == -1) {
        assigned.push(userObj.name);
      } else {
        assigned.push(userObj["contacts"][index]["name"]);
      }
    }
  }
}

/**
 * Adds a new subtask to the subtasks array and re-renders the subtask list.
 * Retrieves the input value, adds it to the subtasks array, and updates the rendered subtask list.
 * Resets the subtask input container and button to their basic state.
 */
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

/**
 * Switches subtask container and button to basic subtask input and button.
 * Clears and replaces the content of subtask input container and button with basic elements.
 */
function changeToSubtask() {
  let subtasksInput = document.getElementById("subtasks-input");
  let subtasksBtn = document.getElementById("subtasks-button");
  subtasksInput.innerHTML = generateBasicSubtaskInputHTML();
  subtasksBtn.innerHTML = generateBasicSubtaskButtonHTML();
}

/**
 * Collects selected subtask values from checkboxes.
 * Gathers the text values of selected subtasks based on checked checkboxes.
 */

function getSubtasks() {
  const subtaskItems = document.querySelectorAll("#subtask-content li");
  const subtaskTexts = [];
  subtaskItems.forEach((item) => {
    const text = item.innerText.trim();
    subtaskTexts.push(text);
  });
  return subtaskTexts;
}
