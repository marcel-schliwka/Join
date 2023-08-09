// This file contains universal Javascript funktion which can be used in different places
// utils.js

function showTopDown(message) {
  // Erstellen Sie das popup-Element
  const popup = document.createElement("div");
  popup.id = "topdownMessages";
  document.body.appendChild(popup);

  // Stil für das popup-Element
  Object.assign(popup.style, {
    padding: "10px",
    backgroundColor: "#2a3647",
    color: "white",
    width: "30%",
    borderRadius: "10px",
    textAlign: "center",
    position: "absolute",
    left: "35%",
    top: "100px",
    opacity: "0",
  });

  // Nachricht setzen
  popup.innerHTML = message;

  // Animation hinzufügen
  let startTime;
  function animate(time) {
    if (!startTime) startTime = time;
    const elapsed = time - startTime;

    if (elapsed < 1000) {
      popup.style.opacity = (elapsed / 1000) * 1;
    } else if (elapsed < 4000) {
      popup.style.opacity = 1;
    } else {
      popup.style.opacity = 1 - (elapsed - 4000) / 1000;
      if (elapsed > 5000) {
        popup.remove();
        return; // Beenden Sie die Animation, indem Sie die Funktion nicht erneut aufrufen
      }
    }
    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
}
function renderTopLogo(userObj) {
  setTimeout(() => {
    let initials = getInitials(userObj.name);
    document.getElementById("logo-text-initials").innerText = initials;
    return initials;
  }, 10);
}
