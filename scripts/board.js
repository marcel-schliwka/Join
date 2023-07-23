let tasks = [
    {   
        id: 0,
        status: 'todo',
        titel: 'titel1',
        description: 'description1',
        category: 'category1',
        categoryColor: 'categoryColor1',
        assigned: ['SM', 'MV', 'TE', 'RI'],
        date: '01.03.22',
        prio: 'urgent',
        subtasks: []
    },
    {
        id: 1,
        status: 'todo',
        titel: 'titel2',
        description: 'description2',
        category: 'category2',
        categoryColor: 'categoryColor2',
        assigned: ['AS', 'DE'],
        date: '02.03.22',
        prio: 'urgent',
        subtasks: []
    },
    {   
        id: 2,
        status: 'in progress',
        titel: 'titel3',
        description: 'description3',
        category: 'category3',
        categoryColor: 'categoryColor3',
        assigned: ['EG', 'GA'],
        date: '03.03.22',
        prio: 'medium',
        subtasks: []
    },
    {   
        id: 3,
        status: 'awaiting feedback',
        titel: 'titel4',
        description: 'description4',
        category: 'category4',
        categoryColor: 'categoryColor4',
        assigned: ['RT', 'OC'],
        date: '04.03.22',
        prio: 'medium',
        subtasks: []
    },
    {   
        id: 4,
        status: 'done',
        titel: 'titel5',
        description: 'description5',
        category: 'category5',
        categoryColor: 'categoryColor5',
        assigned: ['MM', 'MA'],
        date: '05.03.22',
        prio: 'low',
        subtasks: []
    }
];

// const searchInput = document.querySelector('[data-search]');
let currentDraggedElement;
// let lists = document.getElementsByClassName('list');
// let boxToDo = document.getElementById('todo');
// let boxInProgress = document.getElementById('inProgress');

// for(list of lists) {
//     list.addEventListener("dragstart", function(e){
//         let selected = e.target;
    
//         boxToDo.addEventListener("dragover", function(e){
//             e.preventDefault();
//         });
//         boxToDo.addEventListener("drop", function(e){
//             boxToDo.appendChild(selected);
//             selected = null;
//         })

//     })
// }

function initBoard() {
    updateHTML();
}

function updateHTML(){
    renderAllToDos();
    renderAllInProgress();
    renderAllAwaitingFeedback();
    renderAllDone();
}

// --------------- TODO --------------- \\
function renderAllToDos() {
    let stillToDo = tasks.filter(t => t['status'] == 'todo');

    document.getElementById('todo').innerHTML = '';

    for (let i = 0; i < stillToDo.length; i++) {
        const element = stillToDo[i];
        document.getElementById('todo').innerHTML += htmlTemplateToDo(element, i, getPriority(element));
        
        let idAssigned = document.getElementById(`assignedToDo${i}`);

        idAssigned.innerHTML = "";  

        for (let j = 0; j < element['assigned'].length; j++) {
            idAssigned.innerHTML += htmlTemplateAssignment(element, j);
        }
    }
}

function getPriority(element) {
    let priority;
    if (element['prio'] == "urgent") {
        priority = '<img class="height40Px" src="./img/prioUrgent.svg">';
    } else if (element['prio'] == "medium") {
        priority = '<img class="height40Px" src="./img/prioMedium.svg">';
    } else {
        priority = '<img class="height40Px" src="./img/prioLow.svg">';
    }
    ;
    return priority;
}

function htmlTemplateToDo(element, i, priority) {
    return `<div onclick="boardOpenPopUpTask(${element['id']})" draggable="true" ondragstart="startDragging(${element['id']})" class="bgWhite2 cursorPointer boxShadow border rounded-5 p-2 my-3 d-flex flex-column align-items-start">
            <div class="textWhite border rounded-3 px-3 m-2" style="background-color:grey">
                ${element['category']}
            </div>
            <div class="mt-2 mx-2 bold">
                ${element['titel']}
            </div>
            <div class="mx-2 my-1">
                ${element['description']}
            </div>
            <div class="d-flex justify-content-between mx-2 my-1 w-100 pe-4">
                <div class="d-flex textWhite" id="assignedToDo${i}"></div>
                <div>${priority}</div>
            </div>
        </div>`;
}

