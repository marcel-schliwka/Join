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
 * Renders the list of categories on the page.
 * Clears and replaces the content of the category container with generated category items.
 */
function renderCategorys() {
  let category = document.getElementById("renderCategorys");
  category.innerHTML = "";
  category.innerHTML = generateAddNewCategoryHTML();
  for (let i = 0; i < userObj.categorys.length; i++) {
    const cat = userObj.categorys[i];
    category.innerHTML += renderCategorysHTML(i, cat);
  }
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
 * Shows the task modal by removing the "display-none" class and adding the "add-task-template" class.
 */
function showTaskModal() {
  let modal = document.getElementById("addTaskModal");
  modal.classList.remove("display-none");
  modal.classList.add("add-task-template");
}
