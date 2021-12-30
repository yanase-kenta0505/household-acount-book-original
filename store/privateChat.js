import firebase from "~/plugins/firebase";

const db = firebase.firestore();
const privateChatRef = db.collection("privateChat");

export const state = () => ({
  privateChatDialog: false,
  partnerId: null,
  chatDatas: [],
});

export const actions = {
  changePrivateChatDialog(context) {
    context.commit("changePrivateChatDialog");
  },
  registerPrivateChatMessage(context, ids) {
    let reorganizationString =
      ids.myId.substring(0, 5) + ids.partnerId.substring(0, 5);

    // console.log(reorganizationString);

    let stringArray = reorganizationString.split("");
    // console.log(stringArray);

    let newId = stringArray.sort().join("");
    // console.log(newId);

    // console.log(ids.myId + ids.partnerId);
    privateChatRef.doc(newId).collection("chatMessage").add({
      message: ids.message,
      timeStamp: firebase.firestore.Timestamp.now(),
      uid: ids.myId,
    });
  },
  changePartnerId(context, id) {
    context.commit("changePartnerId", id);
  },
  chatDataSnapshot(context, id) {
    privateChatRef
      .doc(id)
      .collection("chatMessage")
      .orderBy("timeStamp", "asc")
      .onSnapshot((snapshot) => {
        let datas = [];
        snapshot.forEach((doc) => {
          if (doc.data().timeStamp === null || undefined) {
            console.log("return");
            return;
          } else {
            let id = doc.id;
            let data = doc.data();
            data.id = id;
            datas.push(data);
          }
          // console.log(datas);
          context.commit("changeChatData", datas);
        });
      });
  },
};

export const mutations = {
  changePrivateChatDialog(state) {
    state.privateChatDialog = !state.privateChatDialog;
  },
  changePartnerId(state, id) {
    state.partnerId = id;
  },
  changeChatData(state, datas) {
    state.chatDatas = [];
    datas.forEach((data) => {
      state.chatDatas.push(data);
    });
  },
};
