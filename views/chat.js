import chatController from "../controllers/chat.js";
import { activeCon } from "../models/chat.js";

const ui = `
<div class="d-flex w-100 h-100">
  <div class="grow-1 p-sm card overflow">
    <form class="inline" id="js-formCreateCon">
      <div class="form-group grow-1">
        <input type="text" placeholder="Enter conversation name ..." class="form-control" id="name">
      </div>
      <div class="form-group">
        <button type="submit" class="btn btn-primary">Create</button>
      </div>
    </form>
    <hr>
    <ul id="js-listCon" class="list"></ul>
  </div>
  <div class="grow-2 d-flex flex-col">
    <header>Header</header>
    <div class="grow-1 d-flex">
      <div class="grow-2 d-flex flex-col">
        <div class="grow-1 border-right border-bottom p-sm overflow flex-basis-0" id="js-chatBox"></div>
        <div class="p-xs border-right">
          <form class="inline" id="js-formSendMsg">
            <div class="form-group grow-1">
              <input type="text" id="msg" class="form-control" placeholder="Be nice in the chat!"/>
            </div>
            <div class="form-group">
              <button type="submit" class="btn btn-primary">Send</button>
            </div>
          </form>
        </div>
      </div>
      <div class="grow-1">
        <form class="inline" id="js-formInvite">
          <div class="form-group grow-1">
            <input type="email" class="form-control" placeholder="Enter email ..." id="email"/>
          </div>
          <div class="form-group">
            <button type="submit" class="btn btn-primary">Invite</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
`;

function onload() {
  const formCreateCon = document.getElementById("js-formCreateCon");
  formCreateCon.addEventListener("submit", function(event) {
    event.preventDefault();
    const name = formCreateCon.name.value;
    chatController.createConversation(name);
    formCreateCon.name.value = "";
  });

  const formSendMsg = document.getElementById("js-formSendMsg");
  formSendMsg.addEventListener("submit", function(event) {
    event.preventDefault();
    const msg = formSendMsg.msg.value;
    chatController.sendMsg(msg);
  });

  const formInvite = document.getElementById("js-formInvite");
  formInvite.addEventListener("submit", function(event) {
    event.preventDefault();
    const email = formInvite.email.value;
    chatController.inviteUser(email);
  });
}

function addCon(con) {
  const conLi = document.createElement("li");
  conLi.id = con.id;
  conLi.innerHTML = con.name;
  if (con.id === activeCon.id) {
    conLi.classList.add("active");
  }
  document.getElementById("js-listCon").appendChild(conLi);
}

function addMsg(msg) {
  const msgContainer = document.createElement("div");
  msgContainer.classList.add("d-flex");
  const msgDiv = document.createElement("div");
  msgDiv.classList.add("msg", "my-sm");
  msgDiv.innerHTML = msg.content;
  if (msg.user_id === firebase.auth().currentUser.uid) {
    msgContainer.classList.add("justify-end");
    msgDiv.classList.add("msg-primary");
  } else {
    msgDiv.classList.add("msg-secondary");
  }
  msgContainer.appendChild(msgDiv);
  document.getElementById("js-chatBox").appendChild(msgContainer);
}

const chatScreen = {
  ui: ui,
  onload: onload,
  addCon: addCon,
  addMsg: addMsg
};

export default chatScreen;
