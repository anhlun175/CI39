import chatModel from "../models/chat.js";

const chatController = {
  createConversation: function (name) {
    if (name.length === 0) {
      return;
    }
    const newConversation = {
      name: name,
      users: [firebase.auth().currentUser.uid]
    };
    chatModel.saveConversation(newConversation);
  },
  sendMsg: function (msg) {
    if (msg === "") {
      return;
    }
    chatModel.saveMsg(msg);
  }
};

export default chatController;