function htmlTemplateAssignment(element, j) {
    return `<div class="heightWidth45Px d-flex justify-content-center align-items-center border rounded-circle p-2" style="background-color:grey">
            ${element['assigned'][j]}
        </div>`;
}

// --------------- IN PROGRESS --------------- \\
function renderAllInProgress() {
    let stillInProgress = tasks.filter(t => t['status'] == 'in progress');
    document.getElementById('inProgress').innerHTML = '';
    for (let i = 0; i < stillInProgress.length; i++) {
        const element = stillInProgress[i];
        document.getElementById('inProgress').innerHTML += htmlTemplateInProgress(element, i, getPriority(element));
        
    let idAssigned = document.getElementById(`assignedInProgress${i}`);

    idAssigned.innerHTML = "";  

    for (let j = 0; j < element['assigned'].length; j++) {
        idAssigned.innerHTML += htmlTemplateAssignment(element, j);
    }
    }

}

function htmlTemplateInProgress(element, i, priority) {
    return `<div onclick="boardOpenPopUpTask(${element['id']})" draggable="true" ondragstart="startDragging(${element['id']})" class="bgWhite2 cursorPointer boxShadow border rounded-5 p-2 my-3 d-flex flex-column align-items-start">
            <div class="textWhite border rounded-3 px-3 m-2" style="background-color:grey">
                ${element['category']}
            </div>
            <div class="mt-2 mx-2 bold">
                ${element['titel']}
            </div>
            <div class="mx-2 my-1">
                ${element['description']}
            </div>
            <div class="d-flex justify-content-between mx-2 my-1 w-100 pe-4">
                <div class="d-flex textWhite" id="assignedInProgress${i}"></div>
                <div>${priority}</div>
            </div>
        </div>`;
}

// --------------- AWAITING FEEDBACK --------------- \\
function renderAllAwaitingFeedback() {
    let stillAwaitingFeedback = tasks.filter(t => t['status'] == 'awaiting feedback');
    document.getElementById('awaitingFeedback').innerHTML = '';
    for (let i = 0; i < stillAwaitingFeedback.length; i++) {
        const element = stillAwaitingFeedback[i];
        document.getElementById('awaitingFeedback').innerHTML += htmlTemplateAwaitingFeedback(element, i, getPriority(element));
    
        let idAssigned = document.getElementById(`assignedAwaitingFeedback${i}`);
        idAssigned.innerHTML = "";  

        for (let j = 0; j < element['assigned'].length; j++) {
            idAssigned.innerHTML += htmlTemplateAssignment(element, j);
        }
    }
}

function htmlTemplateAwaitingFeedback(element, i, priority) {
    return `<div onclick="boardOpenPopUpTask(${element['id']})" draggable="true" ondragstart="startDragging(${element['id']})" class="bgWhite2 cursorPointer boxShadow border rounded-5 p-2 my-3 d-flex flex-column align-items-start">
        <div class="textWhite border rounded-3 px-3 m-2" style="background-color:grey">
            ${element['category']}
        </div>
        <div class="mt-2 mx-2 bold">
            ${element['titel']}
        </div>
        <div class="mx-2 my-1">
            ${element['description']}
        </div>
        <div class="d-flex justify-content-between mx-2 my-1 w-100 pe-4">
            <div class="d-flex textWhite" id="assignedAwaitingFeedback${i}"></div>
            <div>${priority}</div>
        </div>
    </div>`;
}

