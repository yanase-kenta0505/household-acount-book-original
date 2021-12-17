import firebase from "~/plugins/firebase";

const db = firebase.firestore();
const postRef = db.collection("myPost");
const allPostRef = db.collection("allPostRef");

export const state = () => ({
  postMessages: [],
  allPostMessages: [],
});

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
  allMessageSnapshot(context) {
    allPostRef.orderBy("timeStamp", "desc").onSnapshot((snapshot) => {
      let allMessages = [];
      snapshot.forEach((doc) => {
        if (doc.data().Timestamp === null) {
          console.log("null");
          return;
        } else {
          let id = doc.id;
          let data = doc.data();
          data.id = id;
          allMessages.push(data);
        }
      });
      context.commit("changeAllMessages", allMessages);
    });
  },
  postMessageAdd(context, postItem) {
    // console.log(new Date());
    postRef.doc(postItem.uid).collection("message").add({
      message: postItem.message,
      uid: postItem.uid,
      timeStamp: firebase.firestore.Timestamp.now(),
    });
    allPostRef.add({
      message: postItem.message,
      uid: postItem.uid,
      timeStamp: firebase.firestore.Timestamp.now(),
    });
  },
  deleteMessage(context, ids) {
    console.log(ids);
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
    // console.log(messages);
    state.postMessages = [];
    messages.forEach((message) => {
      state.postMessages.push(message);
    });
  },
  changeAllMessages(state, allMessages) {
    state.allPostMessages = [];
    allMessages.forEach((message) => {
      state.allPostMessages.push(message);
    });
  },
};
