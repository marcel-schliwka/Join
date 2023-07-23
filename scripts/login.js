//Globals
let users = [];
let loginForm = document.getElementById("loginForm");
let loginBox = document.querySelector(".login-box");
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
    users = JSON.parse(await getItem("users"));
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
    users.push({
      name: name.value,
      email: email.value,
      password: password.value,
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

function login() {
  let formInput = getLoginFormInput();
  let user = users.find((user) => user.email === formInput.email);

  if (user && user.password === formInput.password) {
    alert("You are logged in!");
    if (formInput.remember) {
      saveRememberMe(user);
    }
  } else {
    alert("Your email or password is wrong!");
  }
}

function saveRememberMe(user) {
  localStorage.setItem("currentUser", JSON.stringify(user));
}

function checkIfUserIsLoggedIn() {
  let user = JSON.parse(localStorage.getItem("currentUser"));
  if (user === null) {
    console.info("No User was saved in local storage");
  } else {
    // window.location.href = "summary.html";
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

function guestLogin() {
  localStorage.setItem('activeUser', 'guest');
  window.location.href = `summary.html?name='Guest'`;
}

function sendPasswordMail(e) {
  e.preventDefault();
  showTopDown("We send you an email!");
}
