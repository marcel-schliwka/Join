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
async function registerUser() {
  let signupBtn = document.getElementById("signupBtn");
  signupBtn.disabled = true;
  let name = document.getElementById("name");
  let email = document.getElementById("email");
  let password = document.getElementById("password");
  let confirmPassword = document.getElementById("confirmPassword");

  if (checkIfUserExists(email.value)) {
    showLogin();
    showTopDown("This User exists, please log in!");
    signupBtn.disabled = false;
    return 0;
  }

  if (confirmPasswordIsSame(password.value, confirmPassword.value)) {
    let hashedPwd = await hashPassword(password.value);
    users.push({
      name: name.value,
      email: email.value,
      password: hashedPwd,
    });
    await setItem("users", JSON.stringify(users));
  } else {
    showTopDown("Your passwords are not similar!");
    signupBtn.disabled = false;
    return 0;
  }

  resetForm(name);
  resetForm(email);
  resetForm(password);
  resetForm(confirmPassword);
  signupBtn.disabled = false;
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

async function login() {
  let formInput = getLoginFormInput();
  let user = users.find((user) => user.email === formInput.email);
  let hashPwd = await hashPassword(formInput.password);
  console.log(hashPwd);
  if (user && user.password === hashPwd) {
    localStorage.setItem("userData", JSON.stringify(user));
    localStorage.setItem("activeUser", user.email);
    await createUserObject(user);
    if (formInput.remember) {
      saveRememberMe(user);
    }
  } else {
    alert("Your email or password is wrong!");
    return;
  }
  window.location.href = "summary.html";
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

async function checkIfUserObjectExists(email) {
  try {
    let userObject = await getItem(email);
  } catch (e) {
    return false;
  }
  return true;
}

function saveRememberMe(user) {
  localStorage.setItem("currentUser", JSON.stringify(user));
}

function checkIfUserIsLoggedIn() {
  let user = localStorage.getItem("activeUser");
  if (user === null) {
    console.info("No User was saved in local storage");
  } else {
    window.location.href = "summary.html";
  }
}

function showTopDown(message) {
  let popup = document.getElementById("topdownMessages");
  popup.innerHTML = message;
  popup.classList.add("show-topdown");
  setTimeout(() => {
    popup.classList.remove("show-topdown");
  }, 5000);
}

async function guestLogin() {
  let formInput = {
    email: "guest@test.de",
    password:
      "ecd71870d1963316a97e3ac3408c9835ad8cf0f3c1bc703527c30265534f75ae",
    remember: false,
  };
  let user = users.find((user) => user.email === formInput.email);
  if (user && user.password === formInput.password) {
    localStorage.setItem("userData", JSON.stringify(user));
    localStorage.setItem("activeUser", user.email);
    await createUserObject(user);
    if (formInput.remember) {
      saveRememberMe(user);
    }
  } else {
    alert("Your email or password is wrong!");
    return;
  }
  window.location.href = "summary.html";
}

/* Old version, added new version to create an userObj for guests
function guestLogin() {
  localStorage.setItem("activeUser", "guest");
  window.location.href = `summary.html`;
}
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

// Create a secure hash and stores the hash instead of the password
async function hashPassword(password) {
  const msgUint8 = new TextEncoder().encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashedPassword = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return hashedPassword;
}
