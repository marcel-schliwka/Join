let currentDraggedElement;
let currentStatus;
let currentTitel;

async function initBoard() {
  userObj = await getLoggedInUser();
  updateHTML();
}

function updateHTML() {
  clearAllTasks();
  renderAllToDos();
  renderAllInProgress();
  renderAllAwaitingFeedback();
  renderAllDone();
  startTouchEventListener();
  renderTopLogo(userObj);
}

function clearAllTasks() {
  document.getElementById("todo").innerHTML = "";
  document.getElementById("inProgress").innerHTML = "";
  document.getElementById("awaitingFeedback").innerHTML = "";
  document.getElementById("done").innerHTML = "";
}
// --------------- TODO --------------- \\
function renderAllToDos() {
  let stillToDo = userObj.tasks.filter((t) => t["status"] == "to do");

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
  return `<div status="to do" currentId="${i}" titel="${element["titel"]}" id="cardTodo${i}" onclick="boardOpenPopUpTask(this.getAttribute('currentId'), this)"  draggable="true" ondragstart="startDragging(this.getAttribute('currentId'), this)" class="moveableCard bgWhite2 cursorPointer boxShadow border rounded-5 p-2 my-3 d-flex flex-column align-items-start">
            <div class="textWhite border rounded-3 px-3 m-2" style="background-color:${element["categoryColor"]}">
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
  return `<div class="margin-4 heightWidth45Px d-flex justify-content-center align-items-center border rounded-circle p-2" style="background-color:${
    MemberColors[getColorSign(element["assigned"][j])]
  }">
            ${getInitials(element["assigned"][j])}
        </div>`;
}

// --------------- IN PROGRESS --------------- \\
function renderAllInProgress() {
  let stillInProgress = userObj.tasks.filter(
    (t) => t["status"] == "in progress"
  );
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
  return `<div status="in progress" currentId="${i}" titel="${element["titel"]}" id="cardInProgress${i}" onclick="boardOpenPopUpTask(this.getAttribute('currentId'), this)" draggable="true" ondragstart="startDragging(this.getAttribute('currentId'), this)" class="moveableCard bgWhite2 cursorPointer boxShadow border rounded-5 p-2 my-3 d-flex flex-column align-items-start">
            <div class="textWhite border rounded-3 px-3 m-2" style="background-color:${element["categoryColor"]}">
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
  return `<div status="awaiting feedback" currentId="${i}" id="cardAwaitingFeedback${i}" titel="${element["titel"]}" onclick="boardOpenPopUpTask(this.getAttribute('currentId'), this)" draggable="true" ondragstart="startDragging(this.getAttribute('currentId'), this)" class="moveableCard bgWhite2 cursorPointer boxShadow border rounded-5 p-2 my-3 d-flex flex-column align-items-start">
        <div class="textWhite border rounded-3 px-3 m-2" style="background-color: ${element["categoryColor"]}">
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
  return `<div status="done" id="cardDone${i}" currentId="${i}" titel="${element["titel"]}" onclick="boardOpenPopUpTask(this.getAttribute('currentId'), this)" draggable="true" ondragstart="startDragging(this.getAttribute('currentId'), this)" class="moveableCard cursorPointer bgWhite2 boxShadow border rounded-5 p-2 my-3 d-flex flex-column align-items-start">
        <div class="textWhite border rounded-3 px-3 m-2" style="background-color:${element["categoryColor"]}">
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

function startDragging(id, card) {
  currentDraggedElement = id;
  currentStatus = card.getAttribute("status");
  currentTitel = card.getAttribute("titel");
  card.classList.add("cardMove");
}

function allowDrop(ev, element) {
  element.classList.add("moveBackground");
  ev.preventDefault();
}

function leaveDropArea(element) {
  element.classList.remove("moveBackground");
}

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

