import setScreen from "../index.js";
import chatScreen from "../views/chat.js";
import chatModel from "./chat.js";

const authenticationModel = {
  saveUser: async function (user) {
    const email = user.email;
    const password = user.password;
    const displayName = user.displayName;
    
    await firebase.auth().createUserWithEmailAndPassword(email, password);
    firebase.auth().currentUser.sendEmailVerification();
    firebase.auth().currentUser.updateProfile({
      displayName: displayName
    });
  }
};

firebase.auth().onAuthStateChanged(function (user) {
  if (user !== null) {
    if (user.emailVerified) {
      //redirect to chat screen
      setScreen(chatScreen);
      chatModel.listenCon();
      chatModel.listenMsg();
    } else {
      //Step 1: show email verified error
      alert("Please confirm your email!");
      //Step 2: sign out
      firebase.auth().signOut();
    }
  } else {
    // no login user
  }
});

export default authenticationModel;
