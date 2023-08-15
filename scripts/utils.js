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
        return;
      }
    }
    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
}
function renderTopLogo(userObj) {
  setTimeout(() => {
    let initials = capitalizeFirstLetterOfEveryWord(getInitials(userObj.name));
    document.getElementById("logo-text-initials").innerText = initials;
    return initials;
  }, 10);
}

function capitalizeFirstLetterOfEveryWord(input) {
  return input
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/**
 * Hashes a given password using SHA-256.
 * @async
 * @param {string} password - The plain text password to be hashed.
 * @returns {Promise<string>} - The hashed password as a hexadecimal string.
 */
async function hashPassword(password) {
  const msgUint8 = new TextEncoder().encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashedPassword = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return hashedPassword;
}

/**
 * Extracts the first character from the last word of a given name.
 * @param {string} name - The name from which to extract the sign.
 * @returns {string} The extracted sign character.
 */
function getColorSign(name) {
  const colorSign = name.split(" ").pop().charAt(0).toUpperCase();
  return colorSign;
}

/**
 * Redirects the browser to a given URL and clears the status from local storage.
 * @param {string} url - The URL to which to redirect.
 */
function redirect(url) {
  spliceStatusLocalStorage();
  window.location.href = url;
}

/**
 * Event listener for the window's 'load' event.
 * If the page was reloaded, the status is removed from local storage using the
 * modern PerformanceNavigationTiming interface.
 */
window.addEventListener("load", function () {
  let navigationEntries = performance.getEntriesByType("navigation");
  if (navigationEntries.length > 0 && navigationEntries[0].type === "reload") {
    spliceStatusLocalStorage();
  }
});

/** @type {Object} colors*/
let MemberColors = {
  A: "rgba(104, 166, 148, 1)", // Light Pinkconst
  B: "rgba(166, 145, 104, 1)", // Gold
  C: "rgba(104, 120, 166, 1)", // Blue
  D: "rgba(222, 111, 13, 1)", // Light Brown
  E: "rgba(140, 166, 104, 1)", // Olive Green
  F: "rgba(140, 104, 166, 1)", // Purple
  G: "rgba(130, 166, 104, 1)", // Green
  H: "rgba(166, 113, 104, 1)", // Salmon
  I: "rgba(166, 158, 104, 1)", // Pale Yellow
  J: "rgba(148, 104, 166, 1)", // Lavender
  K: "rgba(104, 166, 132, 1)", // Mint Green
  L: "rgba(166, 105, 123, 1)", // Reddish Pink
  M: "rgba(166, 133, 104, 1)", // Peach
  N: "rgba(104, 135, 166, 1)", // Dark Blue
  O: "rgba(166, 123, 104, 1)", // Burnt Orange
  P: "rgba(104, 161, 166, 1)", // Light Blue
  Q: "rgba(166, 104, 154, 1)", // Magenta
  R: "rgba(255, 166, 104, 1)", // Orange
  S: "rgba(115, 115, 166, 1)", // Dark Purple
  T: "rgba(104, 166, 166, 1)", // Türkis
  U: "rgba(166, 166, 104, 1)", // Yellow
  V: "rgba(104, 113, 166, 1)", // Dark Blue
  W: "rgba(104, 160, 166, 1)", // Aqua
  X: "rgba(166, 115, 115, 1)", // Dark Salmon
  Y: "rgba(166, 140, 104, 1)", // Light Brown
  Z: "rgba(166, 115, 115, 1)", // Dark Salmon
};

/**
 * Handles key press events and invokes provided functions based on the key pressed.
 *
 * @param {Event} event - The key press event object.
 * @param {Function} f1 - The function to be invoked when the 'Enter' key is pressed.
 * @param {Function} f2 - The function to be invoked when the 'Escape' key is pressed.
 */
function handleKeyPress(event, f1, f2) {
  if (event.key === "Enter") {
    f1();
    event.preventDefault();
  } else if (event.key === "Escape") {
    f2();
    event.target.value = "";
  }
}
