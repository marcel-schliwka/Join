function openOverlayContact() {
    let overlay = document.getElementById('overlayContact');
    document.getElementById('overlayContact').classList.remove('d-none');
    overlay.classList.add('pop-up-overlay', 'position-absolute', 'top-0', 'start-0', 'bottom-0', 'end-0');

    overlay.innerHTML = /*html*/`
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
                <img src="./img/icon_clear.png">

                <div class="form-section">

                    <div class="input-container-left">
                        <img width="120px" height="120px" src="./img/icon_newContact.png" class="ms-20">
                    </div>

                    <div class="input-container-right">

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

                        <div class="form-button">
                            <button class="contact-btn custom-lh-120">
                                <span>Cancel</span>
                                <img src="./img/icon_clear.png">
                            </button>

                            <button class="custom-btn fw-bold custom-lh-120" onclick="createContact()">
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
    document.getElementById('overlayContact').classList.add('d-none');
}

function doNotClose(event) {
    event.stopPropagation();
}
