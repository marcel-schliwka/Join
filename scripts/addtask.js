let getContacts;
let userObj;
let assigned = [];
let newSubtasks = [];
let subtasks = [];
let currentCategory;
let currentPrio;
let tasks = [];
let categorys = [
  {
    name: "Sales",
    color: "#FC71FF",
  },
  {
    name: "Backoffice",
    color: "#38EAFF",
  },
  {
    name: "Design",
    color: "#FFC701",
  },
];


/**
 * Initialization function. Gets the logged-in user object and renders the contacts, categories, subtasks, and the initials.
 * @function
 */
async function init() {
  userObj = await getLoggedInUser();
  renderContacts();
  renderCategorys();
  renderSubtasks();
  renderTopLogo(userObj);
}


/**
 * Redirects the user to a given URL.
 * @function
 * @param {string} url - The URL to redirect to.
 */
function redirectTo(url) {
  window.location.href = url;
}

/**
 * Displays the board button by removing the "display-none" class.
 */
function showBoardButton() {
  const boardBtn = document.getElementById("board-btn-container");
  boardBtn.classList.remove("display-none");
}

/**
 * Event listener that runs when the DOM content is loaded.
 * It initializes the taskDateInput element.
 * 
 * @event DOMContentLoaded
 */
window.addEventListener("DOMContentLoaded", function () {
  const taskDateInput = document.getElementById("task-date");

  
/**
 * Formats a given date into a string in "YYYY-MM-DD" format.
 * 
 * @param {Date} date - The date object to be formatted.
 * @returns {string} The formatted date string.
 */
  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
  const today = new Date();
  taskDateInput.min = formatDate(today);
});

/**
 * Hides the assigned-to dropdown and removes its border.
 */
