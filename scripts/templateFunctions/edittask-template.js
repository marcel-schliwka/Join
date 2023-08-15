function generateEditTaskDialog() {
  return /*html*/`
    <div id="openEditModal" class="edit-modal-backdrop modal dNone">
    <div class="edit-task-section">
      <div class="edit-task-section-wo-btn">
      <form onsubmit="saveEditTask(taskIndex); return false;" class="edit-task-form-board popUpBoardEditTask">
        <img src="./img/close.svg" alt="Close Add Task Form" class="boardTaskClose"
          onclick="closeEditModal(document.getElementById('openEditModal')); resetPrioButtons();">
        <label id="edit-title-label" for="edit-title" class="font20 label">Title</label>
        <input id="editTitle" name="edit-title" type="text"
          class="w-422 h-51 font20 pad-13-21 custom-border ol-none cursor-p">
        <label id="edit-description-label" for="edit-description" class="font20 label">Description</label>
        <input id="editDescription" name="edit-description" type="text" cols="30" rows="10"
          class="w-422 font20 pad-18-21 custom-border ol-none cursor-p">
        <label id="edit-date-label" for="edit-date" class="font20 label">Due date</label>
        <input id="editDate" name="edit-date" type="date"
          class="w-422 h-51 font20 pad-18-21 custom-border ol-none cursor-p">
        <label for="edit-priority" class="font20 label"><b>Priority</b></label>
        <div class="prio-btn prio-btn-edit">
          <button id="edit-urgent-btn" onclick="getEditTaskPrio(this, 'urgent')"
            class="font20 pad-18-10 urgent-btn custom-border shadow prioBtn" type="button">
            Urgent
            <img id="edit-urgent-img" src="./img/prio_urgent_color.png">
          </button>
          <button id="edit-medium-btn" onclick="getEditTaskPrio(this, 'medium')"
            class="font20 pad-18-10 medium-btn custom-border shadow prioBtn" type="button">
            Medium
            <img id="edit-medium-img" src="./img/prio_medium_color.png">
          </button>
          <button id="edit-low-btn" onclick="getEditTaskPrio(this, 'low')"
            class="font20 pad-18-10 low-btn custom-border shadow prioBtn" type="button">Low
            <img id="edit-low-img" src="./img/prio_low_color.png">
          </button>
        </div>
        <label for="edit-assigned" id="edit-assigned-label" class="font20 label">Assigned To</label>
        <div onclick="toggleEditAssignedMenu()" class="assigned-container font20 cursor-p" id="edit-assigned-container">
          <div class="assigned-input" id="editAssignedInput">
            <span>Select contacts to assign</span>
          </div>
          <div class="assigned-button-container" id="editAssignedBtn">
            <button type="button"><img src="./img/arrow_down.png"></button>
          </div>
        </div>
        <div class="edit-contacts font20 display-none" id="edit-contact-container">
          <ul id="editRenderContacts">
          </ul>
        </div>
        <div id="editContactContainerList" class="d-flex flex-row justify-start"> </div>

        <label class="font20 label" for="subtasks" id="edit-subtasks-label">Subtasks</label>
        <div class="edit-subtasks-container font20 w-422 h-51 custom-border pad-18-21">
          <div class="subtasks-input" id="subtask-edit-input">
            <input onclick="changeToEditInput()" class="subtask-input  ol-none"
              type="text" placeholder="Add new subtask">
          </div>
          <div class="subtasks-button-container" id="subtasks-edit-button">
            <button onclick="changeToEditInput()" type="button"><img src="./img/plus_icon.png"></button>
          </div>
        </div>
        <ul class="generatedSubtasks cursor-p font20" id="subtask-edit-content">
        </ul>
        </div>
        <div class="edit-ok-btn">
          <button id="editOkBtn" type="submit" class="display-none editTaskBoardBtn">
            Ok
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
              <path d="M4.0166 12.1704L10.0166 18.1704L20.0166 6.17041" stroke="white" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  </div>
  `;
}

function generateBasicEditSubtaskInputHTML() {
  return `
    <input onclick="changeToEditInput()" class="subtask-input  ol-none" type="text" placeholder="Add new subtask">
    `;
}


function generateBasicEditSubtaskButtonHTML() {
  return `          
    <button onclick="changeToEditInput()" type="button"><img src="./img/plus_icon.png"></button>
      `;
}


function generateEditInputHTML() {
  return `
        <div>
          <input onkeydown="handleKeyPress(event, addEditedSubtask, resetEditInput)" id="generatedSubtaskInput" placeholder="Enter a new subtask" class="ol-none b-none">
        </div>
        `;
}


function generateEditButtonHTML() {
  return `
    <div class="generated-Btn-Container">
    <button onclick="resetEditInput()" type="button"><img src="./img/cancel_icon.png"></button>
    <svg class="btn-seperator" xmlns="http://www.w3.org/2000/svg" width="2" height="31" viewBox="0 0 2 31" fill="none">
    <path d="M1 0V31" stroke="#D1D1D1"/>
    </svg>
    <button onclick="addEditedSubtask()" type="button"><img src="./img/check_black_icon.png"></button>
    </div>`;
}


function generateEditSubtaskHTML(i, subtask) {
  return `
    <li id="listItem${i}">
      <div class="d-flex justify-content-between align-items-center w-100">
        <div class="font16 w-230 ov-scroll subtask-item" id="subtask${i}">
          <div class="d-flex align-items-center">
            <svg id="subtaskCircle${i}" class="subtask-circle" xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10">
              <circle cx="5" cy="5" r="5" fill="black" />
            </svg>
            <div id="subtask-text${i}" class="ml-15">${subtask}</div>
          </div>
          <div id="subtaskButtonsContainer${i}" class="subtask-buttons">
            <svg onclick="editGeneratedSubtask(${i})" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none">
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
            <svg onclick="deleteGeneratedEditSubtask(${i})" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none">
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


function generateEditUserAssignedHTML() {
  return `
    <div class="contact-item-container" onclick="changeEditCheckbox(0)">
      <li class="edit-contact-item">You<a onclick="changeEditCheckbox(0)"><img class="checkboxEditImg cursor-p" onclick="changeEditCheckbox(0)" id="checkboxEditImg0" src="./img/checkbox.png"></a></li>
    </div>
    `;
}

function renderEditContactsHTML(contact, i) {
  return `
        <div class="contact-item-container" onclick="changeEditCheckbox(${i + 1})">
          <li class="edit-contact-item">${contact["name"]
    } <a onclick="changeEditCheckbox(${i + 1
    })"><img class="checkboxEditImg cursor-p" onclick="changeEditCheckbox(${i + 1
    })" id="checkboxEditImg${i + 1}" src="./img/checkbox.png"></a></li>
        </div>
        `;
}


function generateAddNewEditContact() {
  return `
    <div class="d-flex justify-content-center custom-contact-button-task">
      <button type="button" class="fw-bold custom-lh-120 custom-btn d-flex align-items-center w-100 ml-35 h-48" onclick="openCreateContact()">
        <span class="custom-fs-21">New contact</span>
        <img src="./img/icon_add_contact.png" alt="">
      </button>
    </div>
    `;
}

function generateEditSubtaskEditInput(placeholder, index) {
  return `
  <div class="d-flex">
    <input class="subtask-edit-input" id="editedSubtask-input${index}" value="${placeholder}"> 
    <div class="subtask-edit-input-svg">
      <svg onclick="renderEditSubtasks()" xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
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
      <svg onclick="acceptEditEditedSubtask(${index})" xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
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