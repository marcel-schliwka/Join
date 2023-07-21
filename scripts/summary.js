function init() {
    setTime();
}

function setTime() {
    let theCurrentHour = currentHour();
    if (currentHour() < 10) {
        document.getElementById('whichHour').innerHTML = `Good morning,`;
    } else if (currentHour() < 14) {
        document.getElementById('whichHour').innerHTML = `Good day,`;
    } else if (currentHour() < 17) {
        document.getElementById('whichHour').innerHTML = `Good afternoon,`;
    } else {
        document.getElementById('whichHour').innerHTML = `Good evening,`
    }
}

function currentHour() {
    let date = new Date();
    return date.getHours();
}