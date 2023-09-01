let date = new Date();
let userObj;
let taskcount;
let deadlines = [];

/**
 * gets the logged-in user and gets the user object
 * then it updates the html accordingly
 */
async function initSummary() {
  userObj = await getLoggedInUser();
  updateHTML();
}

/**
 * Updates various HTML elements on the page with the latest information.
 * Calls functions to set the time-based greeting, render task count,
 * render deadline, and render the top logo using user information.
 *
 * @returns {void} This function does not return a value.
 */
function updateHTML() {
  setTime();
  renderTaskCount();
  renderDeadline();
  renderTopLogo(userObj);
}

/**
 * Renders the upcoming deadline information on the board.
 * Updates the urgent task count and displays the next deadline date.
 *
 * @returns {void} This function does not return a value.
 */
function renderDeadline() {
  findNextDeadline();
  const boardVariables = getBoardVariable();
  const urgentCount = countUrgentPrio();
  const deadlineDate = returnNextDeadline();
  boardVariables.urgent.innerText = urgentCount["urgent"];
  boardVariables.deadline.innerText = deadlineDate;
}

/**
 * Finds and prepares the next upcoming deadline date.
 * Retrieves and processes deadline dates using related functions.
 *
 * @returns {void} This function does not return a value.
 */
function findNextDeadline() {
  getDeadlineDates();
  returnNextDeadline();
}

/**
 * Returns the formatted next upcoming deadline date.
 * If there are no deadline dates, it returns a message indicating no deadline set.
 *
 * @returns {string} The formatted next upcoming deadline date or a "No deadline set" message.
 */
function returnNextDeadline() {
  const deadlineDates = deadlines;
  if (deadlineDates.length !== 0) {
    const sortedDeadline = deadlineDates.sort();
    const closestDate = new Date(sortedDeadline[0]);
    checkIfDeadlineExpired(closestDate);
    let dateToFormat = closestDate.toISOString();
    let date = formateDate(dateToFormat);
    return date;
  } else {
    return "No deadline set";
  }
}

/**
 * Formats a date string into a more human-readable format.
 *
 * @param {string} dateToFormat - The date string to be formatted (YYYY-MM-DD).
 * @returns {string} The formatted date in the format: Month Day, Year (e.g., "January 01, 2023").
 */
function formateDate(dateToFormat) {
  const date = new Date(dateToFormat);
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
  const year = date.getFullYear();
  let month = months[date.getMonth()];
  const day = date.getDate();

  let formatedDate = month + " " + day + ", " + year;
  return formatedDate;
}

function checkIfDeadlineExpired(date) {
  const today = new Date();
  if(today > date) {
    document.querySelector(".deadline-expired").innerText = "(Your last deadline is expired!)"
  }
}

/**
 * Retrieves valid deadline dates from user tasks and populates the 'deadlines' array.
 *
 * @returns {void} This function does not return a value.
 */
function getDeadlineDates() {
  const tasks = userObj.tasks;
  tasks.forEach((task) => {
    if (checkIfDateIsValid(task["date"])) {
      deadlines.push(task["date"]);
    }
  });
}

/**
 * Checks if a given date string is in the valid "YYYY-MM-DD" format.
 *
 * @param {string} date - The date string to be validated.
 * @returns {boolean} Returns true if the date is in valid format, otherwise false.
 */
function checkIfDateIsValid(date) {
  let dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  return dateRegex.test(date);
}

/**
 * Updates the task count displayed on the board for different status categories.
 * Retrieves task counts and board variables to update the UI elements.
 *
 * @returns {void} This function does not return a value.
 */
function renderTaskCount() {
  taskcount = countStatus();
  const boardVariables = getBoardVariable();
  boardVariables.tasks.innerText = userObj.tasks.length;
  boardVariables.progress.innerText = taskcount["in progress"];
  boardVariables.feedback.innerText = taskcount["awaiting feedback"];
  boardVariables.done.innerText = taskcount["done"];
  boardVariables.todo.innerText = taskcount["to do"];
  boardVariables.user.innerText = userObj.name;
}

/**
 * Retrieves references to various board-related HTML elements.
 *
 * @returns {Object} An object containing references to different board-related HTML elements.
 * @property {HTMLElement} tasks - The element displaying the total task count.
 * @property {HTMLElement} progress - The element displaying the "In Progress" task count.
 * @property {HTMLElement} feedback - The element displaying the "Awaiting Feedback" task count.
 * @property {HTMLElement} urgent - The element displaying the "Urgent" task count.
 * @property {HTMLElement} todo - The element displaying the "To Do" task count.
 * @property {HTMLElement} done - The element displaying the "Done" task count.
 * @property {HTMLElement} user - The element displaying the welcome message for the user.
 * @property {HTMLElement} deadline - The element displaying the upcoming deadline date.
 */
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

/**
 * Counts the number of tasks in different status categories.
 * Iterates through user tasks and tallies the tasks for each status.
 *
 * @returns {Object} An object containing the count of tasks for each status category.
 * @property {number} to do - The count of tasks marked as "To Do".
 * @property {number} in progress - The count of tasks marked as "In Progress".
 * @property {number} awaiting feedback - The count of tasks marked as "Awaiting Feedback".
 * @property {number} done - The count of tasks marked as "Done".
 */
function countStatus() {
  let tasks = userObj.tasks;
  const statusCount = {
    "to do": 0,
    "in progress": 0,
    "awaiting feedback": 0,
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

/**
 * Counts the number of tasks with urgent priority.
 * Iterates through user tasks and tallies tasks with "urgent" priority.
 *
 * @returns {Object} An object containing the count of tasks with "urgent" priority.
 * @property {number} urgent - The count of tasks marked with "urgent" priority.
 */
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

/**
 * Sets a time-based greeting on the page based on the current hour.
 * Uses the current hour to display a suitable greeting message.
 *
 * @returns {void} This function does not return a value.
 */
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

/**
 * Retrieves the current hour of the day.
 *
 * @returns {number} The current hour of the day (0-23).
 */
function currentHour() {
  let date = new Date();
  return date.getHours();
}

/**
 * Changes the source of an image to display a white checkmark icon.
 * Updates the source of an image element to display a white checkmark icon image.
 *
 * @returns {void} This function does not return a value.
 */
function whiteOk() {
  document.getElementById("ok").src = "./img/whiteOk.svg";
}

/**
 * Changes the source of an image to display a dark checkmark icon.
 * Updates the source of an image element to display a dark checkmark icon image.
 *
 * @returns {void} This function does not return a value.
 */
function darkOk() {
  document.getElementById("ok").src = "./img/icon_ok.svg";
}