// --------------- DONE --------------- \\
function renderAllDone() {
    let isDone = tasks.filter(t => t['status'] == 'done');
    document.getElementById('done').innerHTML = '';
    for (let i = 0; i < isDone.length; i++) {
        const element = isDone[i];
        document.getElementById('done').innerHTML += htmlTemplateDone(element, i, getPriority(element));
    
        let idAssigned = document.getElementById(`assignedDone${i}`);
        idAssigned.innerHTML = "";  
        for (let j = 0; j < element['assigned'].length; j++) {
            idAssigned.innerHTML += htmlTemplateAssignment(element, j);
        }
    }
}

function htmlTemplateDone(element, i, priority) {
    return `<div onclick="boardOpenPopUpTask(${element['id']})" draggable="true" ondragstart="startDragging(${element['id']})" class="cursorPointer bgWhite2 boxShadow border rounded-5 p-2 my-3 d-flex flex-column align-items-start">
        <div class="textWhite border rounded-3 px-3 m-2" style="background-color:grey">
            ${element['category']}
        </div>
        <div class="mt-2 mx-2 bold">
            ${element['titel']}
        </div>
        <div class="mx-2 my-1">
            ${element['description']}
        </div>
        <div class="d-flex justify-content-between mx-2 my-1 w-100 pe-4">
            <div class="d-flex textWhite" id="assignedDone${i}"></div>
            <div>${priority}</div>
        </div>
    </div>`;
}

function startDragging(id) {
    currentDraggedElement = id;
}

function allowDrop(ev) {
    ev.preventDefault();
}

// function allowDrop(ev) {
//     ev.preventDefault();
// }

function moveTo(status) {
    tasks[currentDraggedElement]['status'] = status; // z.B. task mit id 1: Das Feld 'status' ändert sich von 'todo' zu 'in progress'
    updateHTML();
}

function boardOpenPopUpTask(i) {
    let element = tasks[i];
    document.getElementById('popUpBoard').classList.remove('dNone');
    document.getElementById('popUpBoard').innerHTML = '';
    document.getElementById('popUpBoard').innerHTML = htmlTemplatePopUpTask(i, getThePriority(element));
    document.getElementById('boardTasksMembers').innerHTML = '';
    for (let j = 0; j < element['assigned'].length; j++) {
        const element2 = element['assigned'][j];
        document.getElementById('boardTasksMembers').innerHTML += htmlTemplatePopUpMembers(element2);
    }
    
}

function boardClosePopUpTask() {
    document.getElementById('popUpBoard').classList.add('dNone');
}

function htmlTemplatePopUpTask(i, priority) {
    return `<div class="popUpBoardTask px-4 pt-4 pb-1 rounded-4 d-flex flex-column align-items-start">
        <img onclick="boardClosePopUpTask()" class="boardTaskClose cursorPointer" src="./img/close.svg" alt="close">
        <div class="boardTaskEdit d-flex">
            <img class="cursorPointer heightWidth35Px" src="./img/deleteButton.svg" alt="delete">
            <img class="cursorPointer heightWidth35Px" src="./img/editButton.svg" alt="edit">
        </div>
        <div style="background-color: grey;" class="textWhite px-3 rounded-2">category</div>
        <div class="size3Em bold">${tasks[i]['titel']}</div>
        <div class="pb-2">${tasks[i]['description']}</div>
        <div class="pb-2 d-flex">
            <div class="pe-3 bold">Due date:</div>
            <div>${tasks[i]['date']}</div>
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

function getThePriority(element) {
    let priority;
    if (element['prio'] == "urgent") {
        priority = '<img class="height35Px" src="./img/urgentPriority.png">';
    } else if (element['prio'] == "medium") {
        priority = '<img class="height35Px" src="./img/mediumPriority.png">';
    } else {
        priority = '<img class="height35Px" src="./img/lowPriority.png">';
    }
    ;
    return priority;
}

function htmlTemplatePopUpMembers(element2) {
    return `<div class="textWhite heightWidth45Px d-flex justify-content-center align-items-center border rounded-circle p-2 mb-3" style="background-color:grey">${element2}</div>
    `;
}

// searchInput.addEventListener('input', (e) => {
//     const value = e.target.value;
//     console.log(value);
// })