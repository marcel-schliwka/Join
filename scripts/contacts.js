// Global Variables
const contactsMain = document.getElementById("contactsMain");
const dialogContact = document.getElementById("dialogContact");
const editDialogContact = document.getElementById("dialog__editContact");
const dialogBackground = document.querySelector(".background-dialog");

const dialogElements = {
  name: document.getElementById("dialog__name"),
  email: document.getElementById("dialog__email"),
  phone: document.getElementById("dialog__phone"),
  cardIndex: document.getElementById("dialog__cardIndex"),
  deleteBtn: document.getElementById("dialog__deleteBtn"),
  editBtn: document.getElementById("dialog__editBtn"),
};

const editDialogElements = {
  editDialog: document.getElementById("dialog__editContact"),
  inputName: document.getElementById("dialog__editNameInput"),
  inputEmail: document.getElementById("dialog__editEmailInput"),
  inputPhone: document.getElementById("dialog__editPhoneInput"),
  closeDialog: document.getElementById("dialog__editClose"),
  saveBtn: document.getElementById("dialog__saveBtn"),
  deleteBtn: document.getElementById("dialog__editDeleteBtn"),
};

const createDialogElements = {
  createDialog: document.getElementById("dialog__createContact"),
  closeDialog: document.getElementById("dialog__createClose"),
  inputName: document.getElementById("dialog__createNameInput"),
  inputEmail: document.getElementById("dialog__createEmailInput"),
  inputPhone: document.getElementById("dialog__createPhoneInput"),
};

/**
 * for generating colors according to initial of lastname
 * see {@link generateCircleColor()}
 * @typedef {Object} colors
 * @property {string} A..Z - Colors in rgba()
 *
 */

