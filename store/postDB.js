import firebase from "~/plugins/firebase";

const db = firebase.firestore();
const postRef = db.collection("Post");
const increment = firebase.firestore.FieldValue.increment(1);
const decrement = firebase.firestore.FieldValue.increment(-1);

export const state = () => ({
  postMessages: [],
});

export const actions = {
  messageSnapshot(context, uid) {
    postRef.orderBy("timeStamp", "desc").onSnapshot((snapshot) => {
      console.log("snap");
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
      likeCount: 0,
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
          // console.log(doc.id);
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
          // console.log(doc.id);
          postRef.doc(doc.id).update({
            img: null,
          });
        }
      });
    });
  },
  changeLikeCount(context, ids) {
    postRef
      .doc(ids.id)
      .collection("likedUserId")
      .get()
      .then((snap) => {
        if (snap.docs.length === 0) {
          postRef
            .doc(ids.id)
            .collection("likedUserId")
            .add({
              likedUserId: ids.uid,
            })
            .then(() => {
              console.log("add1");
              postRef.doc(ids.id).update({
                likeCount: increment,
              });
            });
        } else {
          const a = snap.docs.find((doc) => {
            return doc.data().likedUserId === ids.uid;
          });
          if (a) {
            postRef
              .doc(ids.id)
              .collection("likedUserId")
              .doc(a.id)
              .delete()
              .then(() => {
                console.log("delete");
                postRef.doc(ids.id).update({
                  likeCount: decrement,
                });
              });
          } else {
            postRef
              .doc(ids.id)
              .collection("likedUserId")
              .add({
                likedUserId: ids.uid,
              })
              .then(() => {
                console.log("add2");
                postRef.doc(ids.id).update({
                  likeCount: increment,
                });
              });
          }
        }
      });

    // if (doc.data().likedUserId === ids.uid) {
    //   postRef
    //     .doc(ids.id)
    //     .collection("likedUserId")
    //     .doc(doc.id)
    //     .delete()
    //     .then(() => {
    //       console.log("delete");
    //     });
    // } else {
    //   postRef
    //     .doc(ids.id)
    //     .collection("likedUserId")
    //     .add({
    //       likedUserId: ids.uid,
    //     })
    //     .then(() => {
    //       console.log("add");
    //     });
    // }
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
