// Global Variables
const dialogContact = document.getElementById("dialogContact");
const dialogBackground = document.querySelector('.background-dialog');

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
 * @typedef {Object} pastelColors 
 * @property {string} A..Z - Colors in rgba()
 * 
*/

/** @type {pastelColors} */
let pastelColors = {
  A: "rgba(104, 166, 148, 1)", // Light Pinkconst
  B: 'rgba(166, 145, 104, 1)', // Gold
  C: 'rgba(104, 120, 166, 1)', // Blue
  D: 'rgba(166, 141, 104, 1)', // Light Brown
  E: 'rgba(140, 166, 104, 1)', // Olive Green
  F: 'rgba(140, 104, 166, 1)', // Purple
  G: 'rgba(130, 166, 104, 1)', // Green
  H: 'rgba(166, 113, 104, 1)', // Salmon
  I: 'rgba(166, 158, 104, 1)', // Pale Yellow
  J: 'rgba(148, 104, 166, 1)', // Lavender
  K: 'rgba(104, 166, 132, 1)', // Mint Green
  L: 'rgba(166, 105, 123, 1)', // Reddish Pink
  M: 'rgba(166, 133, 104, 1)', // Peach
  N: 'rgba(104, 135, 166, 1)', // Dark Blue
  O: 'rgba(166, 123, 104, 1)', // Burnt Orange
  P: 'rgba(104, 161, 166, 1)', // Light Blue
  Q: 'rgba(166, 104, 154, 1)', // Magenta
  R: 'rgba(255, 166, 104, 1)', // Orange 
  S: 'rgba(115, 115, 166, 1)', // Dark Purple
  T: 'rgba(104, 166, 166, 1)', // Türkis 
  U: 'rgba(166, 166, 104, 1)', // Yellow
  V: 'rgba(104, 113, 166, 1)', // Dark Blue
  W: 'rgba(104, 160, 166, 1)', // Aqua
  X: 'rgba(166, 115, 115, 1)', // Dark Salmon
  Y: 'rgba(166, 140, 104, 1)', // Light Brown
  Z: 'rgba(166, 115, 115, 1)', // Dark Salmon
};

let contacts;

let contactsSorted;

/**
 * 
 *
 */
async function init() {
  authenticate();
  await loadUserContacts();
  renderContactList();
}

async function loadUserContacts() {
  try {
    contacts = await getItem(`${activeUser}_contacts`);

  } catch (error) {
    console.log('error');
    setItem(`${activeUser}_contacts`, '[]');
    contacts = await getItem(`${activeUser}_contacts`);
  }
}

function renderContactList() {
  document.getElementById("contactsListContainer").innerHTML = "";

  sortInitialsGroup();
  renderInitials();
  generateCircleColor();
  startEventListener();
  setItem(`${activeUser}_contacts`, JSON.stringify(contacts));
}


function getFirstLetters() {
  for (const value of contactsSorted.values()) {
    for (let i = 0; i < value.length; i++) {
      const fullName = value[i];
      const firstNameIni = fullName.name.charAt(0).toUpperCase();
      const lastNameIni = fullName.name
        .split(" ")
        .pop()
        .charAt(0)
        .toUpperCase();
      let firstLetters = firstNameIni + lastNameIni;
      fullName["firstLetters"] = firstLetters;
      fullName["colorInitial"] = lastNameIni;
    }
  }
}

/**
 *
 *
 */
function renderInitials() {
  getFirstLetters();
  let container = document.getElementById("contactsListContainer");

  
  for (const [key, value] of contactsSorted.entries()) {
    container.innerHTML += /*html*/ `
            <div id="containerLetter${key}" class="container-letter initial" >
                        ${key}
                <div>
                    <img src="./img/vectorContacts.png">
                </div>
            </div>
            `;
    renderContactsInGroup(key, value);
  }
}

/**
 * This function generates HTML as single-contacts-card for contactlist
 * 
 * @param {string} initials to find the right container for contact-cards to be rendered in
 * @param {string} contacts to deliver and generate all contact details 
 */
function renderContactsInGroup(initials, contacts) {
  for (let i = 0; i < initials.length; i++) {
    const initial = initials[i];
    let groupContainer = document.getElementById(`containerLetter${initial}`);

    for (let c = 0; c < contacts.length; c++) {
      const contact = contacts[c];
      let name = contact.name;
      let email = contact.email;
      let firstLetter = contact.firstLetters;
      let colorSign = contact.colorInitial;
      groupContainer.innerHTML += /*html*/ `
                <div class="single-contact-card" id="card${c}">
                    <div class="circle" id="${colorSign}">
                        ${firstLetter}
                    </div>

                    <div class="info">
                        <h4 class="info__name">${name}</h4>
                        <p>${email}</p>
                    </div>
                </div>
            `;
    }
  }
}

