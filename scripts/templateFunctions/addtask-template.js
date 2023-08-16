/**
 * Generates HTML markup for a category input element.
 * Creates HTML markup for an input element to enter a new category.
 *
 * @returns {string} The generated HTML markup for the category input element.
 */
function generateCategoryInputHTML() {
  return `
    <div>
      <input onkeydown="handleKeyPress(event, clearCategory, addNewCategory)" maxlength="9" id="generatedInput" placeholder="Enter new category" class="ol-none b-none">
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
    <input type="color" class="circle-picker" id="color-picker">
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
        <li class="contact-item">${
          contact["name"]
        } <a onclick="changeCheckbox(${
    i + 1
  })"><img class="checkboxImg cursor-p" onclick="changeCheckbox(${
    i + 1
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
  <div class="d-flex justify-content-center custom-contact-button-task">
    <button type="button" class="fw-bold custom-lh-120 custom-btn d-flex align-items-center w-100 ml-35 h-48" onclick="openCreateContact()">
      <span class="custom-fs-21">New contact</span>
      <img src="./img/icon_add_contact.png" alt="">
    </button>
  </div>
  `;
}

/**
 * Generates HTML markup for a subtask input element.
 * Creates HTML markup for an input element to enter a new subtask.
 *
 * @returns {string} The generated HTML markup for the subtask input element.
 */
function generateSubtaskInputHTML() {
  return `
      <div>
        <input onkeydown="handleKeyPress(event, addSubtask, changeToSubtask)" id="generatedSubtaskInput" placeholder="Enter a new subtask" class="ol-none b-none">
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
  <li id="listItem${i}">
    <div class="d-flex justify-content-between align-items-center w-100">

      <div class="font16 w-230 ov-scroll subtask-item" id="subtask${i}">
      
        <div class="d-flex align-items-center">
          <svg id="subtaskCircle${i}" class="subtask-circle" xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10">
            <circle cx="5" cy="5" r="5" fill="black" />
          </svg>
          <div id="subtask-text${i}" class="ml-15">${subt}</div>
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
          <svg onclick="deleteSubtask(${i})" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none">
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

function generateEditSubtaskInput(placeholder, index) {
  return `
  <div class="d-flex">
    <input class="subtask-edit-input" id="editedSubtask-input${index}" value="${placeholder}"> 
    <div class="subtask-edit-input-svg">
      <svg onclick="renderSubtasks()" xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
        <mask id="mask0_75601_14824" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="25" height="24">
        <rect x="0.144531" width="24" height="24" fill="#D9D9D9"/>
        </mask>
        <g mask="url(#mask0_75601_14824)">
        <path d="M7.14453 21C6.59453 21 6.1237 20.8042 5.73203 20.4125C5.34036 20.0208 5.14453 19.55 5.14453 19V6C4.8612 6 4.6237 5.90417 4.43203 5.7125C4.24036 5.52083 4.14453 5.28333 4.14453 5C4.14453 4.71667 4.24036 4.47917 4.43203 4.2875C4.6237 4.09583 4.8612 4 5.14453 4H9.14453C9.14453 3.71667 9.24036 3.47917 9.43203 3.2875C9.6237 3.09583 9.8612 3 10.1445 3H14.1445C14.4279 3 14.6654 3.09583 14.857 3.2875C15.0487 3.47917 15.1445 3.71667 15.1445 4H19.1445C19.4279 4 19.6654 4.09583 19.857 4.2875C20.0487 4.47917 20.1445 4.71667 20.1445 5C20.1445 5.28333 20.0487 5.52083 19.857 5.7125C19.6654 5.90417 19.4279 6 19.1445 6V19C19.1445 19.55 18.9487 20.0208 18.557 20.4125C18.1654 20.8042 17.6945 21 17.1445 21H7.14453ZM7.14453 6V19H17.1445V6H7.14453ZM9.14453 16C9.14453 16.2833 9.24036 16.5208 9.43203 16.7125C9.6237 16.9042 9.8612 17 10.1445 17C10.4279 17 10.6654 16.9042 10.857 16.7125C11.0487 16.5208 11.1445 16.2833 11.1445 16V9C11.1445 8.71667 11.0487 8.47917 10.857 8.2875C10.6654 8.09583 10.4279 8 10.1445 8C9.8612 8 9.6237 8.09583 9.43203 8.2875C9.24036 8.47917 9.14453 8.71667 9.14453 9V16ZM13.1445 16C13.1445 16.2833 13.2404 16.5208 13.432 16.7125C13.6237 16.9042 13.8612 17 14.1445 17C14.4279 17 14.6654 16.9042 14.857 16.7125C15.0487 16.5208 15.1445 16.2833 15.1445 16V9C15.1445 8.71667 15.0487 8.47917 14.857 8.2875C14.6654 8.09583 14.4279 8 14.1445 8C13.8612 8 13.6237 8.09583 13.432 8.2875C13.2404 8.47917 13.1445 8.71667 13.1445 9V16Z" fill="#2A3647"/>
        </g>
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" width="2" height="24" viewBox="0 0 2 24" fill="none">
        <path d="M1.14453 0V24" stroke="#A8A8A8"/>
      </svg>
      <svg onclick="acceptEditedSubtask(${index})" xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
        <mask id="mask0_75601_14826" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="25" height="24">
        <rect x="0.144531" width="24" height="24" fill="#D9D9D9"/>
        </mask>
        <g mask="url(#mask0_75601_14826)">
        <path d="M9.69474 15.15L18.1697 6.675C18.3697 6.475 18.6072 6.375 18.8822 6.375C19.1572 6.375 19.3947 6.475 19.5947 6.675C19.7947 6.875 19.8947 7.1125 19.8947 7.3875C19.8947 7.6625 19.7947 7.9 19.5947 8.1L10.3947 17.3C10.1947 17.5 9.96141 17.6 9.69474 17.6C9.42807 17.6 9.19474 17.5 8.99474 17.3L4.69474 13C4.49474 12.8 4.3989 12.5625 4.40724 12.2875C4.41557 12.0125 4.51974 11.775 4.71974 11.575C4.91974 11.375 5.15724 11.275 5.43224 11.275C5.70724 11.275 5.94474 11.375 6.14474 11.575L9.69474 15.15Z" fill="#2A3647"/>
        </g>
      </svg>
    </div>
  </div>
  `;
}
