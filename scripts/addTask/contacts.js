const contactsMain = document.getElementById('contactsMain');
const dialogContact = document.getElementById('dialogContact');
const editDialogContact = document.getElementById('dialog__editContact');
const dialogBackground = document.querySelector('.background-dialog');
const createDialogElements = {
    createDialog: document.getElementById('dialog__createContact'),
    closeDialog: document.getElementById('dialog__createClose'),
    inputName: document.getElementById('dialog__createNameInput'),
    inputEmail: document.getElementById('dialog__createEmailInput'),
    inputPhone: document.getElementById('dialog__createPhoneInput'),
};


/**
 * Opens the create contact dialog.
 */
function openCreateContact() {
    createDialogElements.createDialog.classList.remove('resp-none');
    createDialogElements.createDialog.classList.add('show-edit-dialog');
    dialogBackground.classList.remove('d-none');
}

/**
 * Cancels the create contact dialog.
 */
function cancelCreateContact() {
    createDialogElements.createDialog.classList.add('resp-none');
    createDialogElements.createDialog.classList.remove('show-edit-dialog');
    dialogBackground.classList.add('d-none');
}

/**
 * Adds a new contact to the user's contact list.
 * @param {Event} e - The event object from the form submission.
 */
function addNewContact(e) {
    e.preventDefault();
    let inputName = createDialogElements.inputName.value.trim();
    inputName = capitalizeFirstLetterOfEveryWord(inputName);
    dialogBackground.classList.add('d-none');
    cancelCreateContact();
    showTopDown('Contact created!');
    userObj.contacts.push({
        name: inputName,
        email: createDialogElements.inputEmail.value.trim(),
        number: createDialogElements.inputPhone.value.trim(),
    });
    setItem(userObj.email, JSON.stringify(userObj));
    document.getElementById('createContactForm').reset();
    renderContacts();
}

/**
 * Capitalizes the first letter of every word in the input string.
 * @param {string} input - The input string to capitalize.
 * @returns {string} The input string with first letters of each word capitalized.
 */
function capitalizeFirstLetterOfEveryWord(input) {
    return input
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}