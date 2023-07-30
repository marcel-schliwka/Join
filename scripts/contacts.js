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
      const contact = contacts[c];
      let name = contact.name;
      let email = contact.email;
      // let firstLetter = contact.firstLetters;
      // let colorSign = firstLetter;
      groupContainer.innerHTML += /*html*/ `
        <div class="single-contact-card" id="card${c}">
            <div class="circle" id="${getColorSign(contact.name)}">
              ${getInitials(contact.name)}
            </div>

            <div class="info">
                <h4 class="info__name h4">${name}</h4>
                 <p>${email}</p>
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
  /* saving sontacts in sorted initials*/
  let initialsMap = groupInitials();
  /* converting initialsMap into an array of key-value and sorts the keys alphabetically (initials-contacts) */
  let sortedInitialsMap = new Map([...initialsMap.entries()].sort());
  /* passing sorted array to function to be sorted alphabetically within the keys (initials)*/
  let sortedContacts = sortContactsAlphabetically(sortedInitialsMap);
  /* assigning sortedContacts to global array: contactsSorted */
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
  mql.addEventListener('resize', screenTest, false);

  /* selecting all elements with class of single.contact-card to be saved in variable named cards*/
  let cards = document.querySelectorAll(".single-contact-card");
  /* iterating over each contact card */
  cards.forEach((card) => {
    /* storing the clicked contact in local variable named clickedCard*/
    let clickedCard = card;
    /* calling openContact() when contact card is clicked */
    card.addEventListener("click", () => openContact(clickedCard));
  });
  /* setting up event listeners for clicks on the specific buttons (delete + edit) */
  dialogElements.deleteBtn.addEventListener("click", () => deleteContact());
  dialogElements.editBtn.addEventListener("click", () => editContact());
  /* setting up event listener for clicks on the close button of the edit dialog */
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
  contactInfo.classList.remove('display-none', 'overflow-hidden');
  dialogOpenElements.forEach(dialog => {
    dialog.classList.remove('display-none');
  })

  /* getting the id of the specific card */
  const cardId = card.getAttribute("id");
  /* creating new propertes with values from card into dialogElements*/
  dialogElements["fromCard"] = card;
  dialogElements["initials"] = card.querySelector(".circle").innerText;
  dialogElements["circleColor"] = card
    .querySelector(".circle")
    .getAttribute("style");
  dialogElements["profilePic"] = document.querySelector(".dialog__circle");
  const infoCardName = card.querySelector(".info__name").innerText.trim();
  /* saving returned value of getContact() in local variable */
  let clickedContact = getContact(infoCardName);
  /* calling changeDialogInfo with the just saved variable and cardID */
  changeDialogInfo(clickedContact, cardId);
  /* showing the dialogContact-Element which is a global variable relating to HTML Element */
  dialogContact.show();
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
  /* adding class and naimation to edit-dialog-window */
  editDialogElements.editDialog.style.display = 'flex';
  editDialogElements.editDialog.classList.add("show-edit-dialog");
  /* removes display: none for background to be shown */
  dialogBackground.classList.remove("d-none");
  /* getting values of input fields and */
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
  editDialogElements.editDialog.classList.remove("show-edit-dialog");
  dialogBackground.classList.add("d-none");
}

/**
 * saving edited contact
 *
 * @function
 */
function saveEditDialog() {
  /* creating local variable with index of current contact */
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
  createDialogElements.createDialog.classList.add("show-edit-dialog");
  dialogBackground.classList.remove("d-none");
}

/**
 * cancelling creation of new contact
 *
 * @function
 */
function cancelCreateContact() {
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
  console.log(contacts)
  document.getElementById("createContactForm").reset();
  dialogBackground.classList.add("d-none");
  cancelCreateContact();
  renderContactList();
}

function capitalizeFirstLetterOfEveryWord(input) {
  return input.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

// Close dialog

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


// Responsive
const dialogOpenElements = document.querySelectorAll('dialog');
const mql = window.matchMedia('(max-width: 800px)');
const contactInfo = document.getElementById('contactsMain');
const respDialogCreateButton = document.getElementById('dialog__createSaveBtn');
// const respDialogAddContact = document.getElementById('resp_create_contact');


let responsiveStartEventListener = () => {
  /* selecting all elements with class of single.contact-card to be saved in variable named cards*/
  let cards = document.querySelectorAll(".single-contact-card");
  /* iterating over each contact card */
  cards.forEach((card) => {
    /* storing the clicked contact in local variable named clickedCard*/
    let clickedCard = card;
    /* calling openContact() when contact card is clicked */
    card.addEventListener("click", () => responsiveOpenContact(clickedCard));
  });
};

function screenTest(e) {
  if (e.matches) {
    responsiveStartEventListener();
    contactInfo.classList.add('d-none');
    respDialogCreateButton.addEventListener('click', responsiveCloseCreateContact);
    editDialogElements.closeDialog.addEventListener('click', responsiveCloseCreateContact);
    dialogOpenElements.forEach(dialog => {
      if (dialog.open) {
        // dialog.close();
        dialog.classList.add('d-none');
      }
    });
    document.getElementById('responsiveButton').classList.remove('d-none');
  } else {
    editDialogElements.closeDialog.removeEventListener('click', responsiveCloseCreateContact);
    respDialogCreateButton.removeEventListener('click', responsiveCloseCreateContact);
  }
}

screenTest(mql);
window.addEventListener('resize', () => screenTest(mql));

function responsiveOpenCreateContact() {
  dialogBackground.classList.remove('d-none');
  dialogBackground.addEventListener('click', () => responsiveCloseCreateContact());
  document.getElementById('openCreateContactLogo').classList.add('d-none');
  document.getElementById('dialog__createDeleteBtn').classList.add('d-none');
  document.getElementById('openCreateContactSeperator').classList.add('d-none');
  respDialogCreateButton.classList.remove('custom-btn');
  document.getElementById('responsiveSeperator').classList.remove('d-none');
  respDialogCreateButton.classList.add('custom-btn-resp');
  respDialogCreateButton.innerHTML = /*html*/`
    <span>Create Contact</span>
    <img src="./img/icon_check.png"></img>
  `;
  document.getElementById('dialog__createRightImg').classList.add('d-none');
  document.getElementById('dialog__createMiddleImg').classList.remove('d-none');
  createDialogElements.closeDialog.src = './img/close_white.svg';

  createDialogElements.createDialog.classList.remove('d-none');
  createDialogElements.createDialog.classList.add("show-edit-dialog");

}

function responsiveOpenContact(card) {
  document.getElementById('contactsMain').classList.remove('d-none');
  document.getElementById('dialogContact').classList.remove('d-none');
  document.getElementById('openCreateContactButton').classList.add('d-none');
  document.getElementById('dialog__Buttons').classList.add('d-none');
  document.getElementById('svgElement').classList.add('d-none');
  document.getElementById('seperatorResponsive').classList.remove('d-none');
  document.getElementById('subHeaderDialog').classList.add('fs-21');

  document.getElementById('contactsMain').innerHTML += /*html*/`
    <img id="arrowResponsive" src="./img/arrow_left_responsive.svg" class="position-absolute top-0 end-0 pt-20" onclick="responsiveCloseDialog()">
  `;
  document.getElementById('contactsMain').innerHTML += /*html*/`
  <button id="editResponsiveBtn" onclick="responsiveShowOptions()">
    <img onmouseover="hover(this);" onmouseout="unhover(this);" src="./img/edit_contact_responsive.svg">
  </button>
  <menu id="editOptions" class="d-none"></menu>
