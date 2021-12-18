import firebase from "~/plugins/firebase";

const db = firebase.firestore();
const postRef = db.collection("Post");

export const state = () => ({
  postMessages: [],
});

export const actions = {
  messageSnapshot(context, uid) {
    postRef.onSnapshot((snapshot) => {
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
    postRef.add({
      message: postItem.message,
      uid: postItem.uid,
      timeStamp: firebase.firestore.Timestamp.now(),
      img: postItem.img,
      name: postItem.name,
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
  setImg(context, items) {
    console.log(items);
    postRef.get().then((snapshot) => {
      // console.log(snapshot.docs)
      snapshot.docs.forEach((doc) => {
        // console.log(doc.id)
        if (doc.data().uid !== items.id) {
          // console.log("no");
          return;
        } else {
          console.log(doc.id);
          postRef.doc(doc.id).update({
            img: items.img,
          });
        }
      });
    });
  },
  removeImg(context, items) {
    postRef.get().then((snapshot) => {
      // console.log(snapshot.docs)
      snapshot.docs.forEach((doc) => {
        // console.log(doc.id)
        if (doc.data().uid !== items.id) {
          // console.log("no");
          return;
        } else {
          console.log(doc.id);
          postRef.doc(doc.id).update({
            img: null,
          });
        }
      });
    });
  },
};
export const mutations = {
  changeMessages(state, messages) {
    state.postMessages = [];
    messages.forEach((message) => {
      state.postMessages.push(message);
    });
  },
};
