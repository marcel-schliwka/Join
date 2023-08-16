/**
 * Event listener that runs when the DOM content is loaded.
 * It initializes the taskDateInput element.
 *
 * @event DOMContentLoaded
 */
window.addEventListener("DOMContentLoaded", function () {
    const taskDateInput = document.getElementById("task-date");

    /**
     * Formats a given date into a string in "YYYY-MM-DD" format.
     *
     * @param {Date} date - The date object to be formatted.
     * @returns {string} The formatted date string.
     */
    function formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    }
    const today = new Date();
    taskDateInput.min = formatDate(today);
});


/**
* Redirects the user to a given URL.
* @function
* @param {string} url - The URL to redirect to.
*/
function redirectTo(url) {
    window.location.href = url;
}