function getBase64String() {
  try {
    const params = new URLSearchParams(window.location.search);
    const data = params.get("data");
    const decodedString = atob(data);
    const taskToEdit = JSON.parse(decodedString);
    return taskToEdit;
  } catch (e) {
    return false;
  }
}

function checkIfEditTask() {
  let taskToEdit = getBase64String();
  if (taskToEdit) {
    changeInputs(taskToEdit);
  } else {
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
  changeCategoryOnEdit(taskToEdit);
  inputs.submitBtn.innerHTML = changeSubmitBtn();
  inputs.submitBtnResp.innerHTML = changeSubmitBtn();
}

function getInputs() {
  let addTaskInputs = {
    title: document.getElementById("title-input"),
    headline: document.getElementById("addTaskHeadline"),
    description: document.getElementById("description-input"),
    date: document.getElementById("task-date"),
    submitBtnResp: document.getElementById("submit-btn-responsive"),
    submitBtn: document.getElementById("submit-btn-web"),
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

function changeCategoryOnEdit(taskToEdit) {}

function changeSubmitBtn() {
  return `Edit <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
    <path d="M4.0166 12.1704L10.0166 18.1704L20.0166 6.17041" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
  </svg>`;
}
