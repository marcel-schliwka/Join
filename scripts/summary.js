let date = new Date();
let userObj;
let taskcount;
let deadlines = [];

async function initSummary() {
  userObj = await getLoggedInUser();
  updateHTML();
}

function updateHTML() {
  setTime();
  renderTaskCount();
  renderDeadline();
}

function renderDeadline() {
  findNextDeadline();
  const boardVariables = getBoardVariable();
  const urgentCount = countUrgentPrio();
  const deadlineDate = returnNextDeadline();
  boardVariables.urgent.innerText = urgentCount["urgent"];
  boardVariables.deadline.innerText = deadlineDate;
}

function findNextDeadline() {
  getDeadlineDates();
  returnNextDeadline();
}

function returnNextDeadline() {
  const deadlineDates = deadlines;
  const sortedDeadline = deadlineDates.sort();
  const closestDate = new Date(sortedDeadline[0]);
  let dateToFormat = closestDate.toISOString();
  let date = formateDate(dateToFormat);
  return date;
}

function formateDate(dateToFormat) {
  const date = dateToFormat;
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const year = date.substring(0, 4);
  const month = date.substring(6, 7);
  const day = date.substring(9, 10);

  let formatedMonth = months[month - 1];
  let formatedDay = day.toString().padStart(2, "0");
  let formatedDate = formatedMonth + " " + formatedDay + ", " + year;
  return formatedDate;
}

function getDeadlineDates() {
  const tasks = userObj.tasks;
  tasks.forEach((tasks) => {
    if (tasks["prio"] == "urgent") {
      deadlines.push(tasks["date"]);
    }
  });
}

function renderTaskCount() {
  taskcount = countStatus();
  const boardVariables = getBoardVariable();
  boardVariables.tasks.innerText = userObj.tasks.length;
  boardVariables.progress.innerText = taskcount["progress"];
  boardVariables.feedback.innerText = taskcount["feedback"];
  boardVariables.done.innerText = taskcount["done"];
  boardVariables.todo.innerText = taskcount["to do"];
  boardVariables.user.innerText = userObj.name;
}

function getBoardVariable() {
  const tasks = document.getElementById("task-count");
  const progress = document.getElementById("progress-count");
  const feedback = document.getElementById("feedback-count");
  const urgent = document.getElementById("urgent-count");
  const todo = document.getElementById("todo-count");
  const done = document.getElementById("done-count");
  const user = document.getElementById("welcome-user");
  const deadline = document.getElementById("urgent-deadline");
  return { tasks, progress, feedback, urgent, todo, done, user, deadline };
}

function countStatus() {
  let tasks = userObj.tasks;
  const statusCount = {
    "to do": 0,
    progress: 0,
    feedback: 0,
    done: 0,
  };
  tasks.forEach((tasks) => {
    const status = tasks.status;
    if (status in statusCount) {
      statusCount[status]++;
    }
  });
  return statusCount;
}

function countUrgentPrio() {
  const tasks = userObj.tasks;
  const urgentCount = {
    urgent: 0,
  };
  tasks.forEach((tasks) => {
    const prio = tasks.prio;
    if (prio in urgentCount) {
      urgentCount[prio]++;
    }
  });
  return urgentCount;
}

function setTime() {
  if (currentHour() < 10) {
    document.getElementById("whichHour").innerHTML = `Good morning,`;
  } else if (currentHour() < 14) {
    document.getElementById("whichHour").innerHTML = `Good day,`;
  } else if (currentHour() < 17) {
    document.getElementById("whichHour").innerHTML = `Good afternoon,`;
  } else {
    document.getElementById("whichHour").innerHTML = `Good evening,`;
  }
}

function currentHour() {
  let date = new Date();
  return date.getHours();
}

function currentDay() {
  return date.getDate();
}

function currentMonth() {
  let month = date.getMonth();
  if (month == 0) {
    return "January";
  } else if (month == 1) {
    return "February";
  } else if (month == 2) {
    return "March";
  } else if (month == 3) {
    return "April";
  } else if (month == 4) {
    return "May";
  } else if (month == 5) {
    return "June";
  } else if (month == 6) {
    return "July";
  } else if (month == 7) {
    return "August";
  } else if (month == 8) {
    return "September";
  } else if (month == 9) {
    return "October";
  } else if (month == 10) {
    return "November";
  } else if (month == 11) {
    return "December";
  }
}

function currentYear() {
  return date.getFullYear();
}

function whitePencil() {
  document.getElementById("pencil").src = "./img/whitePencil.svg";
}

function darkPencil() {
  document.getElementById("pencil").src = "./img/icon_pencil.svg";
}

function whiteOk() {
  document.getElementById("ok").src = "./img/whiteOk.svg";
}

function darkOk() {
  document.getElementById("ok").src = "./img/icon_ok.svg";
}
