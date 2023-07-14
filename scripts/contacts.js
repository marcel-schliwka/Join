function openOverlayContact() {
    let overlay = document.getElementById('overlayContact');
    overlay.classList.add('pop-up-overlay', 'position-absolute', 'top-0', 'start-0', 'bottom-0', 'end-0');
    
    overlay.innerHTML = /*html*/`
        <div class="custom-overlay-card px-46 py-66">

           <div class="contacts-overlay-left">
                <img src="./img/logo.png">
           </div>

           <div class="contacts-overlay-right">
            kontaktformular
           </div>

        </div>
    `;
}