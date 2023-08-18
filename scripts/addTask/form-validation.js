const taskForm = document.getElementById("task-form");
const titleInput = document.getElementById("title-input");
const descriptionInput = document.getElementById("description-input");
const taskDateInput = document.getElementById("task-date");

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  validateInputs();
});

function validateInputs() {
  const titelValue = titleInput.value.trim();
  const descriptionValue = descriptionInput.value.trim();
  const dateValue = taskDateInput.value.trim();

  const titleValidated = checkValues(titelValue, titleInput);
  const descriptionValidated = checkValues(descriptionValue, descriptionInput);
  const dateValidated = checkValues(dateValue, taskDateInput);
  allValidated(titleValidated, descriptionValidated, dateValidated);
}

function checkValues(value, element) {
  if (value == "") {
    setError(element);
  } else {
    setSuccess(element);
    return true;
  }
}

function setError(element) {
  element.nextSibling.nextSibling.classList.remove("d-none");
  element.style.border = "1px solid red";
}

function setSuccess(element) {
  element.nextSibling.nextSibling.classList.add("d-none");
  element.style.border = "1px solid #d1d1d1";
}

function allValidated(title, description, date) {
  if (title && description && date) {
    addTask();
  } else {
    return false;
  }
}
