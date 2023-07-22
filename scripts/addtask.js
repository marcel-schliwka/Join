




let categorys = [
  {
    name: 'Sales',
    color: '#FC71FF'
  },
  {
    name: 'Backoffice',
    color: '#38EAFF'
  },
  {
    name: 'Design',
    color: '#FFC701'
  }
];


function init() {
  renderCategory();
}

function renderCategory() {
  let category = document.getElementById('category-content');

  for (let i = 0; i < categorys.length; i++) {
    const category = categorys[i];
    category.innerHTML += `
    <option class="option pad-18-21">${category['name']}<div class="" style="color: ${category['color']}"></div> ></option>
    `;
  }
}




let tasks = [
  {
    titel: '',
    description: '',
    category: '',
    categoryColor: '',
    assigned: [],
    date: '',
    prio: '',
    subtasks: []
  }
];









function addTask() {

}


let currentPrio;

function getTaskPrio(button, priority) {
  const buttons = document.querySelectorAll('.prioBtn');
  let images = {
    low: document.getElementById('lowImg'),
    medium: document.getElementById('mediumImg'),
    urgent: document.getElementById('urgentImg')
  };

  buttons.forEach(function (btn) {
    if (btn.classList.contains(priority + '-active')) {
      btn.classList.remove(priority + '-active');
      currentPrio;
    } else if (btn !== button) {
      btn.classList.remove('low-active', 'medium-active', 'urgent-active');
      lowImg.src = './img/prio_low_color.png';
      mediumImg.src = './img/prio_medium_color.png';
      urgentImg.src = './img/prio_urgent_color.png';
    }    
  });
  button.classList.add(priority + '-active');
  images[priority].src = `./img/prio_${priority}.png`;
  currentPrio = priority;
}



