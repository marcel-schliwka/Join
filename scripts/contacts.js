let contacts = [
    {
        'name': 'Maximilian Lis',
        'email': 'lis@fotoka.com',
        'number': '+4915797298172',
    },
    {
        'name': 'Andreas Loretto',
        'email': 'andreas.loretto@gmail.com',
        'number': '+49150192298172',
    },
    {
        'name': 'Maria Rodriguez',
        'email': 'maria.rodriguez@example.com',
        'number': '+34678901234',
    },
    {
        'name': 'Léa Dubois',
        'email': 'lea.dubois@example.com',
        'number': '+33123456789',
    },
    {
        'name': 'John Smith',
        'email': 'john.smith@example.com',
        'number': '+14155552678',
    },
    {
        'name': 'Satoshi Nakamoto',
        'email': 'satoshi@bitcoin.com',
        'number': '+81345678901',
    },
    {
        'name': 'Marta Kowalska',
        'email': 'marta.kowalska@example.com',
        'number': '+48123456789',
    },
    {
        'name': 'Luis García',
        'email': 'luis.garcia@example.com',
        'number': '+34987654321',
    },
    {
        'name': 'Sophie Martin',
        'email': 'sophie.martin@example.com',
        'number': '+33123456789',
    },
    {
        'name': 'Muhammad Khan',
        'email': 'muhammad.khan@example.com',
        'number': '+92213567890',
    },
    {
        'name': 'Anna Müller',
        'email': 'anna.mueller@example.com',
        'number': '+49123456789',
    },
    {
        'name': 'Javier Fernández',
        'email': 'javier.fernandez@example.com',
        'number': '+34987654321',
    },
    {
        'name': 'Emma Wilson',
        'email': 'emma.wilson@example.com',
        'number': '+441234567890',
    },
    {
        'name': 'Andrei Popescu',
        'email': 'andrei.popescu@example.com',
        'number': '+40123456789',
    },
    {
        'name': 'Julia Petrova',
        'email': 'julia.petrova@example.com',
        'number': '+79123456789',
    },
    {
        'name': 'Liam Murphy',
        'email': 'liam.murphy@example.com',
        'number': '+353123456789',
    },
    {
        'name': 'Hiroshi Tanaka',
        'email': 'hiroshi.tanaka@example.com',
        'number': '+819012345678',
    },
    {
        'name': 'Isabella Rossi',
        'email': 'isabella.rossi@example.com',
        'number': '+39123456789',
    },
    {
        'name': 'Mohammed Ahmed',
        'email': 'mohammed.ahmed@example.com',
        'number': '+201234567890',
    }
]

let initialsContacts = [];

function init() {
    getInitialsPlusContact();
    renderContacts();
}

function renderContacts() {
    let container = document.getElementById('contactsList');

}

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

function createContact() {
    let name = document.getElementById('formName').value;
    let email = document.getElementById('formEmail').value;
    let phone = document.getElementById('formPhone').value;

    contacts.push({
        name: name,
        email: email,
        number: phone,
    });

    resetForm();
    closeOverlay()
}

function resetForm() {
    document.getElementById('contactForm').reset();
}

// *** to order contacts in groups by initials. 
function getInitialsPlusContact() {
    let initialsMap = new Map();
    contacts.forEach(obj => {
        let name = obj.name.trim();
        let initials = name.charAt(0);

        if (!initialsMap.has(initials)) {
            initialsMap.set(initials, []);
        }

        initialsMap.get(initials).push(obj);
    });

    console.table(initialsMap);

    return initialsMap;
}