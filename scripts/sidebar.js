async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html"); // "includes/header.html"
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
            // activeSite();
        } else {
            element.innerHTML = 'Page not found';
        }
    }
}

// function activeSite() {
//     const fullUrl = window.location.href;

//     // Split the URL by the forward slash '/'
//     const urlParts = fullUrl.split('/');

//     // Get the last part of the array, which is the file name
//     const siteName = urlParts[urlParts.length - 1];

//     if (siteName == 'contacts.html') {
//         document.getElementById('linkContacts').classList.add('activeSite');
//     };
//     if (siteName == 'summary.html') {
//         document.getElementById('linkSummary').classList.add('activeSite');
//     };
//     if (siteName == 'board.html') {
//         document.getElementById('linkBoard').classList.add('activeSite');
//     };
//     if (siteName == 'addtask.html') {
//         document.getElementById('linkBoard').classList.add('activeSite');
//     }
// }