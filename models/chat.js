import chatScreen from "../views/chat.js";

let activeCon = {
  id: "0es5QcuDQM3GknqPPPaC",
  name: "Hello"
};

const chatModel = {
  saveConversation: function (newConversation) {
    DB.collection("conversations").add(newConversation);
  },
  listenCon: function () {
    DB.collection("conversations")
      .onSnapshot(function (querySnapshot) {
        querySnapshot.docChanges().forEach(function (change) {
          chatScreen.addCon({
            id: change.doc.id,
            name: change.doc.data().name
          });
        });
      });
  },
  listenMsg: function () {
    DB.collection("messages").onSnapshot(function (querySnapshot) {
      querySnapshot.docChanges().forEach(function (change) {
        chatScreen.addMsg(change.doc.data());
      });
    });
  },
  saveMsg: function (newMsg) {
    DB.collection("messages").add({
      conversation_id: activeCon.id,
      content: newMsg,
      user_id: firebase.auth().currentUser.uid
    });
  }
};

export {activeCon};

export default chatModel;
