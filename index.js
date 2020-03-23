import login from "./views/login.js";

function setScreen(screen) {
  document.getElementById("app").innerHTML = screen.ui;
  screen.onload();
}

setScreen(login);

export default setScreen;
