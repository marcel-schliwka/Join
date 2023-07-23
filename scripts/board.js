let tasks = [
    {   
        id: 0,
        status: 'todo',
        titel: 'titel1',
        description: 'description1',
        category: 'category1',
        categoryColor: 'categoryColor1',
        assigned: ['SM', 'MV'],
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
    } else {
        priority = '<img class="height40Px" src="./img/prioMedium.svg">';
    };
    return priority;
}

function htmlTemplateToDo(element, i, priority) {
    return `<div draggable="true" ondragstart="startDragging(${element['id']})" class="boxShadow border rounded-5 p-2 my-3 d-flex flex-column align-items-start">
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
    return `<div class="border rounded-circle p-2" style="background-color:grey">
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
    return `<div draggable="true" ondragstart="startDragging(${element['id']})" class="boxShadow border rounded-5 p-2 my-3 d-flex flex-column align-items-start">
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
    return `<div draggable="true" ondragstart="startDragging(${element['id']})" class="boxShadow border rounded-5 p-2 my-3 d-flex flex-column align-items-start">
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
    return `<div draggable="true" ondragstart="startDragging(${element['id']})" class="boxShadow border rounded-5 p-2 my-3 d-flex flex-column align-items-start">
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

// searchInput.addEventListener('input', (e) => {
//     const value = e.target.value;
//     console.log(value);
// })