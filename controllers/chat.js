import chatModel from "../models/chat.js";

const chatController = {
  createConversation: function(name) {
    if (name.length === 0) {
      return;
    }
    const newConversation = {
      name: name,
      users: [firebase.auth().currentUser.email]
    };
    chatModel.saveConversation(newConversation);
  },
  sendMsg: function(msg) {
    if (msg === "") {
      return;
    }
    chatModel.saveMsg(msg);
  },
  inviteUser: function(email) {
    chatModel.updateListUser(email);
  },
  updateActiveCon: function(conId) {
    chatModel.updateActiveCon(conId);
  }
};

export default chatController;
