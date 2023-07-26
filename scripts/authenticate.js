let activeUser;

function authenticate() {
    if (localStorage.getItem('activeUser')) {
        console.log('HALLO');
        activeUser = localStorage.getItem('activeUser');
    } else {
        window.location.href = 'index.html';
    }
}