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

function openEditModal(modal) {
  modal.classList.remove("dNone");
  modal.classList.remove("out");
  modal.classList.add("in");
  document.getElementById("openEditModal").style.display = "flex";
  clearAll();
}

function redirect(url) {
  window.location.href = url;
}

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

function closeEditModal(modal) {
  // spliceStatusLocalStorage();
  modal.addEventListener("animationend", () => {
    if (modal.classList.contains("out")) {
      modal.style.display = "none";
    }
  });
  modal.classList.remove("in");
  modal.classList.add("out");
  document.getElementById("openEditModal").style.display = "none";
}
function showLoadingScreen() {
  // Create the spinner container
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

  // Create the actual spinner
  let spinnerInner = document.createElement("div");
  spinnerInner.style.border = "16px solid #f3f3f3";
  spinnerInner.style.borderTop = "16px solid #3498db";
  spinnerInner.style.borderRadius = "50%";
  spinnerInner.style.width = "120px";
  spinnerInner.style.height = "120px";
  spinnerInner.style.animation = "spin 2s linear infinite";

  spinnerContainer.appendChild(spinnerInner);

  // Append the spinner container to the body
  document.body.insertBefore(spinnerContainer, document.body.firstChild);
}

function deleteLoadingScreen() {
  let spinner = document.getElementById("loading-spinner");
  if (spinner) {
    spinner.parentNode.removeChild(spinner);
  }
  document.querySelector(".pageContent").style.display = "block";
}
