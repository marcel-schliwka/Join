function saveEditTask(taskIndex, e) {
  e.preventDefault();
  const status = userObj['tasks'][taskIndex]['status'];
  const id = userObj['tasks'][taskIndex]['id'];
  const variable = getEditedVaraible(status, id, taskIndex);
  resetPrioButtons();
}

function resetPrioButtons() {
  const images = {
    low: document.getElementById("edit-low-img"),
    medium: document.getElementById("edit-medium-img"),
    urgent: document.getElementById("edit-urgent-img"),
  };
  const buttons = {
    low: document.getElementById('edit-low-btn'),
    medium: document.getElementById('edit-medium-btn'),
    urgent: document.getElementById('edit-urgent-btn'),
  }
  images['low'].src = './img/prio_low_color.png';
  images['medium'].src = './img/prio_medium_color.png';
  images['urgent'].src = './img/prio_urgent_color.png';

  buttons['low'].classList.remove('low-active');
  buttons['medium'].classList.remove('medium-active');
  buttons['urgent'].classList.remove('urgent-active');
}




function getEditedVaraible(status, id, taskIndex) {
  let titel = document.getElementById("title-input");
  let description = document.getElementById("description-input");
  let date = document.getElementById("task-date");
  let categoryElement = document.querySelector(".category-input");
  let category;
  if (categoryElement) {
    category = categoryElement.innerText;
  } else {
    category = userObj['tasks'][taskIndex]['category'];
  }
  let assignedTo = assigned;
  let subtaskTexts = getSubtasks();
  let newSubtasks = subtaskTexts.map((subtaskTitle) => ({
    title: subtaskTitle,
    property: "unchecked",
  }));
  let prio = currentPrio;
  const categoryInputCircle = document.querySelector(".category-input circle");
  let color;
  if (categoryInputCircle) {
    color = categoryInputCircle.getAttribute("fill");
  } else {
    color = userObj['tasks'][taskIndex]['categoryColor'];
  }
  if (prio == undefined) {
    prio = "low";
  }
  let newTask = {
    titel: titel.value,
    description: description.value,
    status: status,
    category: category,
    categoryColor: color,
    assigned: assignedTo,
    date: date.value,
    prio: prio,
    subtasks: newSubtasks,
    id: id,
  };
  return newTask;
}



/**
*
* Code: Whats my misson?
* Me: Your task is to become a sphagetti.
* Code: Oh my god...
* 
* Follow me for more types of pasta 
*/
// function editTask(i) {
//     let currentTask = userObj.tasks[i];
//     openModal(document.querySelector(".modal"));
//     document.getElementById('clear-btn').classList.add('d-none');
//     document.getElementById('create-btn').classList.add('d-none');
//     document.getElementById('ok-btn').classList.remove('d-none');
//     document.getElementById('title-input').value = currentTask['titel'];
//     document.getElementById('description-input').value = currentTask['description'];
//     document.getElementById('task-date').value = currentTask['date'];
//     let currentButton = document.getElementById(`${currentTask['prio'] + 'Btn'}`);
//     let currentButtonImage = document.getElementById(`${currentTask['prio'] + 'Img'}`)

//     currentButton.classList.add(`${currentTask['prio'] + '-active'}`);
//     currentButtonImage.src = `./img/prio_${currentTask['prio']}.png`;

//     // categorys.push({ name: currentTask['category'], color: currentTask['categoryColor'] });
//     // let category = document.getElementById('category-container');
//     // let categoryBtn = document.getElementById('category-button');
//     // renderCategorys();
//     // if (category && categoryBtn) {
//     //   category.innerHTML = generateBasicCategoryInputHTML();
//     //   categoryBtn.innerHTML = generateBasicCategoryButtonHTML();
//     // }
//     // category.innerHTML = generateSelectedCategoryHTML(
//     //   categorys,
//     //   categorys.length - 1
//     // );

//     renderBoardSubtasks(currentTask);

//     const checkboxImages = document.querySelectorAll('.checkboxImg');
//     const assignedContacts = currentTask['assigned'];
//     for (let i = 0; i < checkboxImages.length; i++) {
//       const checkboxImg = checkboxImages[i];
//       const listItem = checkboxImg.closest(".contact-item-container");
//       if (listItem) {
//         const contactName = listItem.querySelector(".contact-item").textContent.trim();
//         if (assignedContacts.includes(contactName)) {
//           checkboxImg.src = "./img/checkbox_checked.png";
//         }
//       }
//     }
//   }

