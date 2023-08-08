//Globals
let users = [];
let loginForm = document.getElementById("loginForm");
let loginBox = document.querySelector(".login-box");

// Templates
function templateForgotPassword() {
  return `
        <img onclick="showLogin();" src="./img/arrow-left-line.svg" class="arrow-back" />
        <h1>I forgot my password</h1>
        <span class="login-line"></span>
        <p class="mt-5">Don't worry! We will send you an email with the instructions to reset your password.</p>
    
        <form onsubmit="sendPasswordMail(event);">
            <div class="input-container reset-password-input">
                <input
                class="text-input"
                type="email"
                id="forgotPasswordInput"
                name="email"
                id="email"
                placeholder="Email"
                required
                />
                <img
                src="./img/mail.svg"
                alt="Small Mail Symbol"
                class="input-icons"
                />
            </div>
            <button type="submit" class="signup-btn reset-password-btn">Send me the email</button>
        </form>
    `;
}

function templateLogin() {
  return `
  <form onsubmit="login(); return false;" id="loginForm">
  <h1 class="">Log in</h1>
  <span class="login-line"></span>
  <div class="input-container">
    <input
      class="text-input"
      type="email"
      name="email"
      id="email"
      placeholder="Email"
      required
    />
    <img
      src="./img/mail.svg"
      alt="Small Mail Symbol"
      class="input-icons"
    />
  </div>
  <div class="input-container">
    <input
      class="text-input"
      type="password"
      name="password"
      placeholder="Password"
      id="password"
      required
    />
    <img
      src="./img/lock.svg"
      alt="Small Lock Symbol"
      class="input-icons"
    />
  </div>
  <div class="checkbox-container">
    <div class="remember-me-container">
      <input
        class="remember-checkbox"
        type="checkbox"
        name="remember"
        id="remember"
      />
      <span>Remember me</span>
    </div>
    <a onclick="forgotMyPassword();" class="forgot-link"
      >Forgot my password</a
    >
  </div>
  <div class="login-btn-container">
    <button class="signup-btn">Log in</button>
    <button
      class="signup-btn guest-login-btn"
      type="button"
      onclick="guestLogin();"
    >
      Guest Log in
    </button>
  </div>
</form>
    `;
}

function templateSignUp() {
  return `
    <form onsubmit="registerUser(); return false;" id="loginForm">

    <img onclick="showLogin();" src="./img/arrow-left-line.svg" class="arrow-back" />
    <h1 class="">Sign up</h1>

    
    <span class="login-line"></span>
    <div class="input-container">
        <input
            class="text-input"
            type="text"
            name="name"
            id="name"
            placeholder="Name"
            required
        />
        <img
            src="./img/person.svg"
            alt="Small Person Symbol"
            class="input-icons"
        />
    </div>
    <div class="input-container">
      <input
        class="text-input"
        type="email"
        name="email"
        id="email"
        placeholder="Email"
        required
      />
      <img
        src="./img/mail.svg"
        alt="Small Mail Symbol"
        class="input-icons"
      />
    </div>
    <div class="input-container">
      <input
        class="text-input"
        type="password"
        name="password"
        placeholder="Password"
        id="password"
        required
      />
      <img
        src="./img/lock.svg"
        alt="Small Lock Symbol"
        class="input-icons"
      />
    </div>
    <div class="input-container">
      <input
        class="text-input"
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        id="confirmPassword"
        required
      />
      <img
        src="./img/lock.svg"
        alt="Small Lock Symbol"
        class="input-icons"
      />
    </div>
    <div class="signup-btn-container">
      <button id="signupBtn" onclick="registerUser();" class="signup-btn">Sign up</button>
    </div>
  </form>
    `;
}

function forgotMyPassword() {
  let loginBox = document.querySelector(".login-box");
  loginBox.innerHTML = "";
  loginBox.innerHTML = templateForgotPassword();
}

function showLogin() {
  loginBox.innerHTML = "";
  loginBox.innerHTML = templateLogin();
}

function showSignup() {
  loginBox.innerHTML = "";
  loginBox.innerHTML = templateSignUp();
}

async function init() {
  loadUsers();
  checkIfUserIsLoggedIn();
}

async function loadUsers() {
  try {
    users = await getItem("users");
  } catch (e) {
    console.error("Loading error:", e);
  }
}

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
 * @param {HTMLElement} signupBtn - The button element used for signing up.
 * @returns {number} - Returns 0 to indicate early exit from the function.
 */
function handleExistingUser(signupBtn) {
  showLogin();
  showTopDown("This User exists, please log in!");
  signupBtn.disabled = false;
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

  setLoginSession(user, formInput.remember);
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

/**
 * Sets the login session and user data in local storage.
 * @async
 * @param {Object} user - The user object.
 * @param {boolean} remember - Indicates whether to remember the user or not.
 * @returns {Promise<void>}
 */
async function setLoginSession(user, remember) {
  localStorage.setItem("userData", JSON.stringify(user));
  localStorage.setItem("activeUser", user.email);
  await createUserObject(user);
  if (remember) saveRememberMe(user);
}

async function createUserObject(user) {
  let password = await hashPassword(user.password);
  if (await checkIfUserObjectExists(user.email)) {
  } else {
    let userObj = {
      name: user.name,
      email: user.email,
      password: password,
      tasks: [],
      contacts: [],
    };
    await setItem(user.email, JSON.stringify(userObj));
  }
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
    console.info("No User was saved in local storage");
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

/**
 * Hashes a given password using SHA-256.
 * @async
 * @param {string} password - The plain text password to be hashed.
 * @returns {Promise<string>} - The hashed password as a hexadecimal string.
 */
async function hashPassword(password) {
  const msgUint8 = new TextEncoder().encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashedPassword = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return hashedPassword;
}
