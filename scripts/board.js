let userObj;

let currentDraggedElement;

async function initBoard() {
  userObj = await getLoggedInUser();
  updateHTML();
}

function updateHTML() {
  renderAllToDos();
  renderAllInProgress();
  renderAllAwaitingFeedback();
  renderAllDone();
}

// --------------- TODO --------------- \\
function renderAllToDos() {
  let stillToDo = userObj.tasks.filter((t) => t["status"] == "to do");

  document.getElementById("todo").innerHTML = "";

  for (let i = 0; i < stillToDo.length; i++) {
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

function getPriority(element) {
  let priority;
  if (element["prio"] == "urgent") {
    priority = '<img class="height40Px" src="./img/prioUrgent.svg">';
  } else if (element["prio"] == "medium") {
    priority = '<img class="height40Px" src="./img/prioMedium.svg">';
  } else {
    priority = '<img class="height40Px" src="./img/prioLow.svg">';
  }
  return priority;
}

function htmlTemplateToDo(element, i, priority) {
  return `<div onclick="boardOpenPopUpTask(${i})" draggable="true" ondragstart="startDragging(${element['id']})" class="bgWhite2 cursorPointer boxShadow border rounded-5 p-2 my-3 d-flex flex-column align-items-start">
            <div class="textWhite border rounded-3 px-3 m-2" style="background-color:grey">
                ${element["category"]}
            </div>
            <div class="mt-2 mx-2 bold">
                ${element["titel"]}
            </div>
            <div class="mx-2 my-1">
                ${element["description"]}
            </div>
            <div class="d-flex justify-content-between mx-2 my-1 w-100 pe-4">
                <div class="d-flex textWhite" id="assignedToDo${i}"></div>
                <div>${priority}</div>
            </div>
        </div>`;
}

function htmlTemplateAssignment(element, j) {
  return `<div class="margin-4 heightWidth45Px d-flex justify-content-center align-items-center border rounded-circle p-2" style="background-color:grey">
            ${getInitials(element["assigned"][j])}
        </div>`;
}

// --------------- IN PROGRESS --------------- \\
function renderAllInProgress() {
  let stillInProgress = userObj.tasks.filter(
    (t) => t["status"] == "in progress"
  );
  document.getElementById("inProgress").innerHTML = "";
  for (let i = 0; i < stillInProgress.length; i++) {
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

function htmlTemplateInProgress(element, i, priority) {
  return `<div onclick="boardOpenPopUpTask(${i})" draggable="true" ondragstart="startDragging(${i}, this)" class="bgWhite2 cursorPointer boxShadow border rounded-5 p-2 my-3 d-flex flex-column align-items-start">
            <div class="textWhite border rounded-3 px-3 m-2" style="background-color:grey">
                ${element["category"]}
            </div>
            <div class="mt-2 mx-2 bold">
                ${element["titel"]}
            </div>
            <div class="mx-2 my-1">
                ${element["description"]}
            </div>
            <div class="d-flex justify-content-between mx-2 my-1 w-100 pe-4">
                <div class="d-flex textWhite" id="assignedInProgress${i}"></div>
                <div>${priority}</div>
            </div>
        </div>`;
}

// --------------- AWAITING FEEDBACK --------------- \\
function renderAllAwaitingFeedback() {
  let stillAwaitingFeedback = userObj.tasks.filter(
    (t) => t["status"] == "awaiting feedback"
  );
  document.getElementById("awaitingFeedback").innerHTML = "";
  for (let i = 0; i < stillAwaitingFeedback.length; i++) {
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

function htmlTemplateAwaitingFeedback(element, i, priority) {
  return `<div onclick="boardOpenPopUpTask(${i})" draggable="true" ondragstart="startDragging(${i}, this)" class="bgWhite2 cursorPointer boxShadow border rounded-5 p-2 my-3 d-flex flex-column align-items-start">
        <div class="textWhite border rounded-3 px-3 m-2" style="background-color:grey">
            ${element["category"]}
        </div>
        <div class="mt-2 mx-2 bold">
            ${element["titel"]}
        </div>
        <div class="mx-2 my-1">
            ${element["description"]}
        </div>
        <div class="d-flex justify-content-between mx-2 my-1 w-100 pe-4">
            <div class="d-flex textWhite" id="assignedAwaitingFeedback${i}"></div>
            <div>${priority}</div>
        </div>
    </div>`;
}

// --------------- DONE --------------- \\
function renderAllDone() {
  let isDone = userObj.tasks.filter((t) => t["status"] == "done");
  document.getElementById("done").innerHTML = "";
  for (let i = 0; i < isDone.length; i++) {
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

function htmlTemplateDone(element, i, priority) {
  return `<div onclick="boardOpenPopUpTask(${i})" draggable="true" ondragstart="startDragging(${i}, this)" class="cursorPointer bgWhite2 boxShadow border rounded-5 p-2 my-3 d-flex flex-column align-items-start">
        <div class="textWhite border rounded-3 px-3 m-2" style="background-color:grey">
            ${element["category"]}
        </div>
        <div class="mt-2 mx-2 bold">
            ${element["titel"]}
        </div>
        <div class="mx-2 my-1">
            ${element["description"]}
        </div>
        <div class="d-flex justify-content-between mx-2 my-1 w-100 pe-4">
            <div class="d-flex textWhite" id="assignedDone${i}"></div>
            <div>${priority}</div>
        </div>
    </div>`;
}

function addTaskWindow(state) {
  let taskForm = document.getElementById("add-task-form");
  let taskContainer = document.querySelector(".add-task-container");
  return state == "close"
    ? taskContainer.classList.remove("show-modal")
    : taskContainer.classList.add("show-modal");
}

function startDragging(id) {
  currentDraggedElement = id;
  element.classList.add("cardMove");
}

function allowDrop(ev) {
  ev.preventDefault();
}

function moveTo(status) {
  userObj.tasks[currentDraggedElement].status = status;
  setTimeout(updateHTML, 0);
}

function boardOpenPopUpTask(i) {
  let element = userObj.tasks[i];
  document.getElementById("popUpBoard").classList.remove("dNone");
  document.getElementById("popUpBoard").innerHTML = "";
  document.getElementById("popUpBoard").innerHTML = htmlTemplatePopUpTask(
    i,
    getThePriority(element)
  );
  document.getElementById("boardTasksMembers").innerHTML = "";
  for (let j = 0; j < element["assigned"].length; j++) {
    const element2 = element["assigned"][j];
    document.getElementById("boardTasksMembers").innerHTML +=
      htmlTemplatePopUpMembers(element2);
  }
}

function boardClosePopUpTask() {
  document.getElementById("popUpBoard").classList.add("dNone");
}

function htmlTemplatePopUpTask(i, priority) {
  return `<div class="popUpBoardTask px-4 pt-4 pb-1 rounded-4 d-flex flex-column align-items-start">
        <img onclick="boardClosePopUpTask()" class="boardTaskClose cursorPointer" src="./img/closeIt.svg" alt="close">
        <div class="boardTaskEdit d-flex">
            <img class="cursorPointer heightWidth35Px" src="./img/deleteButton.svg" alt="delete" onclick="deleteTask(${i})">
            <img class="cursorPointer heightWidth35Px" src="./img/editButton.svg" alt="edit" onclick="editTask(${i})">
        </div>
        <div style="background-color: grey;" class="textWhite px-3 rounded-2">${userObj.tasks[i].category}</div>
        <div class="size3Em bold">${userObj.tasks[i]["titel"]}</div>
        <div class="pb-2">${userObj.tasks[i]["description"]}</div>
        <div class="pb-2 d-flex">
            <div class="pe-3 bold">Due date:</div>
            <div>${userObj.tasks[i]["date"]}</div>
        </div>
        <div class="pb-2 d-flex align-items-center">
            <div class="pe-3 bold">Priority:</div>
            <div>${priority}</div>
        </div>
        <div>
            <div class="pb-3 bold">Assigned to:</div>
            <div id="boardTasksMembers"></div>
        </div>
    </div>`;
}

function deleteTask(i) {
  boardClosePopUpTask();
  userObj.tasks.splice(i, 1);
  setItem(userObj.email, JSON.stringify(userObj));
  updateHTML();
}

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

function htmlTemplatePopUpMembers(element2) {
  return `<div class="textWhite heightWidth45Px d-flex justify-content-center align-items-center border rounded-circle p-2 mb-3" style="background-color:grey">${getInitials(
    element2
  )}</div>
    `;
}

// searchInput.addEventListener("input", (e) => {
//     const value = e.target.value;
//     console.log(value);
// })

function searchTask() {
  let search = document.getElementById("boardInput").value;
  search = search.toLowerCase();
  renderSearchTodo(search);
  renderSearchInProgress(search);
  renderSearchAwaitingFeedback(search);
  renderSearchDone(search);
}

function renderSearchTodo(search) {
  let stillToDo = tasks.filter((t) => t["status"] == "to do");
  debugger;
  document.getElementById("todo").innerHTML = '';

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

function renderSearchInProgress(search) {
  let stillInProgress = tasks.filter((t) => t["status"] == "in progress");
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

function renderSearchAwaitingFeedback(search) {
  let stillAwaitingFeedback = tasks.filter(
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

function renderSearchDone(search) {
  let isDone = tasks.filter((t) => t["status"] == "done");
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

function boardOpenDialog() {
  let openDialog = document.getElementById("boardOpenDialog");
  openDialog.show();
}

function editTask(i) {
  console.log(i);
  let currentTask = userObj.tasks[i];
  boardClosePopUpTask();
  openModal(document.querySelector(".modal"));
  let modalFields = getModalFields();
  console.log(currentTask);
  console.log(modalFields);
  modalFields.title.value = currentTask.titel;
  modalFields.description.value = currentTask.description;
  modalFields.category.innertText = currentTask.category;
}

function getModalFields() {
  const modalFields = {
    title: document.getElementById("title-input"),
    description: document.getElementById("description-input"),
    category: document.getElementById("category-input"),
    date: document.getElementById("task-date"),
  };
  return modalFields;
}

// Add Tasks Function Copys

function addTask() {
  getSubtasks();
  let titel = document.getElementById("title-input").value;
  let description = document.getElementById("description-input").value;
  let date = document.getElementById("task-date").value;
  let prio = currentPrio;
  let color = document
    .querySelector(".category-input circle")
    .getAttribute("fill");
  if (prio == undefined) {
    prio = "low";
  }
  let assignedTo = assigned;
  let category = document.querySelector(".category-input").innerText;
  let selectedSubtasks = newSubtasks;

  let newTask = {
    titel: titel,
    description: description,
    status: "to do",
    category: category,
    categoryColor: color,
    assigned: assignedTo,
    date: date,
    prio: prio,
    subtasks: selectedSubtasks,
  };
  // addtasks.push(newTask);
  userObj.tasks.push(newTask);
  setItem(localStorage.getItem("activeUser"), JSON.stringify(userObj));
}

function setDate() {
  let newDate = new Date();
  console.log(newDate);
}

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

function clearCategory() {
  let category = document.getElementById("category-input");
  let categoryBtn = document.getElementById("category-button");
  category.innerHTML = generateBasicCategoryInputHTML();
  categoryBtn.innerHTML = generateBasicCategoryButtonHTML();
}

/**
 * This eventslistener change the color inside the HTML when a color gets selected
 */
document.addEventListener("coloris:pick", (event) => {
  document.querySelector(".colorpicker").style.backgroundColor =
    event.detail.color;
});

document.addEventListener("coloris:change", (event) => {
  document.querySelector(".colorpicker").style.backgroundColor =
    event.detail.color;
});

function addNewCategory() {
  let input = document.getElementById("generatedInput").value;
  let color = document.querySelector(".colorpicker").value;
  let category = document.getElementById("category-input");
  let categoryBtn = document.getElementById("category-button");
  let hiddenError = document.getElementById("hidden-error");

  if (input == "" && color == "") {
    hiddenError.innerText = "Oops.. something went wrong";
    hiddenError.classList.remove("d-none");
  } else if (input == "") {
    hiddenError.innerText = "You need to type a new category";
    hiddenError.classList.remove("d-none");
  } else if (color == "") {
    hiddenError.innerText = "You need to pick a color";
    hiddenError.classList.remove("d-none");
  } else {
    hiddenError.innerText = "";
    hiddenError.classList.add("d-none");
    categorys.push({
      name: input,
      color: color,
    });
    renderCategorys();
    category.innerHTML = generateBasicCategoryInputHTML();
    categoryBtn.innerHTML = generateBasicCategoryButtonHTML();
    let index = categorys.length;
    category.innerHTML = generateSelectedCategoryHTML(categorys, index - 1);
  }
}

function toggleCatgoryMenu() {
  let category = document.getElementById("renderCategorys");
  let categoryContainer = document.getElementById("category-container");
  let input = document.querySelector(".category-input input");
  category.classList.toggle("d-none");
  categoryContainer.classList.toggle("remove-border");
  if (input !== null) {
    categoryContainer.classList.remove("remove-border");
    category.classList.add("d-none");
  } else {
    document.addEventListener("click", (event) => {
      if (!categoryContainer.contains(event.target)) {
        category.classList.add("d-none");
        categoryContainer.classList.remove("remove-border");
      }
    });
    category.addEventListener("click", (event) => {
      event.stopPropagation();
    });
  }
}

function renderCategorys() {
  let category = document.getElementById("renderCategorys");
  category.innerHTML = "";
  category.innerHTML = generateAddNewCategoryHTML();

  for (let i = 0; i < categorys.length; i++) {
    const cat = categorys[i];
    category.innerHTML += renderCategorysHTML(i, cat);
  }
}

function useCategory(i) {
  let selection = document.querySelector(".category-input");
  let category = document.getElementById("renderCategorys");
  let categoryContainer = document.getElementById("category-container");
  selection.innerHTML = generateSelectedCategoryHTML(categorys, i);
  currentCategory = selection.innerText;
  category.classList.add("d-none");
  categoryContainer.classList.remove("remove-border");
}

/**
 * ASSIGNED
 */

function toggleAssigndMenu() {
  let contacts = document.getElementById("contact-container");
  let contactContainer = document.getElementById("assigned-container");
  let input = document.querySelector(".assigned-input input");
  contacts.classList.toggle("d-none");
  contactContainer.classList.toggle("remove-border");

  if (input !== null) {
    contacts.classList.add("d-none");
    contactContainer.classList.remove("remove-border");
  } else {
    document.addEventListener("click", (event) => {
      if (!contactContainer.contains(event.target)) {
        contacts.classList.add("d-none");
        contactContainer.classList.remove("remove-border");
      }
    });
    contacts.addEventListener("click", (event) => {
      event.stopPropagation();
    });
  }
}

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

function renderContacts() {
  let contacts = document.getElementById("renderContacts");
  contacts.innerHTML = "";
  contacts.innerHTML += generateUserAssignedHTML();

  for (let i = 0; i < userObj.contacts.length; i++) {
    const contact = userObj.contacts[i];
    console.log(contact);
    contacts.innerHTML += renderContactsHTML(contact, i);
  }

  contacts.innerHTML += generateAddNewContact();
}

/**
 * SUBTASKS
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

function changeToSubtask() {
  let subtasksInput = document.getElementById("subtasks-input");
  let subtasksBtn = document.getElementById("subtasks-button");
  subtasksInput.innerHTML = generateBasicSubtaskInputHTML();
  subtasksBtn.innerHTML = generateBasicSubtaskButtonHTML();
}

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
 *
 * @param {id} containerId
 * @param {id} buttonId
 * This function gets the id from the input-container && button-container
 * according to the clicked container the new input field & buttons get generated
 *
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
 *
 * This function gets the id from an input-field and gets called via onclick
 * onclick the input field gets emptied
 *
 * @param {id} element
 */
function clearInput(element) {
  let input = element.parentNode.parentNode.parentNode.querySelector("input");
  input.value = "";
}

/**
 *
 * This function gets the id from the checkbox-images.
 * Onclick the src gets changed to show a checked checkbox
 * @param {integer} i
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
 * This function gets called, when clicked on the Clear-Button
 * If clicked, it clears the Arrays Subtasks and deletes the current Category
 *
 */
function clearAll() {
  const categoryContainer = document.getElementById("category-input");
  const categoryBtn = document.getElementById("category-button");
  document.getElementById("urgentBtn").classList.remove("urgent-active");
  document.getElementById("mediumBtn").classList.remove("medium-active");
  document.getElementById("lowBtn").classList.remove("low-active");
  categoryContainer.innerHTML = generateBasicCategoryInputHTML();
  categoryBtn.innerHTML = generateBasicCategoryButtonHTML();
  currentPrio;
  subtasks = [];
  newSubtasks = [];
  currentCategory;
  renderCategorys();
  renderSubtasks();
}

/**
 *
 * This section generates category templates
 *
 * @returns Category HTML-templates
 */

//Generates the input field, when clicked on "Add new Category"
function generateCategoryInputHTML() {
  return `
  <div>
    <input id="generatedInput" placeholder="Enter new category" class="ol-none b-none">
  </div>
  `;
}

//Generates the new buttons, when clicked on "Add new Category"
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

//Generates the dropdown menu option "Add new category" before the aviable categorys gets renderd
function generateAddNewCategoryHTML() {
  return `
  <div onclick="changeToInput('category-input', 'category-button')" class="category-generated-list font20">
  <li class="font20 category-li-item" >Add new category</li>
  </div>
  `;
}

//Generates new HTML for rendering the aviable categorys + the newly added one
function renderCategorysHTML(i, cat) {
  return `<div class="category-dropdown-items" onclick="useCategory(${i})">
  <li class="font20 category-li-item"">${cat["name"]} <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
  <circle cx="10" cy="10.5" r="9" fill="${cat["color"]}" stroke="white" stroke-width="2" />
</svg></li>
  </div>`;
}

//If a Category gets selected, the category gets written in the innerText from the category dropdown menu
function generateSelectedCategoryHTML(categorys, i) {
  return `<div>
  ${categorys[i]["name"]} <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
  <circle cx="10" cy="10.5" r="9" fill="${categorys[i]["color"]}" stroke="white" stroke-width="2" />
</svg>
  </div>`;
}

//Generates the basic input field for categorys, from the HTML
function generateBasicCategoryInputHTML() {
  return `
  <div class="category-input cursor-p" id="category-input">
  <span>Select task category</span>`;
}

//Generates the basic button for categorys, from the HTML
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

function generateBasicAssignedInputHTML() {
  return `<span>Select contacts to assign</span>`;
}

function generateBasicAssignedButtonHTML() {
  return `
  <div class="assigned-button-container" id="assigned-button">
    <button type="button"><img src="./img/arrow_down.png"></button>
  </div>
  `;
}

//Generates the input field, when clicked on "Invite new contact"
function generateAssignedInputHTML() {
  return `
  <div>
    <input "type="email" id="generatedInput" placeholder="Contact email" class="ol-none b-none">
  </div>
  `;
}

//Generates the buttons, when clicked on "Invite new contact"
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

//Generates the User option, when the dropdown menu "Assigned to" (You) gets opend
function generateUserAssignedHTML() {
  return `
  <div class="contact-item-container">
    <li class="contact-item">You<a onclick="changeCheckbox(0)"><img class="checkboxImg cursor-p" id="checkboxImg0" src="./img/checkbox.png"></a></li>
  </div>
  `;
}

//Generates new HTML for rendering the aviable contacts + the newly added one
function renderContactsHTML(contact, i) {
  return `
    <div class="contact-item-container">
      <li class="contact-item">${contact["name"]} <a onclick="changeCheckbox(${
    i + 1
  })"><img class="checkboxImg cursor-p" id="checkboxImg${
    i + 1
  }" src="./img/checkbox.png"></a></li>
    </div>
    `;
}

//Generates the input field, when clicked on "Invite new contact" to insert a new User Mail
function generateAddNewContact() {
  return `
  <div>
    <li onclick="changeToInput('assigned-input', 'assigned-button'); hideAssignedToDropdown()" class="contact-item">Invite new contact <img class="cursor-p"src="./img/contacts_black.png"></li>
  </div>
  `;
}

/**
 *
 * This section generates subtask templates
 *
 * @returns Subtask HTML-templates
 */

//Generates the input field, when clicked on "Add new subtask"
function generateSubtaskInputHTML() {
  return `
    <div>
      <input id="generatedSubtaskInput" placeholder="Enter a new subtask" class="ol-none b-none">
    </div>
    `;
}

//Generates the new buttons inside the input field, when clicked on "Add new subtask"
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

//Generates the basic-styled "Add new subtask" input field (from html), when new subtask was added
function generateBasicSubtaskInputHTML() {
  return `
  <input onclick="changeToInput('subtasks-input', 'subtasks-button')" class="subtask-input  ol-none" type="text"
  placeholder="Add new subtask">
  `;
}

//Generates the basic-styled "Add new subtask" buttons (from html), when new subtask was added
function generateBasicSubtaskButtonHTML() {
  return `
  <div class="subtasks-button-container" id="subtasks-button">
    <button type="button"><img src="./img/plus_icon.png"></button>
  </div>
  `;
}

//Generates new HTML for rendering the newly added subtasks
function generateNewSubtaskHTML(i, subt) {
  return `
    <div class="generated-subtask-container w-422">
    <div onclick="changeSubtaskCheckbox(${i})"><img checked="false" class="subtaskCheckboxImg" id="subtask-checkbox${i}" src="./img/checkbox.png"></div>
    <div class="font16" id="subtask${i}">${subt}</div>
    </div>
    `;
}
