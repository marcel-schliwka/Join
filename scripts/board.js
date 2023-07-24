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

let contacts;
let currentDraggedElement;

async function initBoard() {
    await loadUserContacts();
    updateHTML();
    // generateCircleColor();
}

async function loadUserContacts() {
    try {
        contacts = await getItem('guest_contacts');
        console.log(contacts);
    } catch {
        console.log('error');
    }
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
    return `<div class="circle margin-4 heightWidth45Px d-flex justify-content-center align-items-center border rounded-circle p-2" style="background-color:grey">
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
        <img onclick="boardClosePopUpTask()" class="boardTaskClose cursorPointer" src="./img/closeIt.svg" alt="close">
        <div class="boardTaskEdit d-flex">
            <img class="cursorPointer heightWidth35Px" src="./img/deleteButton.svg" alt="delete">
            <img onclick="editTheTask(${i})" class="cursorPointer heightWidth35Px" src="./img/editButton.svg" alt="edit">
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

function searchTask(){
    let search = document.getElementById('boardInput').value;
    search = search.toLowerCase();
    renderSearchTodo(search);
    renderSearchInProgress(search);
    renderSearchAwaitingFeedback(search);
    renderSearchDone(search);
}

function renderSearchTodo(search) {
    let stillToDo = tasks.filter(t => t['status'] == 'todo');
    debugger;
    document.getElementById('todo').innerHTML = '';

    for (let i = 0; i < stillToDo.length; i++) {
        let title = stillToDo[i].titel;
        let description = stillToDo[i].description;
        if (title.toLowerCase().includes(search) || description.toLowerCase().includes(search)) {
                const element = stillToDo[i];
                document.getElementById('todo').innerHTML += htmlTemplateToDo(element, i, getPriority(element));
                
                let idAssigned = document.getElementById(`assignedToDo${i}`);
        
                idAssigned.innerHTML = "";  
        
                for (let j = 0; j < element['assigned'].length; j++) {
                    idAssigned.innerHTML += htmlTemplateAssignment(element, j);
                }
        }
    }
}

function renderSearchInProgress(search) {
    let stillInProgress = tasks.filter(t => t['status'] == 'in progress');
    document.getElementById('inProgress').innerHTML = '';

    for (let i = 0; i < stillInProgress.length; i++) {
        let title = stillInProgress[i].titel;
        let description = stillInProgress[i].description;
        if (title.toLowerCase().includes(search) || description.toLowerCase().includes(search)) {
                const element = stillInProgress[i];
                document.getElementById('inProgress').innerHTML += htmlTemplateInProgress(element, i, getPriority(element));
                
                let idAssigned = document.getElementById(`assignedInProgress${i}`);
        
                idAssigned.innerHTML = "";  
        
                for (let j = 0; j < element['assigned'].length; j++) {
                    idAssigned.innerHTML += htmlTemplateAssignment(element, j);
                }
        }
    }
}

function renderSearchAwaitingFeedback(search) {
    let stillAwaitingFeedback = tasks.filter(t => t['status'] == 'awaiting feedback');
    document.getElementById('awaitingFeedback').innerHTML = '';
    for (let i = 0; i < stillAwaitingFeedback.length; i++) {
        let title = stillAwaitingFeedback[i].titel;
        let description = stillAwaitingFeedback[i].description;
        if (title.toLowerCase().includes(search) || description.toLowerCase().includes(search)) {
            const element = stillAwaitingFeedback[i];
            document.getElementById('awaitingFeedback').innerHTML += htmlTemplateAwaitingFeedback(element, i, getPriority(element));
            
            let idAssigned = document.getElementById(`assignedAwaitingFeedback${i}`);
    
            idAssigned.innerHTML = "";  
    
            for (let j = 0; j < element['assigned'].length; j++) {
                idAssigned.innerHTML += htmlTemplateAssignment(element, j);
            }
        }
    }
}

function renderSearchDone(search) {
    let isDone = tasks.filter(t => t['status'] == 'done');
    document.getElementById('done').innerHTML = '';
    for (let i = 0; i < isDone.length; i++) {
        let title = isDone[i].titel;
        let description = isDone[i].description;
        if (title.toLowerCase().includes(search) || description.toLowerCase().includes(search)) {
            const element = isDone[i];
            document.getElementById('done').innerHTML += htmlTemplateDone(element, i, getPriority(element));
            
            let idAssigned = document.getElementById(`assignedDone${i}`);
    
            idAssigned.innerHTML = "";  
    
            for (let j = 0; j < element['assigned'].length; j++) {
                idAssigned.innerHTML += htmlTemplateAssignment(element, j);
            }
        }
    }
}

function boardOpenDialog() {
    let openDialog = document.getElementById('boardOpenDialog');
    openDialog.show();
}

function editTheTask(i) {
    document.getElementById('popUpBoard').innerHTML = '';
    document.getElementById('popUpBoard').innerHTML = `
    <div class="popUpBoardTask popUpBoardTask2 ps-4 pt-4 pb-1 rounded-4 d-flex flex-column align-items-start">  
        <img onclick="boardClosePopUpTask()" class="boardTaskClose cursorPointer" src="./img/closeIt.svg" alt="close">
        <img class="boardTaskEdit height35Px cursorPointer" src="./img/okBtnDarkRectangle.png" alt="OK">
        <div class="w-100 pb-3">
            <div>Title</div>
            <input class="py-2 px-3 outlineNone borderLightGrey rounded-2 w-100" id="inputTitel" class="w-100">
        </div>
        <div class="pb-3 w-100">
            <div>Description</div>
            <textarea class="py-2 px-3 outlineNone borderLightGrey rounded-2 w-100" id="textareaDescription" class="w-100"></textarea>
        </div>
        <div class="pb-3 w-100">
            <div>Due date</div>
            <div class="d-flex align-items-center">
                <input class="py-2 px-3 outlineNone borderLightGrey rounded-2 w-100">
                <img class="cursorPointer marginLeft-30Px height20Px" src="./img/boardCalendar.png">
            </div>
        </div>
        <div class="pb-3">
            <div>Prio</div>
            <div class="d-flex">
                <img class="height45Px cursorPointer" src="./img/urgentPrioRectangle.png">
                <img class="height45Px cursorPointer" src="./img/mediumPrioRectangle.png">
                <img class="height45Px cursorPointer" src="./img/lowPrioRectangle.png">
            </div>
        </div>
        <div class="pb-3 w-100">
            <div>Assigned to</div>
            <select class="py-2 px-3 outlineNone borderLightGrey rounded-2 w-100">
                <option>1</option>
                <option>2</option>
            </select>
        </div>
    </div>  
    `;
    let titelInput = tasks[i]['titel'];
    document.getElementById('inputTitel').value = titelInput;
    let descriptionTextArea = tasks[i]['description'];
    document.getElementById('textareaDescription').value = descriptionTextArea;

}