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
      <div class="checkbox-container">
      <div class="remember-me-container">
        <input
          class="remember-checkbox"
          required
          type="checkbox"
          name="remember"
          id="remember"
        />
        <span>I accept the <a href="privacy.html">Privacy Policy</a></span>
      </div>
    </div>
      <div class="signup-btn-container">
        <button id="signupBtn" type="submit" class="signup-btn">Sign up</button>
      </div>
    </form>
      `;
}
