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

function openCreateContact() {
    createDialogElements.createDialog.classList.remove('resp-none');
    createDialogElements.createDialog.classList.add('show-edit-dialog');
    dialogBackground.classList.remove('d-none');
  }
  
  function cancelCreateContact() {
    createDialogElements.createDialog.classList.add('resp-none');
    createDialogElements.createDialog.classList.remove('show-edit-dialog');
    dialogBackground.classList.add('d-none');
  }
  
  
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
  
  
  function capitalizeFirstLetterOfEveryWord(input) {
    return input
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }