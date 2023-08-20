async function initHelp() {
  if (isUserLoggedIn()) {
    await includeHTML();
    userObj = await getLoggedInUser();
    renderTopLogo(userObj);
  } else {
    renderWithoutLogin();
  }
}
function goBack() {
  window.location.href = "summary.html";
}

function checkIfFromSignUp() {
  const queryString = window.location.search;
  const urlParam = new URLSearchParams(queryString);
  if (urlParam.get("signup") == "showPolicy") {
    return false;
  }
  return true;
}

function renderWithoutLogin() {
  document.querySelector(".help-section").style = "margin-left: 20px";
}
