let date = new Date();

function init() {
    setTime();
    setDate();
}

function setTime() {
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

function setDate() {
    let currentDate = currentMonth() + ' ' + currentDay() + ', ' + currentYear();
    document.getElementById('whichDate').innerHTML = currentDate;
}

function currentDay() {
    return date.getDate();
}

function currentMonth() {
    let month = date.getMonth();
    if (month == 0) {
        return 'January';
    } else if (month == 1) {
        return 'February';
    } else if (month == 2) {
        return 'March';
    } else if (month == 3) {
        return 'April';
    } else if (month == 4) {
        return 'May';
    } else if (month == 5) {
        return 'June';
    } else if (month == 6) {
        return 'July';
    } else if (month == 7) {
        return 'August';
    } else if (month == 8) {
        return 'September';
    } else if (month == 9) {
        return 'October';
    } else if (month == 10) {
        return 'November';
    } else if (month == 11) {
        return 'December';
    };
}

function currentYear() {
    return date.getFullYear();
}