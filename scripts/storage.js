const STORAGE_TOKEN = "YA5AI1KSZUL2OELGAKVPWF5KK7DZGD3EG6IRP7VM";
const STORAGE_URL = "https://remote-storage.developerakademie.org/item";

/**
 * Stores a key-value pair to a remote storage using a POST request.
 *
 * @param {string} key - The key under which the value should be stored.
 * @param {*} value - The value to be stored.
 * @returns {Promise<Object>} A promise that resolves with the JSON response from the storage service.
 */
async function setItem(key, value) {
  const PAYLOAD = { key, value, token: STORAGE_TOKEN };
  return fetch(STORAGE_URL, {
    method: "POST",
    body: JSON.stringify(PAYLOAD),
  }).then((res) => res.json());
}

/**
 * Retrieves a value from remote storage using the provided key.
 *
 * @param {string} key - The key for which to retrieve the value.
 * @returns {Promise<*>} A promise that resolves with the value associated with the given key, or rejects with an error message.
 */
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

/**
 * Retrieves the logged-in user's data. If no user is logged in, redirects to the index page.
 * @returns {Promise<Object|number>} A promise that resolves with the user object or 1 if no active user is found.
 */
async function getLoggedInUser() {
  const activeUser = localStorage.getItem("activeUser");
  if (!activeUser) {
    window.location.href = "index.html";
    return 1;
  }
  let userObj = await getItem(activeUser);
  return userObj;
}

/**
 * Extracts initials from a given name.
 * @param {string} name - The full name from which to extract initials.
 * @returns {string} The extracted initials from the name.
 */
function getInitials(name) {
  const nameParts = name.trim().split(" ");
  if (nameParts.length === 1) {
    return nameParts[0][0];
  } else {
    return nameParts[0][0] + nameParts[1][0];
  }
}

/**
 * Saves a status to local storage.
 * @param {*} value - The status value to be saved.
 */
function saveStatusLocalstorage(value) {
  let statusAsText = JSON.stringify(value);
  localStorage.setItem("status", statusAsText);
}

/**
 * Removes the status from local storage.
 */
function spliceStatusLocalStorage() {
  localStorage.removeItem("status");
}

/**
 * Retrieves a status from local storage and logs it to the console.
 * @returns {*} The status retrieved from local storage.
 */
function getStatusLocalStorage() {
  let statusAsText = JSON.parse(localStorage.getItem("status"));
  console.log(statusAsText);
  return statusAsText;
}
