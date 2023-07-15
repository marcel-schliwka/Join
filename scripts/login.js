//Globals
let loginForm = document.getElementById("loginForm");

function templateForgotPassword() {
  return `
        <img onclick="showLogin();" src="./img/arrow-left-line.svg" class="arrow-back" />
        <h1>I forgot my password</h1>
        <span class="login-line"></span>
        <p class="mt-5">Don't worry! We will send you an email with the instructions to reset your password.</p>
    
        <form onsubmit="return false;">
            <div class="input-container reset-password-input">
                <input
                class="text-input"
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                />
                <img
                src="./img/mail.svg"
                alt="Small Mail Symbol"
                class="input-icons"
                />
            </div>
            <button class="signup-btn reset-password-btn">Send me the email</button>
        </form>
    `;
}

function templateLogin() {
  return `
    <form onsubmit="return false;" id="loginForm">
          <h1 class="">Log in</h1>
          <span class="login-line"></span>
          <div class="input-container">
            <input
              class="text-input"
              type="email"
              name="email"
              id="email"
              placeholder="Email"
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
            <button class="signup-btn guest-login-btn">Guest Log in</button>
          </div>
        </form>
    `;
}

function templateSignUp() {
  return `
    <form onsubmit="return false;" id="loginForm">

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
      />
      <img
        src="./img/lock.svg"
        alt="Small Lock Symbol"
        class="input-icons"
      />
    </div>
    <div class="signup-btn-container">
      <button class="signup-btn">Sign up</button>
    </div>
  </form>
    `;
}

function forgotMyPassword() {
  loginForm.innerHTML = "";
  loginForm.innerHTML = templateForgotPassword();
}

function showLogin() {
  loginForm.innerHTML = "";
  loginForm.innerHTML = templateLogin();
}

function showSignup() {
  loginForm.innerHTML = "";
  loginForm.innerHTML = templateSignUp();
}
