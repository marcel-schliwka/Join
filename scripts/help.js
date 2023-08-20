/**
 * Initializes the help section. If the user is logged in, it includes the necessary HTML and renders the top logo.
 * If the user is not logged in, it renders the section without login.
 *
 * @async
 * @returns {Promise<void>} - A promise that resolves when the initialization is complete.
 */
async function initHelp() {
  if (isUserLoggedIn()) {
    await includeHTML();
    userObj = await getLoggedInUser();
    renderTopLogo(userObj);
  } else {
    renderWithoutLogin();
  }
}

/**
 * Navigates the user back to the summary page.
 */
function goBack() {
  window.location.href = "summary.html";
}

/**
 * Checks if the current page was accessed from the sign-up page with a specific query parameter.
 *
 * @returns {boolean} - Returns false if the page was accessed with the query parameter "signup=showPolicy", otherwise true.
 */
function checkIfFromSignUp() {
  const queryString = window.location.search;
  const urlParam = new URLSearchParams(queryString);
  if (urlParam.get("signup") == "showPolicy") {
    return false;
  }
  return true;
}

/**
 * Adjusts the style of the help section when the user is not logged in.
 */
function renderWithoutLogin() {
  document.querySelector(".help-section").style = "margin-left: 20px";
}
