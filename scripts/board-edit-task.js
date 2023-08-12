function saveEditTask(taskIndex, e) {
  e.preventDefault();
  const status = userObj['tasks'][taskIndex]['status'];
  const id = userObj['tasks'][taskIndex]['id'];
  const variable = getEditedVaraible(status, id, taskIndex);
  resetPrioButtons();
  console.log(variable);
}

function resetPrioButtons() {
  const images = {
    low: document.getElementById("lowImg"),
    medium: document.getElementById("mediumImg"),
    urgent: document.getElementById("urgentImg"),
  };
  const buttons = {
    low: document.getElementById('lowBtn'),
    medium: document.getElementById('mediumBtn'),
    urgent: document.getElementById('urgentBtn'),
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
  let currentTask = userObj.tasks[i];
  openEditModal(document.getElementById('openEditModal'))
  document.getElementById('editOkBtn').classList.remove('display-none');
  document.getElementById('editTitle').value = currentTask['titel'];
  document.getElementById('editDescription').value = currentTask['description'];
  document.getElementById('editDate').value = currentTask['date'];
  let currentButton = document.getElementById('edit' + `${currentTask['prio'].charAt(0).toUpperCase() + currentTask['prio'].slice(1)} + 'Btn'`);
  let currentButtonImage = document.getElementById('edit' + `${currentTask['prio'].charAt(0).toUpperCase() + currentTask['prio'].slice(1)} + 'Img'`);
  // currentButton.classList.add(`${currentTask['prio'] + '-active'}`);
  // currentButtonImage.src = `./img/prio_${currentTask['prio']}.png`;
  renderBoardSubtasks(currentTask);
  const checkboxImages = document.querySelectorAll('.checkboxImg');
  const assignedContacts = currentTask['assigned'];
  document.getElementById('editContactContainerList').innerHTML = '';
  for (let c = 0; c < assignedContacts.length; c++) {
    const contact = assignedContacts[c];
    document.getElementById('editContactContainerList').innerHTML +=
      htmlTemplateEditContactIcon(contact);
    console.log(contact);
  }

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
        console.log(currentTask, st, j);
      }
    }
  }


  function addEditedSubtask() {
    const input = document.getElementById('generatedSubtaskInput');
    if(input.value !== '') {
      subtasks.push({
        title: input.value,
        property: 'unchecked'
      });
      renderBoardSubtasks()

    }
  }

