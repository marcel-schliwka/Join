// Global Variables
const dialogContact = document.getElementById("dialogContact");
const dialogBackground = document.querySelector(".background-dialog");
let userObj;

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
  deleteBtn: document.getElementById("dialog__deleteBtn"),
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

  for (const [key, value] of contactsSorted.entries()) {
    container.innerHTML += /*html*/ `
            <div id="containerLetter${key}">
              <div class="container-letter initial">
                <span>${key}</span>
              </div>
                      
                <div>
                    <img src="./img/vectorContacts.png">
                </div>
            </div>
            `;
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
      groupContainer.innerHTML += /*html*/ `
        <div class="single-contact-card" id="card${c}">
            <div class="circle" id="${getColorSign(contacts[c]["name"])}">
              ${getInitials(contacts[c]["name"])}
            </div>

            <div class="info">
                <h4 class="info__name">${contacts[c]["name"]}</h4>
                 <p>${contacts[c]["email"]}</p>
            </div>
         </div>
      `;
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
  document.getElementById("contactsMain").classList.remove("contacts-none");
  document.getElementById("contactsMain").classList.add("contacts-main");
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

function showNewContact(name) {
  let newContact = getContact(name);
  dialogContact.show();
  let profilePic = document.querySelector(".dialog__circle");
  profilePic.innerHTML = getInitials(name);
  profilePic.style.backgroundColor = `${colors[getColorSign(name)]}`;
  debugger;
  dialogElements.name.innerText = newContact.name;
  dialogElements.email.innerText = newContact.email;
  dialogElements.email.href = `mailto:${newContact.email}`;
  dialogElements.phone.innerText = newContact.number;
  dialogElements.phone.href = `tel:${newContact.number}`;

}

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
  contacts.splice(getContactIndex(dialogElements.name.innerText), 1);
  deleteInitial(dialogElements.name.innerText);
}

function deleteInitial(name) {
  let initial = name.trim().charAt(0).toUpperCase();
  let initialDiv = document.getElementById(`containerLetter${initial}`);
  if (initialDiv.children.length == 0) {
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
  /* changing values in contacts array at the index with the values from input field */
  contacts[index].name = editDialogElements.inputName.value;
  contacts[index].email = editDialogElements.inputEmail.value;
  contacts[index].number = editDialogElements.inputPhone.value;
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
  document.getElementById("contactsMain").classList.add("contacts-none");
  document.getElementById("contactsMain").classList.remove("contacts-main");
  document.getElementById("buttonRespBack").classList.add("d-none");
  editDialogElements.editDialog.classList.add("resp-none");
}