/**
 *
 *
 */
function generateCircleColor() {
  Object.keys(pastelColors).forEach((key) => {
    let colorValue = pastelColors[key];
    let colorSign = key;
    let elements = document.querySelectorAll(".circle");
    elements.forEach((element) => {
      if (element && element.id === colorSign) {
        element.style.backgroundColor = colorValue;
      }
    });
  });
}

function doNotClose(event) {
  event.stopPropagation();
}

/**
 * This function sorts contacts in groups by initials and pushes it into general variable 'initialsContacts'
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

function sortInitialsGroup() {
  let initialsMap = groupInitials();
  let sortedInitialsMap = new Map([...initialsMap.entries()].sort());
  let sortedContacts = sortContactsAlphabetically(sortedInitialsMap);
  contactsSorted = sortedContacts;
}

/**
 * 
 * @param {*} sortedInitialsMap 
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

function openContact(card) {
  const cardId = card.getAttribute("id");
  dialogElements["fromCard"] = card;
  dialogElements["initials"] = card.querySelector(".circle").innerText;
  dialogElements["circleColor"] = card
    .querySelector(".circle")
    .getAttribute("style");
  dialogElements["profilePic"] = document.querySelector(".dialog__circle");
  const infoCardName = card.querySelector(".info__name").innerText;
  let clickedContact = getContact(infoCardName);
  console.log(clickedContact);
  changeDialogInfo(clickedContact, cardId);
  dialogContact.show();
}

function getContact(searchedName) {
  let filteredContact = contacts.filter(
    (contact) => contact.name === searchedName
  );
  return filteredContact[0];
}

function getContactIndex(searchedName) {
  return contacts.findIndex((contact) => contact.name === searchedName);
}

function changeDialogInfo(contact) {
  dialogElements.profilePic.innerHTML = dialogElements.initials;
  dialogElements.profilePic.style = dialogElements.circleColor;
  dialogElements.name.innerText = contact.name;
  dialogElements.email.innerText = contact.email;
  dialogElements.email.href = `mailto:${contact.email}`;
  dialogElements.phone.innerText = contact.number;
  dialogElements.phone.href = `tel:${contact.number}`;
}

function deleteContact() {
  dialogElements.fromCard.remove();
  dialogContact.close();
  contacts.splice(getContactIndex(dialogElements.name.innerText), 1);
  renderContactList();
}

// Edit Contact

function editContact() {
  editDialogElements.editDialog.classList.add("show-edit-dialog");
  dialogBackground.classList.remove('d-none');
  editDialogElements.inputName.value = dialogElements.name.innerText;
  editDialogElements.inputEmail.value = dialogElements.email.innerText;
  editDialogElements.inputPhone.value = dialogElements.phone.innerText;
}

function closeEditDialog() {
  editDialogElements.editDialog.classList.remove("show-edit-dialog");
  dialogBackground.classList.add('d-none');
}

function saveEditDialog() {
  let index = getContactIndex(dialogElements.name.innerText);
  console.log(contacts[index].name);
  contacts[index].name = editDialogElements.inputName.value;
  contacts[index].email = editDialogElements.inputEmail.value;
  contacts[index].number = editDialogElements.inputPhone.value;
  renderContactList();
  changeDialogInfo(contacts[index]);
  closeEditDialog();
}

// Create Contact
function openCreateContact() {
  createDialogElements.createDialog.classList.add("show-edit-dialog");
  dialogBackground.classList.remove('d-none');
}

function cancelCreateContact() {
  createDialogElements.createDialog.classList.remove("show-edit-dialog");
  dialogBackground.classList.add('d-none');
}

function addNewContact() {
  contacts.push({
    name: createDialogElements.inputName.value,
    email: createDialogElements.inputEmail.value,
    number: createDialogElements.inputPhone.value,
  });
  dialogBackground.classList.add('d-none');
  cancelCreateContact();
  renderContactList();
}

// Close dialog

function closeDialog() {
  if (editDialogElements.editDialog.classList.contains('show-edit-dialog')) {
    closeEditDialog();
  } else if (createDialogElements.createDialog.classList.contains('show-edit-dialog')) {
    cancelCreateContact();
  }
} 