function hideAssignedToDropdown() {
  let assignedContainer = document.getElementById("contact-container");
  let assignedInput = document.getElementById("assigned-container");
  assignedContainer.classList.add("display-none");
  assignedInput.classList.remove("remove-border");
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
function addTask() {
  let status = getStatusLocalStorage();
  if (status === null) {
    status = "to do";
  }
  getSubtasks();
  const task = getAddTaskVariables(status);
  userObj.tasks.push(task);
  setItem(userObj.email, JSON.stringify(userObj));
  clearAll();
  showBoardButton();
  spliceStatusLocalStorage();
  setTimeout(function () {
    redirectTo("board.html");
  }, 1000);
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
    status: status,
    category: category.innerText,
    categoryColor: color,
    assigned: assignedTo,
    date: date.value,
    prio: prio,
    subtasks: selectedSubtasks,
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
 * Shows the task modal by removing the "display-none" class and adding the "add-task-template" class.
 */
function showTaskModal() {
  let modal = document.getElementById("addTaskModal");
  modal.classList.remove("display-none");
  modal.classList.add("add-task-template");
}

/**
 * Category Section
 *
 */


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
 * Event listener that updates the background color of the color picker element
 * when a color is picked.
 *
 * @param {Event} event The color pick event.
 */
document.addEventListener("coloris:pick", (event) => {
  document.querySelector(".colorpicker").style.backgroundColor =
    event.detail.color;
});

/**
 * Event listener that updates the background color of the color picker element
 * when the color changes.
 *
 * @param {Event} event The color change event.
 */
document.addEventListener("coloris:change", (event) => {
  document.querySelector(".colorpicker").style.backgroundColor =
    event.detail.color;
});

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
      hiddenError.innerText = !input && !color ? "Oops.. something went wrong" :
        !input ? "You need to type a new category" :
          "You need to pick a color";
      hiddenError.classList.remove("display-none");
    } else {
      hiddenError.innerText = "";
      hiddenError.classList.add("display-none");
      categorys.push({ name: input, color });
      renderCategorys();
      category.innerHTML = generateBasicCategoryInputHTML();
      categoryBtn.innerHTML = generateBasicCategoryButtonHTML();
      category.innerHTML = generateSelectedCategoryHTML(categorys, categorys.length - 1);
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
  const color = document.querySelector(".colorpicker").value;
  const category = document.getElementById("category-input");
  const categoryBtn = document.getElementById("category-button");
  const hiddenError = document.getElementById("hidden-error");
  return { input, color, category, categoryBtn, hiddenError }
}

/**
 * Toggles the display of the category menu.
 * Manages the visibility of the category menu and handles click events to hide the menu when clicking outside.
 */
function toggleCategoryMenu() {
  const category = document.getElementById("renderCategorys");
  const categoryContainer = document.getElementById("category-container");
  const input = document.querySelector(".category-input input");
  category.classList.toggle("display-none");
  category.classList.toggle("category-custom-border");
  categoryContainer.classList.toggle("remove-border");
  if (input === null) {
    document.addEventListener("click", event => {
      if (!categoryContainer.contains(event.target)) {
        addNewCategory();
        category.classList.add("display-none");
        categoryContainer.classList.remove("remove-border");
      }
    });
    category.addEventListener("click", event => {
      event.stopPropagation();
    });
  }
}

/**
 * Renders the list of categories on the page.
 * Clears and replaces the content of the category container with generated category items.
 */
function renderCategorys() {
  let category = document.getElementById("renderCategorys");
  category.innerHTML = "";
  category.innerHTML = generateAddNewCategoryHTML();
  for (let i = 0; i < categorys.length; i++) {
    const cat = categorys[i];
    category.innerHTML += renderCategorysHTML(i, cat);
  }
}

/**
 * Selects a category and updates the category input field.
 * Updates the selected category in the input field, hides the category menu, and removes the border from the category container.
 *
 * @param {number} i - Index of the selected category in the category list.
 */
function useCategory(i) {
  let selection = document.querySelector(".category-input");
  let category = document.getElementById("renderCategorys");
  let categoryContainer = document.getElementById("category-container");
  selection.innerHTML = generateSelectedCategoryHTML(categorys, i);
  currentCategory = selection.innerText;
  category.classList.add("display-none");
  categoryContainer.classList.remove("remove-border");
}

/**
 * ASSIGNED
 */

/**
 * Toggles the display of the assigned contacts menu.
 * Manages the visibility of the assigned contacts menu and handles click events to hide the menu when clicking outside.
 */
function toggleAssigndMenu() {
  const contacts = document.getElementById("contact-container");
  const contactContainer = document.getElementById("assigned-container");
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
 * Renders the list of contacts on the page.
 * Clears and replaces the content of the contacts container with generated contact items.
 */
function renderContacts() {
  let contacts = document.getElementById("renderContacts");
  contacts.innerHTML = "";
  contacts.innerHTML += generateUserAssignedHTML();
  for (let i = 0; i < userObj.contacts.length; i++) {
    const contact = userObj.contacts[i];
    contacts.innerHTML += renderContactsHTML(contact, i);
  }
  contacts.innerHTML += generateAddNewContact();
}

/**
 * SUBTASKS
 */


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
 * Renders the list of subtasks on the page.
 * Clears and replaces the content of the subtask container with generated subtask items.
 */
function renderSubtasks() {
  let content = document.getElementById("subtask-content");
  let buttonContainer = document.getElementById("form-btn-container");
  content.innerHTML = "";
  for (let i = 0; i < subtasks.length; i++) {
    const subt = subtasks[i];
    content.innerHTML += generateNewSubtaskHTML(i, subt);
    let margin = 150;
    let calculatedMargin = margin - 29 * [i + 1];
    margin = calculatedMargin;
    if (margin > 39) {
      buttonContainer.style.marginTop = margin;
    }
  }
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
 * Toggles the state of a subtask checkbox image between checked and unchecked.
 * Changes the image source and attribute of the checkbox based on its current state.
 *
 * @param {number} i - The index of the subtask checkbox image.
 */
function changeSubtaskCheckbox(i) {
  let checkboxImg = document.getElementById(`subtask-checkbox${i}`);
  if (checkboxImg.getAttribute("src") === "./img/checkbox.png") {
    checkboxImg.src = "./img/checkbox_checked.png";
    checkboxImg.setAttribute("checked", "true");
  } else {
    checkboxImg.src = "./img/checkbox.png";
    changeCheckbox.setAttribute("checked", "false");
  }
}

/**
 * Collects selected subtask values from checkboxes.
 * Gathers the text values of selected subtasks based on checked checkboxes.
 */
function getSubtasks() {
  let subtaskCheckboxes = document.querySelectorAll(".subtaskCheckboxImg");
  for (let i = 0; i < subtaskCheckboxes.length; i++) {
    const subCb = subtaskCheckboxes[i];
    const subCbValidation = subCb.getAttribute("checked");
    if (subCbValidation == "true") {
      newSubtasks.push(subCb.parentNode.parentNode.children[1].innerText);
    }
  }
}

/**
 * Helper function Section
 */

/**
 * Switches a container and button to input elements.
 * Clears and replaces the content of a container and button based on their IDs.
 *
 * @param {string} containerId - The ID of the container element to switch to an input.
 * @param {string} buttonId - The ID of the button element associated with the container.
 */
function changeToInput(containerId, buttonId) {
  let cId = document.getElementById(containerId);
  let bId = document.getElementById(buttonId);
  cId.innerHTML = "";
  bId.innerHTML = "";
  if (cId.id.includes("category-input")) {
    cId.innerHTML += generateCategoryInputHTML();
    bId.innerHTML += generateCategoryButtonHTML();
    document.querySelector(".colorpicker").click();
  } else if (cId.id.includes("assigned-input")) {
    cId.innerHTML += generateAssignedInputHTML();
    bId.innerHTML += generateAssigendButtonHTML();
  } else {
    bId.innerHTML += generateSubtaskButtonHTML();
    cId.innerHTML += generateSubtaskInputHTML();
  }
}

/**
 * Clears the value of an input element.
 * Clears the value of the input element associated with the given button element.
 *
 * @param {HTMLElement} element - The button element triggering the input clearing.
 */
function clearInput(element) {
  let input = element.parentNode.parentNode.parentNode.querySelector("input");
  input.value = "";
}

/**
 * Toggles the state of a checkbox image between checked and unchecked.
 * Changes the image source of the checkbox based on its current state.
 *
 * @param {number} i - The index of the checkbox image.
 */
function changeCheckbox(i) {
  let checkboxImg = document.getElementById(`checkboxImg${i}`);
  if (checkboxImg.getAttribute("src") === "./img/checkbox.png") {
    checkboxImg.src = "./img/checkbox_checked.png";
  } else {
    checkboxImg.src = "./img/checkbox.png";
  }
}

/**
 * Clears all input fields and resets priority, subtasks, and category.
 * Clears the values of input fields, resets priority selection, subtasks, and category selection.
 * Also updates the category input and button elements, and triggers rendering of categories and subtasks.
 */
function clearAll() {
  const inputFields = ["title-input", "description-input", "task-date"];
  inputFields.forEach(field => document.getElementById(field).value = "");
  const priorityButtons = ["urgentBtn", "mediumBtn", "lowBtn"];
  priorityButtons.forEach(button => document.getElementById(button).classList.remove(`${button}-active`));
  const priorityImages = ["lowImg", "mediumImg", "urgentImg"];
  priorityImages.forEach(image => document.getElementById(image).src = `./img/prio_${image.replace("Img", "").toLowerCase()}_color.png`);
  document.getElementById("category-input").innerHTML = generateBasicCategoryInputHTML();
  document.getElementById("category-button").innerHTML = generateBasicCategoryButtonHTML();
  currentPrio = undefined;
  subtasks = [];
  newSubtasks = [];
  currentCategory = undefined;
  renderCategorys();
  renderSubtasks();
}

/**
 *
 * This section generates category templates
 *
 * @returns Category HTML-templates
 */

/**
 * Generates HTML markup for a category input element.
 * Creates HTML markup for an input element to enter a new category.
 *
 * @returns {string} The generated HTML markup for the category input element.
 */
function generateCategoryInputHTML() {
  return `
  <div>
    <input id="generatedInput" placeholder="Enter new category" class="ol-none b-none">
  </div>
  `;
}

/**
 * Generates the button elements for the category section.
 * @returns {string} HTML template for the category buttons.
 */
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

/**
 * Generates the dropdown menu option "Add new category" before available categories are rendered.
 * @returns {string} HTML template for the "Add new category" option.
 */
function generateAddNewCategoryHTML() {
  return `
  <div onclick="changeToInput('category-input', 'category-button')" class="category-generated-list font20">
  <li class="font20 category-li-item" >Add new category</li>
  </div>
  `;
}

/**
 * Generates HTML markup for rendering a task category in the category dropdown.
 * Creates HTML markup for a container displaying a task category name along with a colored circle.
 *
 * @param {number} i - The index of the task category.
 * @param {Object} cat - The task category object containing category information.
 * @returns {string} The generated HTML markup for the task category in the category dropdown.
 */
function renderCategorysHTML(i, cat) {
  return `<div class="category-dropdown-items" onclick="useCategory(${i})">
  <li class="font20 category-li-item"">${cat["name"]} <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
  <circle cx="10" cy="10.5" r="9" fill="${cat["color"]}" stroke="white" stroke-width="2" />
</svg></li>
  </div>`;
}

/**
 * Generates HTML markup for a selected task category with color circle.
 * Creates HTML markup for displaying a selected task category name along with a colored circle.
 *
 * @param {Array} categorys - The array of task categories.
 * @param {number} i - The index of the selected category.
 * @returns {string} The generated HTML markup for the selected task category with color circle.
 */
function generateSelectedCategoryHTML(categorys, i) {
  return `<div>
  ${categorys[i]["name"]} <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
  <circle cx="10" cy="10.5" r="9" fill="${categorys[i]["color"]}" stroke="white" stroke-width="2" />
</svg>
  </div>`;
}

/**
 * Generates HTML markup for a basic category selection input placeholder.
 * Creates HTML markup for a placeholder text to indicate selecting a task category.
 *
 * @returns {string} The generated HTML markup for the basic category selection input placeholder.
 */
function generateBasicCategoryInputHTML() {
  return `
  <div class="category-input cursor-p" id="category-input">
  <span>Select task category</span>`;
}

/**
 * Generates HTML markup for a basic category selection button.
 * Creates HTML markup for a button to open the category selection dropdown.
 *
 * @returns {string} The generated HTML markup for the basic category selection button.
 */
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

/**
 * Generates HTML markup for a basic assigned contact input placeholder.
 * Creates HTML markup for a placeholder text to indicate selecting contacts for assignment.
 *
 * @returns {string} The generated HTML markup for the basic assigned contact input placeholder.
 */
function generateBasicAssignedInputHTML() {
  return `<span>Select contacts to assign</span>`;
}

/**
 * Generates HTML markup for a basic assigned contact button container.
 * Creates HTML markup for a container containing a button to open the assigned contacts dropdown.
 *
 * @returns {string} The generated HTML markup for the basic assigned contact button container.
 */
function generateBasicAssignedButtonHTML() {
  return `
  <div class="assigned-button-container" id="assigned-button">
    <button type="button"><img src="./img/arrow_down.png"></button>
  </div>
  `;
}

/**
 * Generates HTML markup for an assigned contact input element.
 * Creates HTML markup for an input element to enter a contact's email for assignment.
 *
 * @returns {string} The generated HTML markup for the assigned contact input element.
 */
function generateAssignedInputHTML() {
  return `
  <div>
    <input required "type="email" id="generatedInput" placeholder="Contact email" class="ol-none b-none">
  </div>
  `;
}

/**
 * Generates HTML markup for assigned contacts action buttons.
 * Creates HTML markup for buttons used to interact with assigned contacts (cancel and confirm).
 *
 * @returns {string} The generated HTML markup for the assigned contacts action buttons.
 */
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

/**
 * Generates HTML markup for rendering the user's own assigned status.
 * Creates HTML markup for a container displaying the user's own assigned status and checkbox.
 *
 * @returns {string} The generated HTML markup for the user's assigned status.
 */
function generateUserAssignedHTML() {
  return `
  <div class="contact-item-container" onclick="changeCheckbox(0)">
    <li class="contact-item">You<a onclick="changeCheckbox(0)"><img class="checkboxImg cursor-p" onclick="changeCheckbox(0)" id="checkboxImg0" src="./img/checkbox.png"></a></li>
  </div>
  `;
}

/**
 * Generates HTML markup for rendering a contact item.
 * Creates HTML markup for a container displaying a contact's name and checkbox.
 *
 * @param {Object} contact - The contact object containing contact information.
 * @param {number} i - The index of the contact.
 * @returns {string} The generated HTML markup for the contact item.
 */
function renderContactsHTML(contact, i) {
  return `
    <div class="contact-item-container" onclick="changeCheckbox(${i + 1})">
      <li class="contact-item">${contact["name"]
    } <a onclick="changeCheckbox(${i + 1
    })"><img class="checkboxImg cursor-p" onclick="changeCheckbox(${i + 1
    })" id="checkboxImg${i + 1}" src="./img/checkbox.png"></a></li>
    </div>
    `;
}

/**
 * Generates HTML markup to add a new contact item.
 * Creates HTML markup for a list item to invite a new contact.
 *
 * @returns {string} The generated HTML markup for the new contact item.
 */
function generateAddNewContact() {
  return `
  <div>
    <li onclick="changeToInput('assigned-input', 'assigned-button'); hideAssignedToDropdown()" class="contact-item">Invite new contact <img id="contact-img" class="cursor-p"src="./img/contacts_black.png"></li>
  </div>
  `;
}

/**
 *
 * This section generates subtask templates
 *
 * @returns Subtask HTML-templates
 */

/**
 * Generates HTML markup for a subtask input element.
 * Creates HTML markup for an input element to enter a new subtask.
 *
 * @returns {string} The generated HTML markup for the subtask input element.
 */
function generateSubtaskInputHTML() {
  return `
    <div>
      <input id="generatedSubtaskInput" placeholder="Enter a new subtask" class="ol-none b-none">
    </div>
    `;
}

/**
 * Generates HTML markup for subtask action buttons.
 * Creates HTML markup for buttons used to interact with subtasks (cancel and confirm).
 *
 * @returns {string} The generated HTML markup for the subtask action buttons.
 */
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

/**
 * Generates HTML markup for a basic subtask input element.
 * Creates HTML markup for an input element to add new subtasks.
 *
 * @returns {string} The generated HTML markup for the subtask input element.
 */
function generateBasicSubtaskInputHTML() {
  return `
  <input onclick="changeToInput('subtasks-input', 'subtasks-button')" class="subtask-input  ol-none" type="text"
  placeholder="Add new subtask">
  `;
}

/**
 * Generates HTML markup for a basic subtask button container.
 * Creates HTML markup for a container containing a button to add new subtasks.
 *
 * @returns {string} The generated HTML markup for the subtask button container.
 */
function generateBasicSubtaskButtonHTML() {
  return `
  <div onclick="changeToInput('subtasks-input', 'subtasks-button')" class="subtasks-button-container" id="subtasks-button">
    <button type="button"><img src="./img/plus_icon.png"></button>
  </div>
  `;
}

/**
 * Generates HTML markup for a new subtask container.
 * Creates HTML markup for a container displaying a subtask checkbox and text.
 *
 * @param {number} i - The index of the subtask.
 * @param {string} subt - The text of the subtask.
 * @returns {string} The generated HTML markup for the subtask container.
 */
function generateNewSubtaskHTML(i, subt) {
  return `
    <div class="generated-subtask-container w-422">
    <div onclick="changeSubtaskCheckbox(${i})"><img checked="false" class="subtaskCheckboxImg" id="subtask-checkbox${i}" src="./img/checkbox.png"></div>
    <div class="font16" id="subtask${i}">${subt}</div>
    </div>
    `;
}
