// Global Variables
const dialogContact = document.getElementById("dialogContact");
const dialogElements = {
  name: document.getElementById("dialog__name"),
  email: document.getElementById("dialog__email"),
  phone: document.getElementById("dialog__phone"),
  cardIndex: document.getElementById("dialog__cardIndex"),
  deleteBtn: document.getElementById("dialog__deleteBtn"),
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

let contacts = [
  {
    name: "Maximilian Lis",
    email: "lis@fotoka.com",
    number: "+4915797298172",
  },
  {
    name: "Andreas Loretto",
    email: "andreas.loretto@gmail.com",
    number: "+49150192298172",
  },
  {
    name: "Maria Rodriguez",
    email: "maria.rodriguez@example.com",
    number: "+34678901234",
  },
  {
    name: "Léa Dubois",
    email: "lea.dubois@example.com",
    number: "+33123456789",
  },
  {
    name: "John Smith",
    email: "john.smith@example.com",
    number: "+14155552678",
  },
  {
    name: "Satoshi Nakamoto",
    email: "satoshi@bitcoin.com",
    number: "+81345678901",
  },
  {
    name: "Marta Kowalska",
    email: "marta.kowalska@example.com",
    number: "+48123456789",
  },
  {
    name: "Luis García",
    email: "luis.garcia@example.com",
    number: "+34987654321",
  },
  {
    name: "Sophie Martin",
    email: "sophie.martin@example.com",
    number: "+33123456789",
  },
  {
    name: "Muhammad Khan",
    email: "muhammad.khan@example.com",
    number: "+92213567890",
  },
  {
    name: "Anna Müller",
    email: "anna.mueller@example.com",
    number: "+49123456789",
  },
  {
    name: "Javier Fernández",
    email: "javier.fernandez@example.com",
    number: "+34987654321",
  },
  {
    name: "Emma Wilson",
    email: "emma.wilson@example.com",
    number: "+441234567890",
  },
  {
    name: "Andrei Popescu",
    email: "andrei.popescu@example.com",
    number: "+40123456789",
  },
  {
    name: "Julia Petrova",
    email: "julia.petrova@example.com",
    number: "+79123456789",
  },
  {
    name: "Liam Murphy",
    email: "liam.murphy@example.com",
    number: "+353123456789",
  },
  {
    name: "Hiroshi Tanaka",
    email: "hiroshi.tanaka@example.com",
    number: "+819012345678",
  },
  {
    name: "Isabella Rossi",
    email: "isabella.rossi@example.com",
    number: "+39123456789",
  },
  {
    name: "Mohammed Ahmed",
    email: "mohammed.ahmed@example.com",
    number: "+201234567890",
  },
];

let contactsSorted;

function init() {
  renderContactList();
  startEventListener();
}

function renderContactList() {
  document.getElementById("contactsListContainer").innerHTML = "";

  sortInitialsGroup();
  renderInitials();
  generateCircleColor();
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

function openOverlayContact() {
  let overlay = document.getElementById("overlayContact");
  document.getElementById("overlayContact").classList.remove("d-none");
  overlay.classList.add(
    "pop-up-overlay",
    "position-absolute",
    "top-0",
    "start-0",
    "bottom-0",
    "end-0"
  );

  overlay.innerHTML = /*html*/ `
        <div class="custom-overlay-card" onclick="doNotClose(event)">
             
           <div class="contacts-overlay-left rounded-start px-46 py-66">
                <img src="./img/logo.png">
                <h1 style="color: white">Add contact</h1>
                <span style="color: white">Tasks are better with a team!</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="94" height="3" viewBox="0 0 94 3" fill="none">
                    <path d="M92 1.5L2 1.5" stroke="#29ABE2" stroke-width="3" stroke-linecap="round"/>
                </svg>
            </div>

           <div class="contacts-overlay-right">

                <div onclick="closeOverlay()">
                            <img class="click-to-close" src="./img/icon_clear.png">
                        </div>


                <div class="form-section">

                    <div class="input-container-left">
                        <img width="120px" height="120px" src="./img/icon_newContact.png" class="ms-20">
                    </div>

                    <div class="input-container-right">

                        <form id="contactForm">

                        <div class="contact-input">
                            <input id="formName" type="text" placeholder="Name">
                            <img class="contact-input-img" id="inputName" src="./img/form_name.png">
                        </div>

                        <div class="contact-input">
                            <input id="formEmail" type="email" placeholder="Email">
                            <img class="contact-input-img" id="inputEmail" src="./img/form_email.png">
                        </div>

                        <div class="contact-input position-relative">
                            <input id="formPhone" type="number" placeholder="Phone">
                            <img class="contact-input-img" id="inputPhone" src="./img/form_phone.png">
                        </div>
                        </form>

                        <div class="form-button">
                            <button class="contact-btn custom-lh-120" onclick="closeOverlay()">
                                <span>Cancel</span>
                                <img src="./img/icon_clear.png">
                            </button>

                            <button class="custom-btn fw-bold custom-lh-120" onclick="addNewContact()">
                                <span>Create contact</span>
                                <img src="./img/icon_check.png">
                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    `;
}

function closeOverlay() {
  document.getElementById("overlayContact").classList.add("d-none");
}

function doNotClose(event) {
  event.stopPropagation();
}

function addNewContact() {
  let name = document.getElementById("formName").value;
  let email = document.getElementById("formEmail").value;
  let phone = document.getElementById("formPhone").value;

  contacts.push({
    name: name,
    email: email,
    number: phone,
  });

  resetForm();
  closeOverlay();
  renderContactList();
}

function resetForm() {
  document.getElementById("contactForm").reset();
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
};

function openContact(card) {
  const cardId = card.getAttribute("id");
  dialogElements["fromCard"] = card;
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
  dialogElements.name.innerText = contact.name;
  dialogElements.email.innerText = contact.email;
  dialogElements.email.href = `mailto:${contact.email}`;
  dialogElements.phone.innerText = contact.number;
  dialogElements.phone.href = `tel:${contact.number}`;
}

function deleteContact() {
  dialogElements.fromCard.remove();
  dialogContact.close();
  console.log(
    "Spliced: ",
    contacts.splice(getContactIndex(dialogElements.name.innerText), 1)
  );
}