function boardOpenPopUpTask(i, card) {
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
        <div style="background-color: ${userObj.tasks[i]["categoryColor"]}" class="textWhite px-3 rounded-2">${userObj.tasks[i].category}</div>
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
  return `<div class="textWhite heightWidth45Px d-flex justify-content-center align-items-center border rounded-circle p-2 mb-3" style="background-color:${
    MemberColors[getColorSign(element2)]
  }">${getInitials(element2)}</div>
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

// Drag and Drop for mobile devices with touch events

let startTouchElement;
let moveTouchElement;
let endedOnTouchElement;
let currentTouchId;
let selectedElement = null;
let pressTimer = null;
let initialTouchOffsetX, initialTouchOffsetY;
let initialScrollLeft, initialScrollTop;

function startTouchEventListener() {
  document.querySelectorAll(".moveableCard").forEach((card) => {
    card.addEventListener(
      "touchstart",
      (e) => {
        e.preventDefault();
        startTouchElement = e.target.closest(".moveableCard");
        selectedElement = startTouchElement;
        let rect = startTouchElement.getBoundingClientRect();
        initialTouchOffsetX = e.touches[0].clientX - rect.left;
        initialTouchOffsetY = e.touches[0].clientY - rect.top;
        initialScrollLeft = window.scrollX;
        initialScrollTop = window.scrollY;

        checkIfElementIsValid(startTouchElement);

        currentStatus = startTouchElement.getAttribute("status");
        currentTitel = startTouchElement.getAttribute("titel");
        currentTouchId = startTouchElement.getAttribute("currentId");
        if (selectedElement) {
          selectedElement.style.transform = "scale(1.1) rotate(5deg)";
          selectedElement.style.transition = "transform 125ms ease-in-out";
        }
        // Beginn des Long Press Timers
        pressTimer = window.setTimeout(function () {
          if (selectedElement && selectedElement.getAttribute("status")) {
            selectedElement.style.left = `${
              initialTouchOffsetX - initialScrollLeft
            }px`;
            selectedElement.style.top = `${
              initialTouchOffsetY - initialScrollTop
            }px`;
            selectedElement.style.width = "auto";
            selectedElement.style.height = "auto";
            selectedElement.style.position = "static";
            selectedElement.style.transform = "none";
            selectedElement.style.pointerEvents = "auto";
            selectedElement = null;
          }
          boardOpenPopUpTask(currentTouchId, startTouchElement);
        }, 1000);
      },
      false
    );

    card.addEventListener("touchmove", (e) => {
      e.preventDefault();

      if (pressTimer !== null) {
        window.clearTimeout(pressTimer);
        pressTimer = null;
      }
      if (selectedElement && selectedElement.getAttribute("status")) {
        selectedElement.style.width = `${selectedElement.offsetWidth}px`;
        selectedElement.style.height = `${selectedElement.offsetHeight}px`;
        selectedElement.style.position = "absolute";
        selectedElement.style.pointerEvents = "none";
      }
      let touch = e.touches[0];
      moveTouchElement = document.elementFromPoint(
        touch.clientX,
        touch.clientY
      );

      if (selectedElement) {
        selectedElement.style.left = `${
          touch.clientX - initialTouchOffsetX + initialScrollLeft
        }px`;
        selectedElement.style.top = `${
          touch.clientY - initialTouchOffsetY + initialScrollTop
        }px`;
      }
    });

    card.addEventListener(
      "touchend",
      (e) => {
        e.preventDefault();

        if (pressTimer !== null) {
          window.clearTimeout(pressTimer);
          pressTimer = null;
        }

        let touch = e.changedTouches[0];
        endedOnTouchElement = document.elementFromPoint(
          touch.clientX,
          touch.clientY
        );

        if (selectedElement) {
          selectedElement.style.pointerEvents = "auto";
        }

        selectedElement = null;
        moveElementToNewColumn();
      },
      false
    );
  });
}

function moveElementToNewColumn() {
  let dropStatus = endedOnTouchElement.getAttribute("status");
  if (!dropStatus) {
    updateHTML();
    return 0;
  }
  moveTo(dropStatus, startTouchElement);
}

function checkIfElementIsValid(element) {
  if (!element.getAttribute("status")) {
    return false;
  }
}
