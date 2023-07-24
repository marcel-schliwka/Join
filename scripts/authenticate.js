let activeUser;

function authenticate() {
    if (localStorage.getItem('activeUser')) {
        activeUser = localStorage.getItem('activeUser');
    } else {
        window.location.href = 'index.html';
    }
}