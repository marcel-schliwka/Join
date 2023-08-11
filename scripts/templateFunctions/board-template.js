function htmlTemplateProgress(percentage) {
    return `
            <div class="progress-bar" style="width:${percentage}%" role="progressbar" aria-valuenow="${percentage}" aria-valuemin="0" aria-valuemax="100"></div>
        `;
}


/**
 * Generates the HTML template for a given task element for the "to do" category.
 *
 * @function
 * @param {Object} element - The task object containing details like title, description, category, category color, etc.
 * @param {number} i - The index or identifier for the task, used to generate unique IDs for DOM elements.
 * @param {string} priority - The HTML string representing the priority icon for the task.
 * @returns {string} HTML template string for the task, which includes details like category, title, description, and assigned members.
 */
function htmlTemplateToDo(element, i, priority) {
    return `<div status="to do" currentId="${i}" titel="${element["titel"]}" id="cardTodo${i}" onclick="boardOpenPopUpTask(this.getAttribute('currentId'), this)"  draggable="true" ondragstart="startDragging(this.getAttribute('currentId'), this)" class="moveableCard bgWhite2 cursorPointer boxShadow border rounded-5 p-2 my-3 d-flex flex-column align-items-start">
              <div class="textWhite border rounded-3 px-3 m-2 task-headline" style="background-color:${element["categoryColor"]}">
                  ${element["category"]}
              </div>
              <div class="mt-2 mx-2 bold sub-headline">
                  ${element["titel"]}
              </div>
              <div class="cardText mx-2 my-1">
                  ${element["description"]}
              </div>
              <div id="subtask-progress${i}" class="progress">
                ${htmlTemplateProgress(checkSubtasks(element, i))}
              </div>
              <div class="d-flex justify-content-between mx-2 my-1 w-100 pe-4 align-items-center">
                  <div class="d-flex textWhite" id="assignedToDo${i}"></div>
                  <div>${priority}</div>
              </div>
          </div>`;
}

/**
 * Generates the HTML template for a given task element for the "in progress" category.
 *
 * @function
 * @param {Object} element - The task object containing details like title, description, category, category color, etc.
 * @param {number} i - The index or identifier for the task, used to generate unique IDs for DOM elements.
 * @param {string} priority - The HTML string representing the priority icon for the task.
 * @returns {string} HTML template string for the task, which includes details like category, title, description, and assigned members.
 */
function htmlTemplateInProgress(element, i, priority) {
    return `<div status="in progress" currentId="${i}" titel="${element["titel"]}" id="cardInProgress${i}" onclick="boardOpenPopUpTask(this.getAttribute('currentId'), this)" draggable="true" ondragstart="startDragging(this.getAttribute('currentId'), this)" class="moveableCard bgWhite2 cursorPointer boxShadow border rounded-5 p-2 my-3 d-flex flex-column align-items-start">
              <div class="textWhite border rounded-3 px-3 m-2 task-headline" style="background-color:${element["categoryColor"]}">
                  ${element["category"]}
              </div>
              <div class="mt-2 mx-2 bold sub-headline">
                  ${element["titel"]}
              </div>
              <div class="cardText mx-2 my-1">
                  ${element["description"]}
              </div>
              <div id="subtask-progress${i}" class="progress">
                ${htmlTemplateProgress(checkSubtasks(element))}
              </div>
              <div class="d-flex justify-content-between mx-2 my-1 w-100 pe-4 align-items-center">
                  <div class="d-flex textWhite" id="assignedInProgress${i}"></div>
                  <div>${priority}</div>
              </div>
          </div>`;
}



/**
 * Generates the HTML template for a given assignment element, typically representing a member assigned to a task.
 *
 * @function
 * @param {Object} element - The task object containing an "assigned" property which is an array of member names.
 * @param {number} j - The index of the member in the "assigned" array, used to fetch the specific member.
 * @returns {string} HTML template string for the assigned member, which includes the member's initials set against a background color.
 */
function htmlTemplateAssignment(element, j) {
    return `<div class="margin-4 contact-icon d-flex justify-content-center align-items-center border rounded-circle p-2" style="background-color:${MemberColors[getColorSign(element["assigned"][j])]
        }">
              ${getInitials(element["assigned"][j])}
          </div>`;
}


/**
* Generates and returns the HTML markup for a task that's awaiting feedback.
*
* @function
* @param {Object} element - The task object.
* @param {number} i - The index or ID of the task.
* @param {string} priority - The priority of the task.
* @returns {string} HTML markup for the task.
*
* @property {string} element.titel - The title of the task.
* @property {string} element.categoryColor - The background color for the category label.
* @property {string} element.category - The category name of the task.
* @property {string} element.description - A brief description of the task.
*/
function htmlTemplateAwaitingFeedback(element, i, priority) {
    return `<div status="awaiting feedback" currentId="${i}" id="cardAwaitingFeedback${i}" titel="${element["titel"]}" onclick="boardOpenPopUpTask(this.getAttribute('currentId'), this)" draggable="true" ondragstart="startDragging(this.getAttribute('currentId'), this)" class="moveableCard bgWhite2 cursorPointer boxShadow border rounded-5 p-2 my-3 d-flex flex-column align-items-start">
          <div class="textWhite border rounded-3 px-3 m-2 task-headline" style="background-color: ${element["categoryColor"]}">
              ${element["category"]}
          </div>
          <div class="mt-2 mx-2 bold sub-headline">
              ${element["titel"]}
          </div>
          <div class="cardText mx-2 my-1">
              ${element["description"]}
          </div>
          <div id="subtask-progress${i}" class="progress">
          ${htmlTemplateProgress(checkSubtasks(element))}
        </div>
          <div class="d-flex justify-content-between mx-2 my-1 w-100 pe-4 align-items-center">
              <div class="d-flex textWhite" id="assignedAwaitingFeedback${i}"></div>
              <div>${priority}</div>
          </div>
      </div>`;
}



