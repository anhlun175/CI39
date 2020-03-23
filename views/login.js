import setScreen from "../index.js";
import registerScreen from "./register.js";
import authenticationController from "../controllers/authentication.js";

const ui = `
<div class="d-flex w-100 h-100 d-flex-center" id="login-page">
  <div class="card rounded">
    <form id="js-formLogin">
      <h3 class="text-center">Login</h3>
      <div class="form-group">
        <label class="required">Email</label>
        <input type="email" id="email" class="form-control" />
      </div>
      <div class="form-group">
        <label class="required">Password</label>
        <input type="password" class="form-control" id="password" />
      </div>
      <div class="form-group text-center">
        <button type="submit" class="btn btn-primary">Login</button>
        <button type="button" class="btn btn-secondary" id="js-btnGotoRegister">Go to Register</button>
      </div>
    </form>
  </div>
</div>
`;

function onload() {
  document
    .getElementById("js-btnGotoRegister")
    .addEventListener("click", function() {
      setScreen(registerScreen);
    });

  const formLogin = document.getElementById("js-formLogin");
  formLogin.addEventListener("submit", function(event) {
    event.preventDefault();

    const email = formLogin.email.value;
    const password = formLogin.password.value;

    authenticationController.login(email, password);
  });
}

const loginScreen = {
  ui: ui,
  onload: onload
};

export default loginScreen;
