let activeUser;

/**
 * Authenticates the user based on the presence of an 'activeUser' in the local storage.
 * If the 'activeUser' is not found, it redirects the user to the 'index.html' page.
 */
function authenticate() {
  if (localStorage.getItem("activeUser")) {
    activeUser = localStorage.getItem("activeUser");
  } else {
    window.location.href = "index.html";
  }
}
