async function initPrivacy() {
  if (isUserLoggedIn()) {
    await includeHTML();
    userObj = await getLoggedInUser();
    renderTopLogo(userObj);
  } else {
    renderWithoutLogin();
  }
}
function goBack() {
  window.history.back();
}

function renderWithoutLogin() {
  document.querySelector(".privacy-section").style = "margin-left: 20px";
}