/**
* Generates and returns the HTML markup for a task that's marked as "done".
*
* @function
* @param {Object} element - The task object.
* @param {number} i - The index or ID of the task.
* @param {string} priority - The priority of the task.
* @returns {string} HTML markup for the task.
*
* @property {string} element.titel - The title of the task.
* @property {string} element.categoryColor - The background color for the category label.
* @property {string} element.category - The category name of the task.
* @property {string} element.description - A brief description of the task.
*/
function htmlTemplateDone(element, i, priority) {
    return `<div status="done" id="cardDone${i}" currentId="${i}" titel="${element["titel"]}" onclick="boardOpenPopUpTask(this.getAttribute('currentId'), this)" draggable="true" ondragstart="startDragging(this.getAttribute('currentId'), this)" class="moveableCard cursorPointer bgWhite2 boxShadow border rounded-5 p-2 my-3 d-flex flex-column align-items-start">
          <div class="textWhite border rounded-3 px-3 m-2 task-headline" style="background-color:${element["categoryColor"]}">
              ${element["category"]}
          </div>
          <div class="mt-2 mx-2 bold sub-headline">
              ${element["titel"]}
          </div>
          <div class="cardText mx-2 my-1">
              ${element["description"]}
          </div>
          <div class="d-flex justify-content-between mx-2 my-1 w-100 pe-4 align-items-center">
              <div class="d-flex textWhite" id="assignedDone${i}"></div>
              <div>${priority}</div>
          </div>
      </div>`;
}



/**
 * Generates and returns the HTML markup for a task detail popup on the board.
 *
 * @function
 * @param {number} i - The index or ID of the task.
 * @param {string} priority - The priority of the task.
 * @returns {string} HTML markup for the task detail popup.
 *
 * @global
 * @requires userObj: An object containing user tasks.
 */
function htmlTemplatePopUpTask(i, priority) {
    return `<div class="popUpBoardTask px-4 pt-4 pb-1 rounded-4 d-flex flex-column align-items-start">
          <img onclick="boardClosePopUpTask()" class="boardTaskClose cursorPointer" src="./img/closeIt.svg" alt="close">
          <div class="boardTaskEdit d-flex">
              <img class="cursorPointer heightWidth35Px" src="./img/deleteButton.svg" alt="delete" onclick="deleteTask(${i})">
              <img class="cursorPointer heightWidth35Px" src="./img/editButton.svg" alt="edit" onclick="editTask(${i})">
          </div>
          <div style="background-color: ${userObj.tasks[i]["categoryColor"]}" class="textWhite px-3 rounded-2">${userObj.tasks[i].category}</div>
          <div class="size3Em bold font-61">${userObj.tasks[i]["titel"]}</div>
          <div class="pb-2 max-size">${userObj.tasks[i]["description"]}</div>
          <div class="pb-2 d-flex">
              <div class="pe-3 bold">Due date:</div>
              <div class="bold">${userObj.tasks[i]["date"]}</div>
          </div>
          <div class="pb-2 d-flex align-items-center">
              <div class="pe-3 bold">Priority:</div>
              <div>${priority}</div>
          </div>
          <div>
              <div class="pb-3 bold">Assigned to:</div>
              <div id="boardTasksMembers" class="d-flex flex-column"></div>
          </div>
          <div id="boardTasksSubtasks"></div>
      </div>`;
}


function generateBordSubtaskHTML(element3, k) {
    return `
    <div class="d-flex align-items-center mb-1 ps-3">
    <div onclick="changeToCheckbox(${k})"><img checked="false" class="subtaskCheckboxImg" id="subtask-checkbox${k}" src="./img/checkbox.png"></div>
    <div class="ms-4 bold">${element3}</div>
    </div>
    `;
}

/**
* Generates and returns the HTML markup for the member icon in a popup.
*
* @function
* @param {Object} element2 - The member object.
* @global
* @requires MemberColors: An object mapping member names to their respective colors.
* @requires getColorSign: A function that gets the color sign for a member.
* @requires getInitials: A function that gets the initials of a member's name.
* @returns {string} HTML markup for the member icon.
*/
function htmlTemplatePopUpMembers(element2) {
    return `<div class="d-flex flex-row"><div class="textWhite contact-icon d-flex justify-content-center align-items-center border rounded-circle p-2 mb-3" style="background-color:${MemberColors[getColorSign(element2)]
        }">${getInitials(element2)}</div><div class="bold boardMember-margin">${element2}</div><div>
      `;
}