//Globals
let users = [];
let loginForm = document.getElementById("loginForm");
let loginBox = document.querySelector(".login-box");

/**
 * Clears the content of the login box and displays the 'Forgot Password' template.
 */
function forgotMyPassword() {
  let loginBox = document.querySelector(".login-box");
  loginBox.innerHTML = "";
  loginBox.innerHTML = templateForgotPassword();
}

/**
 * Clears the content of the login box and displays the login template.
 */
function showLogin() {
  loginBox.innerHTML = "";
  loginBox.innerHTML = templateLogin();
}

/**
 * Clears the content of the login box and displays the signup template.
 */
function showSignup() {
  loginBox.innerHTML = "";
  loginBox.innerHTML = templateSignUp();
}

/**
 * Initializes the application by loading users and checking if a user is logged in.
 */
async function init() {
  loadUsers();
  checkIfUserIsLoggedIn();
}

/**
 * Loads users from storage.
 */
async function loadUsers() {
  try {
    users = await getItem("users");
  } catch (e) {
    console.info("No users found.");
  }
}

/**
 * Checks if the confirmed password matches the original password.
 * @param {string} password - The original password.
 * @param {string} confirmedPassword - The confirmed password to check against.
 * @returns {boolean} Returns true if the passwords match, otherwise false.
 */
function confirmPasswordIsSame(password, confirmedPassword) {
  if (password == confirmedPassword) {
    return true;
  } else {
    return false;
  }
}
/**
 * Registers a new user by checking the user's input and adding them to the system.
 * @async
 * @returns {Promise<void>}
 */
async function registerUser() {
  const elements = getFormElements();
  if (checkIfUserExists(elements.email.value))
    return handleExistingUser(elements.signupBtn);

  const passwordsMatch = await handlePasswordMatch(elements);
  if (!passwordsMatch) return handlePasswordMismatch(elements.signupBtn);
  let hashedPassword = await hashPassword(elements.password.value);
  await finalizeRegistration(elements);
}

/**
 * Retrieves form elements used in the registration process.
 * @returns {Object} - Contains references to HTML elements.
 */
function getFormElements() {
  return {
    signupBtn: document.getElementById("signupBtn"),
    name: document.getElementById("name"),
    email: document.getElementById("email"),
    password: document.getElementById("password"),
    confirmPassword: document.getElementById("confirmPassword"),
  };
}

/**
 * Handles scenarios when a user already exists.
 * @returns {number} - Returns 0 to indicate early exit from the function.
 */
function handleExistingUser(signupBtn) {
  showLogin();
  showTopDown("This User exists, please log in!");
  return 0;
}

/**
 * Checks if the passwords provided match and if so, adds the user to the system.
 * @async
 * @param {Object} elements - The form elements.
 * @returns {Promise<boolean>} - True if the passwords match, false otherwise.
 */
async function handlePasswordMatch(elements) {
  if (
    confirmPasswordIsSame(
      elements.password.value,
      elements.confirmPassword.value
    )
  ) {
    let hashedPwd = await hashPassword(elements.password.value);
    users.push({
      name: elements.name.value,
      email: elements.email.value,
      password: hashedPwd,
    });
    await setItem("users", JSON.stringify(users));
    await createUserObject(
      elements.name.value,
      elements.email.value,
      hashedPwd
    );

    return true;
  }
  return false;
}

/**
 * Handles scenarios when the passwords do not match.
 * @param {HTMLElement} signupBtn - The button element used for signing up.
 * @returns {number} - Returns 0 to indicate early exit from the function.
 */
function handlePasswordMismatch(signupBtn) {
  showTopDown("Your passwords are not similar!");
  signupBtn.disabled = false;
  return 0;
}

/**
 * Finalizes the registration process, resets the form, and shows a success message.
 * @async
 * @param {Object} elements - The form elements.
 * @returns {Promise<void>}
 */
async function finalizeRegistration(elements) {
  ["name", "email", "password", "confirmPassword"].forEach((el) =>
    resetForm(elements[el])
  );
  elements.signupBtn.disabled = false;
  showLogin();
  showTopDown("You are registered!");
}

function checkIfUserExists(email) {
  return users.some((user) => user.email === email);
}

function resetForm(input) {
  input.value = "";
}

function getLoginFormInput() {
  const input = {
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
    remember: document.getElementById("remember").checked,
  };
  return input;
}

/**
 * Logs in a user based on form input, after validating the credentials.
 * @async
 * @returns {Promise<void>}
 */
async function login() {
  const formInput = getLoginFormInput();
  const user = findUserByEmail(formInput.email);
  const isValidLogin = await validateLogin(user, formInput.password);

  if (!isValidLogin) {
    showTopDown("Your email or password is wrong!");
    return;
  }
  localStorage.setItem("activeUser", formInput.email);
  window.location.href = "summary.html";
}

/**
 * Retrieves login form input values.
 * @returns {Object} - Contains values of the login form fields.
 */
function getLoginFormInput() {
  return {
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
    remember: document.getElementById("remember").checked,
  };
}

/**
 * Finds a user in the system by email.
 * @param {string} email - The email to search for.
 * @returns {(Object|null)} - Returns the user object if found, null otherwise.
 */
function findUserByEmail(email) {
  return users.find((user) => user.email === email);
}

/**
 * Validates the login credentials against stored users.
 * @async
 * @param {Object|null} user - The user object.
 * @param {string} password - The plain text password to validate.
 * @returns {Promise<boolean>} - True if the login credentials are valid, false otherwise.
 */
async function validateLogin(user, password) {
  if (!user) return false;

  const hashPwd = await hashPassword(password);
  return user.password === hashPwd;
}

async function createUserObject(username, email, hashedPassword) {
  let userObj = {
    name: username,
    email: email,
    password: hashedPassword,
    tasks: [],
    contacts: [],
  };
  await setItem(email, JSON.stringify(userObj));
}

/**
 * Checks if a user object exists based on the email.
 * @async
 * @param {string} email - The email of the user to check.
 * @returns {Promise<boolean>} - True if the user object exists, false otherwise.
 */
async function checkIfUserObjectExists(email) {
  try {
    await getItem(email);
    return true;
  } catch (e) {
    console.info("User does not exist!");
    return false;
  }
}

/**
 * Saves the current user's data in local storage for quick access.
 * @param {Object} user - The user object to be saved.
 */
function saveRememberMe(user) {
  localStorage.setItem("currentUser", JSON.stringify(user));
}

/**
 * Checks if a user is logged in by inspecting local storage.
 * Redirects to a summary page if a user is found.
 */
function checkIfUserIsLoggedIn() {
  const user = localStorage.getItem("activeUser");
  if (user) {
    window.location.href = "summary.html";
  } else {
    return;
  }
}

/**
 * Logs in a guest user and redirects to a summary page.
 * @async
 */
async function guestLogin() {
  localStorage.setItem("activeUser", "guest@test.de");
  window.location.href = "summary.html";
}

/**
 * Handles the submission of the forgot password form.
 * Sends a password reset email if the user exists or prompts the user to sign up if not.
 * @param {Event} e - The form submit event.
 */
function sendPasswordMail(e) {
  e.preventDefault();
  if (checkIfUserExists(document.getElementById("forgotPasswordInput").value)) {
    showTopDown("We send you an email!");
  } else {
    showTopDown("Please Sign Up! You're E-Mail Address was not found.");
  }
  showLogin();
}
