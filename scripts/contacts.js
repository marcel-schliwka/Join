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
            kontaktformular
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
