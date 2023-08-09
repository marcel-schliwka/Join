const STORAGE_TOKEN = "H008M2YASL1GFSNW0JS2OI128KHFJ5NOTPN6FWMY";
const STORAGE_URL = "https://remote-storage.developerakademie.org/item";

async function setItem(key, value) {
  const PAYLOAD = { key, value, token: STORAGE_TOKEN };
  return fetch(STORAGE_URL, {
    method: "POST",
    body: JSON.stringify(PAYLOAD),
  }).then((res) => res.json());
}

async function getItem(key) {
  const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
  return fetch(url)
    .then((res) => res.json())
    .then((res) => {
      // Verbesserter code
      if (res.data) {
        return JSON.parse(res.data.value);
      }
      throw `Could not find data with key "${key}".`;
    });
}

async function getLoggedInUser() {
  const activeUser = localStorage.getItem("activeUser");
  if (!activeUser) {
    window.location.href = "index.html";
    return 1;
  }
  let userObj = await getItem(activeUser);
  return userObj;
}

function getInitials(name) {
  const nameParts = name.trim().split(" ");
  if (nameParts.length === 1) {
    return nameParts[0][0];
  } else {
    return nameParts[0][0] + nameParts[1][0];
  }
}

function getColorSign(name) {
  const colorSign = name.split(' ').pop().charAt(0).toUpperCase();
  return colorSign;
}

function redirect(url) {
  spliceStatusLocalStorage();
  window.location.href = url;
}

function saveStatusLocalstorage(value) {
  let statusAsText = JSON.stringify(value);
  localStorage.setItem('status', statusAsText);
}

function spliceStatusLocalStorage() {
  localStorage.removeItem('status');
}

function getStatusLocalStorage() {
  let statusAsText = JSON.parse(localStorage.getItem('status'));
  console.log(statusAsText);
  return statusAsText;
}

window.addEventListener('load', function () {
  if (performance.navigation.type == performance.navigation.TYPE_RELOAD) {
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