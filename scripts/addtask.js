let currentPrio;

function addTask() {

}



function addPrio(button, prio) {
    let buttons = document.querySelectorAll('.add-task-prio-btn button');
    let images = {
        low: document.getElementById('lowImg'),
        medium: document.getElementById('mediumImg'),
        urgent: document.getElementById('urgentImg')
    };

    buttons.forEach(function (btn) {
        if(btn !== button) {
            btn.classList.remove('low-active', 'medium-active', 'urgent-active');
            lowImg.src = './img/prio_low_color.png';
            mediumImg.src = './img/prio_medium_color.png';
            urgentImg.src = './img/prio_urgent_color.png';
        }
    });
    button.classList.add(prio + '-active');
    images[prio].src = `./img/prio_${prio}.png`;
    currentPrio = prio;
}

function addInput() {
    const selector = document.getElementById('visableSelector');
    const input = document.getElementById('hiddenInput');
    input.classList.remove('d-none');
    selector.classList.add('d-none');
}



function clearTaskInput() {
    document.getElementById('visableSelector').value = '';
}

function handleCategoryChange(select) {
    var selectedOption = select.options[select.selectedIndex];
  
    if (selectedOption.value === "1") {
      var input = document.createElement('input');
      input.type = 'text';
      input.placeholder = 'Enter new category';
  
      var parentElement = select.parentNode; // Speichere das Elternelement
  
      input.addEventListener('blur', function() {
        if (input.value.trim() !== '') {
          var newOption = document.createElement('option');
          newOption.value = input.value;
          newOption.textContent = input.value;
          newOption.selected = true; // Setze die neue Option als ausgewählt
          select.insertBefore(newOption, select.lastChild);
        }
  
        parentElement.replaceChild(select, input); // Verwende das gespeicherte Elternelement
      });
  
      input.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
          input.blur();
        }
      });
  
      parentElement.replaceChild(input, select); // Verwende das gespeicherte Elternelement
      input.focus();
    }
  }