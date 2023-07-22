
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

let getContacts = [
  {
    name: 'Max Mustermann'
  },
  {
    name: 'Peter Lustig'
  }
]


function init() {
  renderContacts();
  renderCategorys();
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



function changeToInput(containerId, buttonId) {
  let cId = document.getElementById(containerId);
  let bId = document.getElementById(buttonId);
  cId.innerHTML = '';
  bId.innerHTML = '';

  cId.innerHTML += `
  <div>
    <input id="generatedInput" placeholder="Enter new contact" class="ol-none b-none">
  </div>
  `;

  bId.innerHTML += `
  <div>
  <button onclick="clearInput(this)" type="button"><img src="./img/cancel_icon.png"></button>
  <svg xmlns="http://www.w3.org/2000/svg" width="2" height="31" viewBox="0 0 2 31" fill="none">
  <path d="M1 0V31" stroke="#D1D1D1"/>
  </svg>
  <button type="button"><img src="./img/check_black_icon.png"></button>
  </div>`;
}







function renderContacts() {
  let contacts = document.getElementById('renderContacts');
  contacts.innerHTML = '';


  for (let i = 0; i < getContacts.length; i++) {
    const contact = getContacts[i];
    contacts.innerHTML += `
    <div>
      <li class="contact-item">${contact['name']} <a onclick="changeCheckbox(${i})"><img class="checkboxImg" id="checkboxImg${i}" src="./img/checkbox.png"></a></li>
    </div>
    `;
  }
}

function changeCheckbox(i) {
  let checkboxImg = document.getElementById(`checkboxImg${i}`);

  if (checkboxImg.getAttribute('src') === './img/checkbox.png') {
    checkboxImg.src = './img/checkbox_checked.png'
  } else {
    checkboxImg.src = './img/checkbox.png'
  }
}

function getAssignedContacts() {
  let test = document.querySelectorAll('.checkboxImg');
  for (let i = 0; i < test.length; i++) {
    const t = test[i];
    const source = t['currentSrc'];
    if (source.includes('/img/checkbox_checked.png')) {
      let index = i;
      console.log(getContacts[index]['name']);
    }
  }
}

function renderCategorys() {
  let category = document.getElementById('renderCategorys');
  category.innerHTML = '';
  category.innerHTML = `
  <div>
  <li onclick="changeToInput('category-input', 'category-button')">Add new category</li>
  </div>
  `;

  for (let i = 0; i < categorys.length; i++) {
    const cat = categorys[i];
    category.innerHTML += `<div>
    <li>${cat['name']} <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
    <circle cx="10" cy="10.5" r="9" fill="${cat['color']}" stroke="white" stroke-width="2" />
  </svg></li>
    
    </div>`;
  }
}


function clearInput(element) {
  let input = element.parentNode.parentNode.parentNode.querySelector('input');
  input.value = '';
}




