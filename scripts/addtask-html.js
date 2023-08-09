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
  