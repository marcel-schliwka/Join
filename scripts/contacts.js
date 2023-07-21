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

let pastelColors = {
  A: "rgba(255, 209, 220, 1)", // Light Pink
  B: "rgba(255, 230, 186, 1)", // Light Peach
  C: "rgba(209, 235, 253, 1)", // Light Blue
  D: "rgba(255, 204, 153, 1)", // Light Orange
  E: "rgba(227, 242, 253, 1)", // Very Light Blue
  F: "rgba(224, 213, 255, 1)", // Very Light Purple
  G: "rgba(215, 253, 230, 1)", // Light Mint
  H: "rgba(251, 228, 228, 1)", // Light Salmon
  I: "rgba(252, 242, 221, 1)", // Light Yellow
  J: "rgba(239, 224, 245, 1)", // Light Lavender
  K: "rgba(231, 255, 233, 1)", // Light Mint Green
  L: "rgba(255, 207, 207, 1)", // Light Pink
  M: "rgba(255, 227, 208, 1)", // Light Peach
  N: "rgba(207, 227, 255, 1)", // Light Blue
  O: "rgba(255, 218, 179, 1)", // Light Orange
  P: "rgba(207, 240, 255, 1)", // Light Blue
  Q: "rgba(254, 223, 240, 1)", // Light Pink
  R: "rgba(252, 222, 222, 1)", // Light Salmon
  S: "rgba(222, 222, 255, 1)", // Very Light Purple
  T: "rgba(248, 218, 218, 1)", // Light Pink
  U: "rgba(255, 235, 153, 1)", // Light Yellow
  V: "rgba(236, 240, 255, 1)", // Very Light Blue
  W: "rgba(219, 249, 244, 1)", // Light Aqua
  X: "rgba(255, 242, 242, 1)", // Light Pink
  Y: "rgba(255, 240, 219, 1)", // Light Peach
  Z: "rgba(255, 224, 224, 1)", // Light Pink
};

let contacts;

let contactsSorted;

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
 *
 * @param {*} initials
 * @param {*} contacts
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