function editTask(i) {
  renderUserContacts();
  let currentTask = userObj.tasks[i];
  openEditModal(document.getElementById('openEditModal'))
  document.getElementById('editOkBtn').classList.remove('display-none');
  document.getElementById('editTitle').value = currentTask['titel'];
  document.getElementById('editDescription').value = currentTask['description'];
  document.getElementById('editDate').value = currentTask['date'];
  let currentButton = document.getElementById(`${'edit-' + currentTask['prio'] + '-btn'}`);
  let currentButtonImage = document.getElementById(`${'edit-' + currentTask['prio'] + '-img'}`);
  currentButton.classList.add(`${currentTask['prio'] + '-active'}`);
  currentButtonImage.src = `./img/prio_${currentTask['prio']}.png`;
  renderBoardSubtasks(currentTask);
  const checkboxImages = document.querySelectorAll('.checkboxImg');
  const assignedContacts = currentTask['assigned'];
  document.getElementById('editContactContainerList').innerHTML = '';
  for (let c = 0; c < assignedContacts.length; c++) {
    const contact = assignedContacts[c];
    document.getElementById('editContactContainerList').innerHTML +=
      htmlTemplateEditContactIcon(contact);
  }
  renderSubtasksEditDialog(currentTask['subtasks'], i);

  for (let i = 0; i < checkboxImages.length; i++) {
    const checkboxImg = checkboxImages[i];
    const listItem = checkboxImg.closest(".contact-item-container");
    if (listItem) {
      const contactName = listItem.querySelector(".contact-item").textContent.trim();
      if (assignedContacts.includes(contactName)) {
        checkboxImg.src = "./img/checkbox_checked.png";
      }
    }
  }
}

function renderSubtasksEditDialog(subtasks, i) {
  for (let s = 0; s < subtasks.length; s++) {
    const sub = subtasks[s];
    document.getElementById('editDialogSubtaskList').innerHTML += renderSubtaskListForEditDialog(sub, i);
  }
}
function editChangeToInput(inputId, buttonId) {
  let input = document.getElementById(inputId);
  let button = document.getElementById(buttonId);
  input.innerHTML = '';
  button.innerHTML = '';

  if (input.id.includes('editSubtasksInput')) {
    button.innerHTML += generateEditSubtasksButtonHTML();
    input.innerHTML += generateEditSubtaskInputHTML();
    // let generatedInput = document.getElementById("generatedSubtaskInput");
    // if (generatedInput) {
    //   generatedInput.focus();
    // }
  }

}

  function renderBoardSubtasks(currentTask) {
    const content = document.getElementById('subtask-content');
    const buttonContainer = document.getElementById('form-btn-container');
    content.innerHTML = '';

    for (let i = 0; i < currentTask['subtasks'].length; i++) {
      const subtaskTitle = currentTask['subtasks'][i]['title'];
      const subtaskProperty = currentTask['subtasks'][i]['property'];
      subtasks.push({
        title: subtaskTitle,
        property: subtaskProperty,

      });
      for (let j = 0; j < subtasks.length; j++) {
        const st = subtasks[j];
        content.innerHTML += generateTemplateSubtasks(st, j);
      }
    }
  }

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



  /*
  function addEditedSubtask() {
    const input = document.getElementById('editSubtasksInput');
    if(input.value !== '') {
      subtasks.push({
        title: input.value,
        property: 'unchecked'
      });
      // renderBoardSubtasks()

    }
  }
*/



function getEditTaskPrio(button, priority) {
  const buttons = document.querySelectorAll(".prioBtn");
  let images = {
    low: document.getElementById("edit-low-img"),
    medium: document.getElementById("edit-medium-img"),
    urgent: document.getElementById("edit-urgent-img"),
  };
  buttons.forEach(function (btn) {
    if (btn.classList.contains(priority + "-active")) {
      btn.classList.remove(priority + "-active");
      currentPrio;
    } else if (btn !== button) {
      btn.classList.remove("low-active", "medium-active", "urgent-active");
      images.low.src = "./img/prio_low_color.png";
      images.medium.src = "./img/prio_medium_color.png";
      images.urgent.src = "./img/prio_urgent_color.png";
    }
  });
  button.classList.add(priority + "-active");
  images[priority].src = `./img/prio_${priority}.png`;
  currentPrio = priority;
}



function renderUserContacts() {
  let contacts = document.getElementById('editRenderContacts');
  contacts.innerHTML = "";
  contacts.innerHTML += generateUserAssignedHTML();
  for (let i = 0; i < userObj.contacts.length; i++) {
    const contact = userObj.contacts[i];
    contacts.innerHTML += renderContactsHTML(contact, i);
  }
  contacts.innerHTML += generateAddNewContact();
}



function toggleAssigndMenu() {
  const contacts = document.getElementById("contact-container");
  const contactContainer = document.getElementById("assigned-container");
  const input = document.querySelector(".assigned-input input");
  contacts.classList.toggle("display-none");
  contactContainer.classList.toggle("remove-border");
  if (!input) {
    document.addEventListener("click", (event) => {
      if (!contactContainer.contains(event.target)) {
        contacts.classList.add("display-none");
        contactContainer.classList.remove("remove-border");
      }
    });
    contacts.addEventListener("click", (event) => {
      event.stopPropagation();
    });
  }
}


function toggleEditAssignedMenu() {
  const contacts = document.getElementById('edit-contact-container');
  const contactContainer = document.getElementById('edit-assigned-container');
  const input = document.querySelector('.assigned-input input');
  contacts.classList.toggle('display-none');
  contactContainer.classList.toggle('remove-border');
  if (!input) {
    document.addEventListener('click', (event) => {
      if(!contactContainer.contains(event.target)) {
        contacts.classList.add('display-none');
        contactContainer.classList.remove('remove-border');
      }
    });
    contacts.addEventListener('click', (event) => {
      event.stopPropagation();
    })
  }
}
