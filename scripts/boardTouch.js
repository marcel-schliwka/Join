// Drag and Drop for mobile devices with touch events

let startTouchElement;
let moveTouchElement;
let endedOnTouchElement;
let currentTouchId;
let selectedElement = null;
let pressTimer = null;
let initialTouchOffsetX, initialTouchOffsetY;
let initialScrollLeft, initialScrollTop;

/**
 * Handles the start of a touch event.
 * Initializes touch attributes and sets up a timer to detect a long press.
 * @param {TouchEvent} e - The touch event.
 */
function handleTouchStart(e) {
  e.preventDefault();
  initializeTouchAttributes(e);
  pressTimer = initiateLongPress(e);
}

/**
 * Handles touch move events.
 * Adjusts the position of the card being moved and clears any long press timers.
 * @param {TouchEvent} e - The touch event.
 */
function handleTouchMove(e) {
  e.preventDefault();
  clearPressTimer();
  adjustCardOnMove(e);
}

/**
 * Handles the end of a touch event.
 * Clears any long press timers and finalizes the card move.
 * @param {TouchEvent} e - The touch event.
 */
function handleTouchEnd(e) {
  e.preventDefault();
  clearPressTimer();
  finalizeCardMove(e);
}

/**
 * Initializes touch event listeners for mobile drag and drop functionality on moveable cards.
 */
function startTouchEventListener() {
  document.querySelectorAll(".moveableCard").forEach((card) => {
    card.addEventListener("touchstart", handleTouchStart, false);
    card.addEventListener("touchmove", handleTouchMove);
    card.addEventListener("touchend", handleTouchEnd, false);
  });
}

/**
 * Initializes the necessary attributes for touch functionality.
 * @param {TouchEvent} e - The touch event.
 */
function initializeTouchAttributes(e) {
  startTouchElement = e.target.closest(".moveableCard");
  selectedElement = startTouchElement;
  let rect = startTouchElement.getBoundingClientRect();
  initialTouchOffsetX = e.touches[0].clientX - rect.left;
  initialTouchOffsetY = e.touches[0].clientY - rect.top;
  initialScrollLeft = window.scrollX;
  initialScrollTop = window.scrollY;

  checkIfElementIsValid(startTouchElement);

  currentStatus = startTouchElement.getAttribute("status");
  currentTitel = startTouchElement.getAttribute("titel");
  currentTouchId = startTouchElement.getAttribute("currentId");
  if (selectedElement) {
    selectedElement.style.transform = "scale(1.1) rotate(5deg)";
    selectedElement.style.transition = "transform 125ms ease-in-out";
  }
}

/**
 * Initiates a long press timer to detect if the user is holding down on a card.
 * @param {TouchEvent} e - The touch event.
 * @returns {number} The timer ID.
 */
function initiateLongPress(e) {
  return window.setTimeout(function () {
    if (selectedElement && selectedElement.getAttribute("status")) {
      selectedElement.style.left = `${
        initialTouchOffsetX - initialScrollLeft
      }px`;
      selectedElement.style.top = `${initialTouchOffsetY - initialScrollTop}px`;
      selectedElement.style.width = "auto";
      selectedElement.style.height = "auto";
      selectedElement.style.position = "static";
      selectedElement.style.transform = "none";
      selectedElement.style.pointerEvents = "auto";
      selectedElement = null;
    }
    boardOpenPopUpTask(currentTouchId, startTouchElement);
  }, 400);
}

/**
 * Adjusts the position of the card being dragged based on the user's touch movement.
 * @param {TouchEvent} e - The touch event.
 */
function clearPressTimer() {
  if (pressTimer !== null) {
    window.clearTimeout(pressTimer);
    pressTimer = null;
  }
}

/**
 * Finalizes the position of the card after being dragged and dropped.
 * @param {TouchEvent} e - The touch event.
 */
function adjustCardOnMove(e) {
  if (selectedElement && selectedElement.getAttribute("status")) {
    selectedElement.style.width = `${selectedElement.offsetWidth}px`;
    selectedElement.style.height = `${selectedElement.offsetHeight}px`;
    selectedElement.style.position = "absolute";
    selectedElement.style.pointerEvents = "none";
  }
  let touch = e.touches[0];
  let touchY = touch.clientY;
  if (touchY > window.innerHeight - 500) {
    window.scrollBy(0, 20);
  }
  moveTouchElement = document.elementFromPoint(touch.clientX, touch.clientY);

  if (selectedElement) {
    selectedElement.style.left = `${
      touch.clientX - initialTouchOffsetX + initialScrollLeft
    }px`;
    selectedElement.style.top = `${
      touch.clientY - initialTouchOffsetY + initialScrollTop
    }px`;
  }
}

/**
 * Finalizes the position of the card after being dragged and dropped.
 * @param {TouchEvent} e - The touch event.
 */
function finalizeCardMove(e) {
  let touch = e.changedTouches[0];
  endedOnTouchElement = document.elementFromPoint(touch.clientX, touch.clientY);

  if (selectedElement) {
    selectedElement.style.pointerEvents = "auto";
  }

  selectedElement = null;
  moveElementToNewColumn();
}

function startTouchEventListener() {
  document.querySelectorAll(".moveableCard").forEach((card) => {
    card.addEventListener("touchstart", handleTouchStart, false);
    card.addEventListener("touchmove", handleTouchMove);
    card.addEventListener("touchend", handleTouchEnd, false);
  });
}

/**
 * Moves the selected card element to a new column based on where it was dropped.
 */
function moveElementToNewColumn() {
  let dropStatus = endedOnTouchElement.getAttribute("status");
  if (!dropStatus) {
    updateHTML();
    return 0;
  }
  moveTo(dropStatus, startTouchElement);
}

/**
 * Checks if the provided element has a valid status attribute.
 * @param {HTMLElement} element - The element to check.
 * @returns {boolean} Returns false if the element does not have a status attribute, otherwise no return.
 */
function checkIfElementIsValid(element) {
  if (!element.getAttribute("status")) {
    return false;
  }
}
