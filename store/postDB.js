import firebase from "~/plugins/firebase";
import moment from "moment";

const db = firebase.firestore();
const usersRef = db.collection("users");
// const postMessageRef = db.collection("postMessage");

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
    usersRef
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
            // console.log(doc.data());
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
    console.log(new Date());
    usersRef.doc(postItem.uid).collection("message").add({
      message: postItem.message,
      timeStamp: firebase.firestore.Timestamp.now(),
    });
    // context.commit("postMessage", postItem);
  },
  deleteMessage(context, ids) {
    usersRef.doc(ids.uid).collection("message").doc(ids.id).delete().then(()=>{
      console.log('delete')
    })
  },
};
export const mutations = {
  changeMessages(state, messages) {
    state.postMessages = messages;
  },
};
