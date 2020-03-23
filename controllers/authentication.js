import { isEmail } from "../util.js";
import authenticationModel from "../models/authentication.js";
import registerScreen from "../views/register.js";

const authenticationController = {
  login: async function(email, password) {
    await firebase.auth().signInWithEmailAndPassword(email, password);
  },
  register: function(email, displayName, password, confirmPassword) {
    let hasError = false;
    if (!isEmail(email)) {
      hasError = true;
      registerScreen.setError("email", "Not a valid email!");
    }
    if (displayName.length < 6) {
      hasError = true;
      registerScreen.setError(
        "displayName",
        "Display name's length must be greater than 6"
      );
    }
    if (password.length < 6) {
      hasError = true;
      registerScreen.setError(
        "password",
        "Password's length must be greater than 6"
      );
    }
    if (password !== confirmPassword) {
      hasError = true;
      registerScreen.setError("confirmPassword", "Password doesn't match!");
    }
    if (!hasError) {
      authenticationModel.saveUser({
        email: email,
        password: password,
        displayName: displayName
      });
    }
  }
};

export default authenticationController;
