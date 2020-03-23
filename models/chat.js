import chatScreen from "../views/chat.js";

let activeCon = {
  id: "QdeLV760HZzcVtLOhIbO",
  name: "Hello",
  users: ["quan.nh.25595@gmail.com"]
};

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
    DB.collection("conversations").onSnapshot(function(querySnapshot) {
      querySnapshot.docChanges().forEach(function(change) {
        if (change.type === "added") {
          chatScreen.addCon({
            id: change.doc.id,
            name: change.doc.data().name
          });
        }
        if (change.type === "modified") {
          activeCon.users = change.doc.data().users;
          chatScreen.updateActiveCon();
        }
      });
    });
  },
  listenMsg: function() {
    DB.collection("messages").onSnapshot(function(querySnapshot) {
      querySnapshot.docChanges().forEach(function(change) {
        chatScreen.addMsg(change.doc.data());
      });
    });
  },
  saveMsg: function(newMsg) {
    DB.collection("messages").add({
      conversation_id: activeCon.id,
      content: newMsg,
      user_id: firebase.auth().currentUser.uid
    });
  }
};

export { activeCon };

export default chatModel;
