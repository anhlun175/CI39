import chatScreen from "../views/chat.js";

let activeCon = {};

let unsub = function() {};

const chatModel = {
  saveConversation: function(newConversation) {
    DB.collection("conversations").add(newConversation);
  },
  updateListUser: function(email) {
    DB.collection("conversations")
      .doc(activeCon.id)
      .update({
        users: firebase.firestore.FieldValue.arrayUnion(email)
      });
  },
  listenCon: function() {
    DB.collection("conversations")
      .where("users", "array-contains", firebase.auth().currentUser.email)
      .onSnapshot(function(querySnapshot) {
        querySnapshot.docChanges().forEach(function(change) {
          if (change.type === "added") {
            chatScreen.addCon({
              id: change.doc.id,
              name: change.doc.data().name
            });
          }
          if (change.type === "modified") {
            console.log(activeCon.id);
            if (activeCon.id === change.doc.id) {
              activeCon.users = change.doc.data().users;
              chatScreen.updateActiveCon();
            }
          }
        });
      });
  },
  listenMsg: function() {
    if (activeCon.id) {
      unsub();
      unsub = DB.collection("messages")
        .where("conversation_id", "==", activeCon.id)
        .onSnapshot(function(querySnapshot) {
          querySnapshot.docChanges().forEach(function(change) {
            chatScreen.addMsg(change.doc.data());
          });
        });
    }
  },
  saveMsg: function(newMsg) {
    DB.collection("messages").add({
      conversation_id: activeCon.id,
      content: newMsg,
      user_email: firebase.auth().currentUser.email
    });
  },
  updateActiveCon: function(newConId) {
    DB.collection("conversations")
      .doc(newConId)
      .get()
      .then(function(doc) {
        activeCon.name = doc.data().name;
        activeCon.id = doc.id;
        activeCon.users = doc.data().users;
        chatModel.listenMsg();
        chatScreen.updateActiveCon();
      });
  }
};

export { activeCon };

export default chatModel;
