function openModal(modal) {
  let w = window.innerWidth;
  if (w < 950) {
    redirect('addTask.html')
  } else {
    modal.classList.remove("dNone");
    modal.classList.remove("out");
    modal.classList.add("in");
    document.querySelector(".modal-backdrop").style.display = "flex";
    clearAll();
  }
}

function openEditModal(modal) {
  modal.classList.remove('dNone');
  modal.classList.remove('out');
  modal.classList.add('in');
  document.getElementById('openEditModal').style.display = 'flex';
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