`;
}

function responsiveCloseCreateContact() {
  console.log('schließfunktion wird aufgerufen');
  dialogBackground.classList.add('d-none');
  contactInfo.classList.add('d-none');
  dialogOpenElements.forEach(dialog => {
    dialog.classList.add('d-none');
  });
  // document.getElementById('dialogContact').classList.add('d-none');
  // screenTest(mql);
}

function responsiveCloseDialog() {
  document.getElementById('contactsMain').classList.add('d-none');
  document.getElementById('arrowResponsive').remove();
  document.getElementById('editResponsiveBtn').remove();
  document.getElementById('editOptions').remove();
}

function hover(element) {
  element.setAttribute('src', './img/edit_contact_responsive_lightBlue.svg');
}

function unhover(element) {
  element.setAttribute('src', './img/edit_contact_responsive.svg');
}

function responsiveShowOptions() {
  document.getElementById('editResponsiveBtn').classList.add('d-none');
  let options = document.getElementById('editOptions');
  options.classList.remove('d-none');
  options.innerHTML = /*html*/`
  <div class="edit-options">

    <button onclick="responsiveEditContact()">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
    <mask id="mask0_71395_18215" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
      <rect width="24" height="24" fill="#D9D9D9"/>
    </mask>
    <g mask="url(#mask0_71395_18215)">
      <path d="M5 19H6.4L15.025 10.375L13.625 8.975L5 17.6V19ZM19.3 8.925L15.05 4.725L16.45 3.325C16.8333 2.94167 17.3042 2.75 17.8625 2.75C18.4208 2.75 18.8917 2.94167 19.275 3.325L20.675 4.725C21.0583 5.10833 21.2583 5.57083 21.275 6.1125C21.2917 6.65417 21.1083 7.11667 20.725 7.5L19.3 8.925ZM17.85 10.4L7.25 21H3V16.75L13.6 6.15L17.85 10.4Z" fill="#2A3647"/>
    </g>
    </svg>
    <span>Edit</span>
    </button>
    <button onclick="responsiveDeleteContact()">
    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
    <mask id="mask0_71395_18226" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="25" height="24">
      <rect x="0.5" width="24" height="24" fill="#D9D9D9"/>
    </mask>
    <g mask="url(#mask0_71395_18226)">
      <path d="M7.5 21C6.95 21 6.47917 20.8042 6.0875 20.4125C5.69583 20.0208 5.5 19.55 5.5 19V6C5.21667 6 4.97917 5.90417 4.7875 5.7125C4.59583 5.52083 4.5 5.28333 4.5 5C4.5 4.71667 4.59583 4.47917 4.7875 4.2875C4.97917 4.09583 5.21667 4 5.5 4H9.5C9.5 3.71667 9.59583 3.47917 9.7875 3.2875C9.97917 3.09583 10.2167 3 10.5 3H14.5C14.7833 3 15.0208 3.09583 15.2125 3.2875C15.4042 3.47917 15.5 3.71667 15.5 4H19.5C19.7833 4 20.0208 4.09583 20.2125 4.2875C20.4042 4.47917 20.5 4.71667 20.5 5C20.5 5.28333 20.4042 5.52083 20.2125 5.7125C20.0208 5.90417 19.7833 6 19.5 6V19C19.5 19.55 19.3042 20.0208 18.9125 20.4125C18.5208 20.8042 18.05 21 17.5 21H7.5ZM7.5 6V19H17.5V6H7.5ZM9.5 16C9.5 16.2833 9.59583 16.5208 9.7875 16.7125C9.97917 16.9042 10.2167 17 10.5 17C10.7833 17 11.0208 16.9042 11.2125 16.7125C11.4042 16.5208 11.5 16.2833 11.5 16V9C11.5 8.71667 11.4042 8.47917 11.2125 8.2875C11.0208 8.09583 10.7833 8 10.5 8C10.2167 8 9.97917 8.09583 9.7875 8.2875C9.59583 8.47917 9.5 8.71667 9.5 9V16ZM13.5 16C13.5 16.2833 13.5958 16.5208 13.7875 16.7125C13.9792 16.9042 14.2167 17 14.5 17C14.7833 17 15.0208 16.9042 15.2125 16.7125C15.4042 16.5208 15.5 16.2833 15.5 16V9C15.5 8.71667 15.4042 8.47917 15.2125 8.2875C15.0208 8.09583 14.7833 8 14.5 8C14.2167 8 13.9792 8.09583 13.7875 8.2875C13.5958 8.47917 13.5 8.71667 13.5 9V16Z" fill="#2A3647"/>
    </g>
    </svg>
    
    <span>Delete</span>
    </button>
    
  </div>
  `;
}

function responsiveDeleteContact() {
  dialogElements.fromCard.remove();
  contacts.splice(getContactIndex(dialogElements.name.innerText), 1);
  deleteInitial(dialogElements.name.innerText);
  responsiveCloseDialog();
  sortInitialsGroup();
}

function responsiveEditContact() {
  document.getElementById('openEditContactLogo').classList.add('d-none');
  document.getElementById('dialog__editRightImg').classList.add('d-none');
  editDialogElements.editDialog.classList.remove('d-none');
  dialogBackground.classList.remove("d-none");
  editDialogElements.closeDialog.src = './img/close_white.svg';
  
  dialogBackground.addEventListener('click', () => responsiveCloseEditContact());
  editDialogElements.inputName.value = dialogElements.name.innerText;
  editDialogElements.inputEmail.value = dialogElements.email.innerText;
  editDialogElements.inputPhone.value = dialogElements.phone.innerText;
}

function responsiveCloseEditContact() {
  editDialogElements.editDialog.classList.add('d-none');
  dialogBackground.classList.add("d-none");
}