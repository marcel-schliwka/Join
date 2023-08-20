/**
 * Opens a modal. If the window width is less than 950, redirects to the "addtask.html" page.
 *
 * @param {HTMLElement} modal - The modal element to be opened.
 */
function openModal(modal) {
  let w = window.innerWidth;
  if (w < 950) {
    redirect("addtask.html");
  } else {
    modal.classList.remove("dNone");
    modal.classList.remove("out");
    modal.classList.add("in");
    document.querySelector(".modal-backdrop").style.display = "flex";
    clearAll();
  }
}

/**
 * Opens an edit modal.
 *
 * @param {HTMLElement} modal - The edit modal element to be opened.
 */
function openEditModal(modal) {
  modal.classList.remove("dNone");
  modal.classList.remove("out");
  modal.classList.add("in");
  document.getElementById("openEditModal").style.display = "flex";
  clearAll();
}

/**
 * Redirects the user to the specified URL.
 *
 * @param {string} url - The URL to redirect to.
 */
function redirect(url) {
  window.location.href = url;
}

/**
 * Closes the provided modal with an animation.
 *
 * @param {HTMLElement} modal - The modal element to be closed.
 */
function closeModal(modal) {
  spliceStatusLocalStorage();
  modal.addEventListener("animationend", () => {
    if (modal.classList.contains("out")) {
      modal.style.display = "none";
    }
  });
  modal.classList.remove("in");
  modal.classList.add("out");
  document.querySelector(".modal-backdrop").style.display = "none";
}

/**
 * Closes the edit modal with an animation.
 *
 * @param {HTMLElement} modal - The edit modal element to be closed.
 */
function closeEditModal(modal) {
  modal.addEventListener("animationend", () => {
    if (modal.classList.contains("out")) {
      modal.style.display = "none";
    }
  });
  modal.classList.remove("in");
  modal.classList.add("out");
  document.getElementById("openEditModal").style.display = "none";
}

/**
 * Displays a loading spinner on the screen.
 */

function showLoadingScreen() {
  let spinnerContainer = document.createElement("div");
  spinnerContainer.id = "loading-spinner";
  spinnerContainer.style.position = "fixed";
  spinnerContainer.style.top = "50%";
  spinnerContainer.style.left = "50%";
  spinnerContainer.style.width = "100vw";
  spinnerContainer.style.height = "100vh";
  spinnerContainer.style.right = "0";
  spinnerContainer.style.bottom = "0";
  spinnerContainer.style.backgroundColor = "white";
  spinnerContainer.style.display = "flex";
  spinnerContainer.style.justifyContent = "center";
  spinnerContainer.style.alignItems = "center";

  let spinnerInner = document.createElement("div");
  spinnerInner.style.border = "16px solid #f3f3f3";
  spinnerInner.style.borderTop = "16px solid #3498db";
  spinnerInner.style.borderRadius = "50%";
  spinnerInner.style.width = "120px";
  spinnerInner.style.height = "120px";
  spinnerInner.style.animation = "spin 2s linear infinite";

  spinnerContainer.appendChild(spinnerInner);

  document.body.insertBefore(spinnerContainer, document.body.firstChild);
}

/**
 * Removes the loading spinner from the screen and displays the page content.
 */
function deleteLoadingScreen() {
  let spinner = document.getElementById("loading-spinner");
  if (spinner) {
    spinner.parentNode.removeChild(spinner);
  }
  document.querySelector(".pageContent").style.display = "block";
}
