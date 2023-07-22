let tasks = [
    {
      titel: 'titel1',
      description: 'description1',
      category: 'category1',
      categoryColor: 'categoryColor1',
      assigned: ['me', 'you'],
      date: '01.03.22',
      prio: 'urgent',
      subtasks: []
    },
    {
        titel: 'titel2',
        description: 'description2',
        category: 'category2',
        categoryColor: 'categoryColor2',
        assigned: ['Maria', 'Peter'],
        date: '02.03.22',
        prio: 'urgent',
        subtasks: []
    }
];

function initBoard() {
    renderTasks();
}

function renderTasks(){
    document.getElementById('todo').innerHTML = "";
    for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];
        document.getElementById('todo').innerHTML += /*html*/`
        <div class="boxShadow border rounded-5 p-2 my-3 d-flex flex-column align-items-start">
            <div class="textWhite border rounded-3 px-3 m-2" style="background-color:grey">
                ${task['category']}
            </div>
            <div class="mt-2 mx-2 bold">
                ${task['titel']}
            </div>
            <div class="mx-2 my-1">
                ${task['description']}
            </div>
            <div class="d-flex justify-content-between mx-2 my-1 w-100 pe-4">
                <div>${task['assigned']}</div>
                <div>${task['prio']}</div>
            </div>
        </div>
        `;
        
    }
}