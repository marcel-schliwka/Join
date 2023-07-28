function openModal(modal) {
  modal.classList.remove("out");
  modal.classList.add("in");
  document.querySelector(".modal-backdrop").style.display = "flex";
}

function closeModal(modal) {
  modal.addEventListener("animationend", () => {
    if (modal.classList.contains("out")) {
      modal.style.display = "none";
    }
  });
  modal.classList.remove("in");
  modal.classList.add("out");
  document.querySelector(".modal-backdrop").style.display = "none";
}