/** @type {Object} colors*/
let colors = {
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

let contacts;
let contactsSorted;

/**
 * initialization of authentification - loading UserContacts - rendering ContactList
 *
 * @async
 */
async function init() {
  authenticate();
  userObj = await getLoggedInUser();
  await loadUserContacts();
  renderContactList();
  hideDialogElements();
  renderTopLogo(userObj);
}

/**
 * loading userContacts from remote storage
 *
 * @async
 * @returns Object of contactList
 */
async function loadUserContacts() {
  contacts = userObj.contacts;
}

/**
 * rendering contactList in ContactListContainer
 *
 * @function
 * @returns void
 */
function renderContactList() {
  document.getElementById("contactsListContainer").innerHTML = "";

  sortInitialsGroup();
  renderInitials();
  generateCircleColor();
  startEventListener();
  setItem(userObj.email, JSON.stringify(userObj));
}

function hideDialogElements() {
  let dialogs = document.querySelectorAll("dialog");
  dialogs.forEach(function (dialog) {
    dialog.close();
  });
}

function addNewContactButton() {
  return `<button class="fw-bold custom-lh-120 custom-btn pos-btn" onclick="openCreateContact()">
  <span class="custom-fs-21">Add new contact</span>
  <img src="./img/icon_add_contact.png" alt="" />
</button>`;
}

/**
 * getting first letters of name and surname of contacts +
 * creating new object element for them to be available
 *
 * @function
 * @property {string} firstLetters - first letters of name + surname
 * @property {string} colorInitial - initial of surname
 */

/**
 * generating HTML with initials  of existing contacts as header to ContactList
 *
 * @function
 */
function renderInitials() {
  let container = document.getElementById("contactsListContainer");
  container.innerHTML = addNewContactButton();
  for (const [key, value] of contactsSorted.entries()) {
    container.innerHTML += generateInitialsContainer(key);
    renderContactsInContainer(key, value);
  }
}

/**
 * generating HTML as single-contacts-card for contactlist
 *
 * @param {string} initials to find the correct container for contact-cards to be rendered in
 * @param {string} contacts to deliver and generate all contact details
 */
function renderContactsInContainer(initials, contacts) {
  for (let i = 0; i < initials.length; i++) {
    const initial = initials[i];
    let groupContainer = document.getElementById(`containerLetter${initial}`);

    for (let c = 0; c < contacts.length; c++) {
      groupContainer.innerHTML += generateContactCard(contacts[c], c);
    }
  }
}
/**
 * generating color of circle in ContactList according to initial of surname
 *
 * @function
 */
function generateCircleColor() {
  Object.keys(colors).forEach((key) => {
    let colorValue = colors[key];
    let colorSign = key;
    let elements = document.querySelectorAll(".circle");
    elements.forEach((element) => {
      if (element && element.id === colorSign) {
        element.style.backgroundColor = colorValue;
      }
    });
  });
}

/**
 * sorting contacts in groups by initials and pushes it into general variable 'initialsContacts'
 * @param {object} initialsMap - a map of all contacts initials in groups
 */
function groupInitials() {
  let initialsMap = new Map();
  contacts.forEach((obj) => {
    let name = obj.name.trim();
    let initials = name.charAt(0);

    if (!initialsMap.has(initials)) {
      initialsMap.set(initials, []);
    }

    initialsMap.get(initials).push(obj);
  });

  return initialsMap;
}

/**
 * sorting a group of contacts based on their names initial
 *
 * @function
 * @returns updated global object: sortedContacts
 */
function sortInitialsGroup() {
  let initialsMap = groupInitials();
  let sortedInitialsMap = new Map([...initialsMap.entries()].sort());
  let sortedContacts = sortContactsAlphabetically(sortedInitialsMap);
  contactsSorted = sortedContacts;
}

/**
 * sorting Contacts withing group (key) alphabetically
 *
 * @param {Object} sortedInitialsMap
 * @returns the values of the Map in alphabetical order
 */
function sortContactsAlphabetically(sortedInitialsMap) {
  sortedInitialsMap.forEach((obj, initials) => {
    obj.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
  });
  return sortedInitialsMap;
}

// Open Contact

/**
 * setting up event listeners to single-ontact-cards in contactList as well as in the dialog-window and edit-dialog-window
 * @date 7/22/2023 - 3:04:10 PM
 */
let startEventListener = () => {
  let cards = document.querySelectorAll(".single-contact-card");
  cards.forEach((card) => {
    let clickedCard = card;
    card.addEventListener("click", () => openContact(clickedCard));
  });
  dialogElements.deleteBtn.addEventListener("click", () => deleteContact());
  dialogElements.editBtn.addEventListener("click", () => editContact());
  editDialogElements.deleteBtn.addEventListener("click", () => deleteContact());
  editDialogElements.closeDialog.addEventListener("click", () =>
    closeEditDialog()
  );
};

/**
 * opening dialog-window to show contact information
 *
 * @param {Object} card
 */
function openContact(card) {
  deleteActiveClass();
  card.classList.add("single-contact-card-active");
  contactsMain.classList.remove("contacts-none");
  contactsMain.classList.add("contacts-main");
  document.getElementById("buttonRespBack").classList.remove("d-none");
  const cardId = card.getAttribute("id");
  dialogElements["fromCard"] = card;
  dialogElements["initials"] = card.querySelector(".circle").innerText;
  dialogElements["circleColor"] = card
    .querySelector(".circle")
    .getAttribute("style");
  dialogElements["profilePic"] = document.querySelector(".dialog__circle");
  const infoCardName = card.querySelector(".info__name").innerText.trim();
  let clickedContact = getContact(infoCardName);
  changeDialogInfo(clickedContact, cardId);
  dialogContact.show();
}

function deleteActiveClass() {
  document.querySelectorAll(".single-contact-card-active").forEach((card) => {
    card.classList.remove("single-contact-card-active");
  });
}
/**
 * Displays the new contact's details in a dialog.
 * Sets the profile picture initials, background color, and updates the dialog's content.
 *
 * @param {string} name - The name of the contact to be displayed.
 */
function showNewContact(name) {
  let newContact = getContact(name);
  dialogContact.show();
  let profilePic = document.querySelector(".dialog__circle");
  profilePic.innerHTML = getInitials(name);
  profilePic.style.backgroundColor = `${colors[getColorSign(name)]}`;
  dialogElements.name.innerText = newContact.name;
  dialogElements.email.innerText = newContact.email;
  dialogElements.email.href = `mailto:${newContact.email}`;
  dialogElements.phone.innerText = newContact.number;
  dialogElements.phone.href = `tel:${newContact.number}`;
}

/**
 * Retrieves a contact from the contacts list based on the provided name.
 *
 * @param {string} searchedName - The name of the contact to search for.
 * @returns {Object} The contact object corresponding to the searched name.
 */
function getContact(searchedName) {
  let filteredContact = contacts.filter(
    (contact) => contact.name === searchedName
  );
  return filteredContact[0];
}

/**
 * getting index of current contact-card
 *
 * @param {string} searchedName
 * @return {number}
 */
function getContactIndex(searchedName) {
  return contacts.findIndex((contact) => contact.name === searchedName);
}

/**
 * generating style and rendering HTML for dialog-window with contact information
 *
 * @function
 * @param {Object} contact
 */
function changeDialogInfo(contact) {
  dialogElements.profilePic.innerHTML = dialogElements.initials;
  dialogElements.profilePic.style = dialogElements.circleColor;
  dialogElements.name.innerText = contact.name;
  dialogElements.email.innerText = contact.email;
  dialogElements.email.href = `mailto:${contact.email}`;
  dialogElements.phone.innerText = contact.number;
  dialogElements.phone.href = `tel:${contact.number}`;
}

/**
 * deleting contact from contactList and remote storage
 *
 * @function
 */
function deleteContact() {
  dialogElements.fromCard.remove();
  dialogContact.close();
  editDialogContact.classList.add("resp-none");
  dialogBackground.classList.add("d-none");
  contacts.splice(getContactIndex(dialogElements.name.innerText), 1);
  deleteInitial(dialogElements.name.innerText);
}

function deleteInitial(name) {
  let initial = name.trim().charAt(0).toUpperCase();
  let initialDiv = document.getElementById(`containerLetter${initial}`);
  if (initialDiv && initialDiv.children.length === 0) {
    initialDiv.remove();
  }
  renderContactList();
}

// Edit Contact

/**
 * editing contact within edit-dialog-window
 *
 * @function
 */
function editContact() {
  editDialogElements.editDialog.classList.remove("resp-none");
  editDialogElements.editDialog.classList.add("show-edit-dialog");
  dialogBackground.classList.remove("d-none");
  editDialogElements.inputName.value = dialogElements.name.innerText;
  editDialogElements.inputEmail.value = dialogElements.email.innerText;
  editDialogElements.inputPhone.value = dialogElements.phone.innerText;
}

/**
 * closing edit-dialog-window
 *
 * @function
 */
function closeEditDialog() {
  editDialogElements.editDialog.classList.add("resp-none");
  editDialogElements.editDialog.classList.remove("show-edit-dialog");
  dialogBackground.classList.add("d-none");
}

/**
 * saving edited contact
 *
 * @function
 */
function saveEditDialog() {
  let index = getContactIndex(dialogElements.name.innerText);
  contacts[index].name = capitalizeFirstLetterOfEveryWord(
    editDialogElements.inputName.value
  );
  contacts[index].email = editDialogElements.inputEmail.value.trim();
  contacts[index].number = editDialogElements.inputPhone.value.trim();
  renderContactList();
  changeDialogInfo(contacts[index]);
  closeEditDialog();
}

// Create Contact
/**
 * opening create-dialog-window
 *
 * @function
 */
function openCreateContact() {
  createDialogElements.createDialog.classList.remove("resp-none");
  createDialogElements.createDialog.classList.add("show-edit-dialog");
  dialogBackground.classList.remove("d-none");
}

/**
 * cancelling creation of new contact
 *
 * @function
 */
function cancelCreateContact() {
  createDialogElements.createDialog.classList.add("resp-none");
  createDialogElements.createDialog.classList.remove("show-edit-dialog");
  dialogBackground.classList.add("d-none");
}

/**
 * adding new conact to contactList and to array in remote storage
 * closing create-dialog-window
 * rendering contactList with new contact
 *
 * @function
 */
function addNewContact() {
  let inputName = createDialogElements.inputName.value.trim();
  inputName = capitalizeFirstLetterOfEveryWord(inputName);
  contacts.push({
    name: inputName,
    email: createDialogElements.inputEmail.value.trim(),
    number: createDialogElements.inputPhone.value.trim(),
  });
  document.getElementById("createContactForm").reset();
  dialogBackground.classList.add("d-none");
  cancelCreateContact();
  renderContactList();
  showTopDown("Contact created!");
  showNewContact(inputName);
}

/**
 * This function is capitalizing the names of input values to generate
 * proper initial for contact list
 *
 * @param {string} input
 * @return {string}
 *
 * @function
 */
function capitalizeFirstLetterOfEveryWord(input) {
  return input
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/**
 * closing edit-dialog-window and create-dialog-window
 *
 * @function
 */
function closeDialog() {
  if (editDialogElements.editDialog.classList.contains("show-edit-dialog")) {
    closeEditDialog();
  } else if (
    createDialogElements.createDialog.classList.contains("show-edit-dialog")
  ) {
    cancelCreateContact();
  }
}

/**
 * show and close options-menu in responsive design
 *
 * @function
 */
function showResponsiveOptions() {
  document
    .getElementById("responsiveOptionsContacts")
    .classList.remove("d-none");
}

function closeResponsiveOptions() {
  document.getElementById("responsiveOptionsContacts").classList.add("d-none");
}

function closeWindow() {
  contactsMain.classList.add("contacts-none");
  contactsMain.classList.remove("contacts-main");
  document.getElementById("buttonRespBack").classList.add("d-none");
  editDialogElements.editDialog.classList.add("resp-none");
}
