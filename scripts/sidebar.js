/**
 * Asynchronously loads and includes HTML content from external files into the main document.
 * Elements that are meant to include external HTML content should have the attribute "w3-include-html" set to the path of the external file.
 * If the file is found and loaded successfully, the content will replace the innerHTML of the element.
 * If the file is not found, "Page not found" will be set as the innerHTML of the element.
 */
async function includeHTML() {
  let includeElements = document.querySelectorAll("[w3-include-html]");
  for (let i = 0; i < includeElements.length; i++) {
    const element = includeElements[i];
    file = element.getAttribute("w3-include-html"); // "includes/header.html"
    let resp = await fetch(file);
    if (resp.ok) {
      element.innerHTML = await resp.text();
      markSiteAsActive();
    } else {
      element.innerHTML = "Page not found";
    }
  }
}

/**
 * Marks the current site as active by adding the "activeSite" class to the appropriate element based on the site's name.
 * The site name is determined by parsing the current window's location.
 * @function
 */
function markSiteAsActive() {
  try {
    let siteName = getSiteName();
    if (siteName == "summary") {
      document.querySelector(".summary-site").classList.add("activeSite");
    }
    if (siteName == "board") {
      document.querySelector(".board-site").classList.add("activeSite");
    }
    if (siteName == "addtask") {
      document.querySelector(".addtask-site").classList.add("activeSite");
    }
    if (siteName == "contacts") {
      document.querySelector(".contact-site").classList.add("activeSite");
    }
  } catch (e) {
    console.info(
      "Sidebar: Site could not set as active! Only in testing eviroment."
    );
  }
}

/**
 * Retrieves the site name from the current window's URL.
 * @returns {string} The site name extracted from the URL.
 */
function getSiteName() {
  let url = window.location.href;
  return url.split("/")[3].split(".")[0];
}

let isDropdownOpen = false;

function toggleHiddenDropdown() {
  let menu = document.getElementById("sidebarDropdown");
  menu.classList.remove("display-none");

  if (!isDropdownOpen) {
    // Fügen Sie den Event-Listener hinzu, wenn das Dropdown zum ersten Mal geöffnet wird
    document.addEventListener("click", closeHiddenDropdown);
    isDropdownOpen = true;
  }
}

/**
 * Closes the hidden dropdown menu if a click event occurs outside the dropdown or the sidebar menu.
 * The menu is hidden by adding the "display-none" class to the "sidebarDropdown" element.
 * @param {Event} event - The DOM event triggered by the user's click.
 * @function
 */
function closeHiddenDropdown(event) {
  let dropdown = document.getElementById("sidebarDropdown");
  let menu = document.getElementById("hiddenSidebarMenu");

  if (!dropdown.contains(event.target) && !menu.contains(event.target)) {
    dropdown.classList.add("display-none");
    document.removeEventListener("click", closeHiddenDropdown); // Entfernen Sie den Event-Listener
    isDropdownOpen = false;
  }
}

/**
 * Logs out the user by removing the "activeUser" item from the local storage and redirects to "index.html".
 * @function
 */
function logout() {
  localStorage.removeItem("activeUser");
  window.location.href = "index.html";
}

document.addEventListener("click", closeHiddenDropdown);
