let taskToEdit;
let editedTaskIndex;
function getIndexFromURL() {
  try {
    const params = new URLSearchParams(window.location.search);
    let data = params.get("index");

    if (data !== null && !isNaN(Number(data))) {
      let index = Number(data);
      editedTaskIndex = index;
      taskToEdit = userObj["tasks"][index];
      return taskToEdit;
    }

    return false;
  } catch (e) {
    return false;
  }
}

function checkIfEditTask() {
  let taskToEdit = getIndexFromURL();
  if (taskToEdit) {
    startEventListenerEditTask();
    changeInputs(taskToEdit);
  } else {
    startEventListenerAddTask();
    return false;
  }
}

function changeInputs(taskToEdit) {
  let inputs = getInputs();
  inputs.title.value = taskToEdit.titel;
  inputs.description.value = taskToEdit.description;
  inputs.date.value = taskToEdit.date;
  inputs.headline.innerText = "Edit Task";
  changePriority(taskToEdit);
  inputs.submitBtn.innerHTML = changeSubmitBtn();
  inputs.submitBtnResp.innerHTML = changeSubmitBtn();
  inputs.categoryContainer.remove();
  inputs.categoryLabel.remove();
  loadSubtasks();
  loadAssignedContacts();
}

function getInputs() {
  let addTaskInputs = {
    title: document.getElementById("title-input"),
    headline: document.getElementById("addTaskHeadline"),
    description: document.getElementById("description-input"),
    date: document.getElementById("task-date"),
    submitBtnResp: document.getElementById("submit-btn-responsive"),
    submitBtn: document.getElementById("submit-btn-web"),
    taskForm: document.getElementById("task-form"),
    categoryLabel: document.getElementById("category-label"),
    categoryContainer: document.getElementById("category-container"),
  };
  return addTaskInputs;
}

function changePriority(taskToEdit) {
  let priority = taskToEdit.prio;
  if (priority == "urgent") {
    getTaskPrio(document.getElementById("urgentBtn"), "urgent");
  }

  if (priority == "medium") {
    getTaskPrio(document.getElementById("mediumBtn"), "medium");
  }

  if (priority == "low") {
    getTaskPrio(document.getElementById("lowBtn"), "low");
  }
}

function changeSubmitBtn() {
  return `Edit <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
    <path d="M4.0166 12.1704L10.0166 18.1704L20.0166 6.17041" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
  </svg>`;
}

async function saveEditedTask() {
  let userMail = userObj.email;
  let inputs = getInputs();
  userObj.tasks[editedTaskIndex].titel = inputs.title.value;
  userObj.tasks[editedTaskIndex].description = inputs.description.value;
  userObj.tasks[editedTaskIndex].prio = getEditedPrio();
  userObj.tasks[editedTaskIndex].date = inputs.date.value;
  saveEditedContacts();
  saveEditedSubtasks();
  await setItem(userMail, JSON.stringify(userObj));
  showTopDown("Task edited");
  redirectToBoardAfterDelay();
}

function loadSubtasks() {
  taskToEdit.subtasks.forEach((task) => {
    subtasks.push(task.title);
  });
  renderSubtasks();
}

function loadAssignedContacts() {
  taskToEdit.assigned.forEach((contact) => {
    assigned.push(contact);
    document.querySelectorAll(".contact-item").forEach((item) => {
      let itemText = item.innerText.trim();
      if (itemText == contact) {
        item
          .querySelector(".checkboxImg")
          .setAttribute("src", "./img/checkbox_checked.png");
      }
    });
  });
}

function getEditedPrio() {
  if (document.querySelector(".low-active")) {
    return "low";
  }
  if (document.querySelector(".medium-active")) {
    return "medium";
  }
  if (document.querySelector(".urgent-active")) {
    return "urgent";
  }
}

function saveEditedContacts() {
  userObj.tasks[editedTaskIndex].assigned = [];
  document.querySelectorAll(".contact-item").forEach((item) => {
    let itemText = item.innerText.trim();
    let checkboxImg = item.querySelector(".checkboxImg");
    if (checkboxImg.getAttribute("src") == "./img/checkbox_checked.png") {
      userObj.tasks[editedTaskIndex].assigned.push(itemText);
    }
  });
}

function saveEditedSubtasks() {
  userObj.tasks[editedTaskIndex].subtasks = [];
  document.querySelectorAll(".subtask-text").forEach((subtaskText) => {
    let editedSubtask = {
      title: subtaskText.innerText,
      property: "unchecked",
    };
    userObj.tasks[editedTaskIndex].subtasks.push(editedSubtask);
  });
}
