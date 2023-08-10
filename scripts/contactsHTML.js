function generateInitialsContainer(key) {
    return /*html*/ `
        <div id="containerLetter${key}">
            <div class="container-letter initial">
                <span>${key}</span>
            </div>
                      
            <div>
                <img src="./img/vectorContacts.png">
            </div>
        </div>
        `;
}

function generateContactCard(contact, index) {
    return /*html*/`
        <div class="single-contact-card" id="card${index}">
            <div class="circle" id="${getColorSign(contact["name"])}">
              ${getInitials(contact["name"])}
            </div>

            <div class="info">
                <h4 class="info__name">${contact["name"]}</h4>
                 <p>${contact["email"]}</p>
            </div>
         </div>
    `;
}