async function initLegal() {
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

function renderWithoutLogin() {
  document.querySelector(".legal-notice-section").style = "margin-left: 20px";
}
