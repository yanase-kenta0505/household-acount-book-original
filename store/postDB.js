import firebase from "~/plugins/firebase";

const db = firebase.firestore();
const postRef = db.collection("post");

export const state = () => ({
  postMessages: [],
});

export const getters = {
  postMessages(state) {
    return state.postMessages;
  },
};

export const actions = {
  messageSnapshot(context, uid) {
    postRef
      .doc(uid)
      .collection("message")
      .orderBy("timeStamp", "desc")
      .onSnapshot((snapshot) => {
        let messages = [];
        snapshot.forEach((doc) => {
          if (doc.data().Timestamp === null) {
            console.log("null");
            return;
          } else {
            let id = doc.id;
            let data = doc.data();
            data.id = id;
            messages.push(data);
          }
        });
        context.commit("changeMessages", messages);
      });
  },
  postMessageAdd(context, postItem) {
    // console.log(new Date());
    postRef.doc(postItem.uid).collection("message").add({
      message: postItem.message,
      uid: postItem.uid,
      timeStamp: firebase.firestore.Timestamp.now(),
    });
    // context.commit("postMessage", postItem);
  },
  deleteMessage(context, ids) {
    console.log(ids)
    postRef
      .doc(ids.uid)
      .collection("message")
      .doc(ids.id)
      .delete()
      .then(() => {
        console.log("delete");
      });
  },
};
export const mutations = {
  changeMessages(state, messages) {
    console.log(messages)
    state.postMessages = [];
    messages.forEach((message) => {
      state.postMessages.push(message);
    });
  },
};
