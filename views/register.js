import setScreen from "../index.js";
import loginScreen from "./login.js";
import authenticationController from "../controllers/authentication.js";

const ui = `
<div class="d-flex w-100 h-100 d-flex-center">
  <div class="card rounded">
    <form id="js-formRegister">
      <h3 class="text-center">Register</h3>
      <div class="form-group">
        <label class="required">Email</label>
        <input type="email" id="email" class="form-control" />
        <small class="invalid-feedback"></small>
      </div>
      <div class="form-group">
        <label class="required">Display Name</label>
        <input type="text" class="form-control" id="displayName" />
        <small class="invalid-feedback"></small>
      </div>
      <div class="form-group">
        <label class="required">Password</label>
        <input type="password" class="form-control" id="password" />
        <small class="invalid-feedback"></small>
      </div>
      <div class="form-group">
        <label class="required">Confirm Password</label>
        <input type="password" class="form-control" id="confirmPassword"/>
        <small class="invalid-feedback"></small>
      </div>
      <div class="form-group text-center">
        <button type="submit" class="btn btn-primary">Register</button>
        <button type="button" class="btn btn-secondary" id="js-btnGotoLogin">Go to Login</button>
      </div>
    </form>
  </div>
</div>
`;

function onload() {
  document
    .getElementById("js-btnGotoLogin")
    .addEventListener("click", function() {
      setScreen(loginScreen);
    });
  const formRegister = document.getElementById("js-formRegister");
  formRegister.addEventListener("submit", function(event) {
    event.preventDefault();
    const email = formRegister.email.value;
    const displayName = formRegister.displayName.value;
    const password = formRegister.password.value;
    const confirmPassword = formRegister.confirmPassword.value;

    clearError();

    authenticationController.register(
      email,
      displayName,
      password,
      confirmPassword
    );
  });
}

function setError(id, message) {
  let input = document.getElementById(id);
  input.classList.add("has-error");
  input.nextElementSibling.innerHTML = message;
}

function clearError() {
  const fields = ["email", "displayName", "password", "confirmPassword"];
  for (let i = 0; i < fields.length; i++) {
    document.getElementById(fields[i]).classList.remove("has-error");
  }
}

const registerScreen = {
  ui: ui,
  onload: onload,
  setError: setError
};

export default registerScreen;
