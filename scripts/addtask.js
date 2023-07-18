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





function clearTaskInput() {

}