import firebase from "~/plugins/firebase";

const db = firebase.firestore();
const postRef = db.collection("Post");
const likeRef = db.collection("like");
const increment = firebase.firestore.FieldValue.increment(1);
const decrement = firebase.firestore.FieldValue.increment(-1);

export const state = () => ({
  postMessages: [],
});

export const actions = {
  messageSnapshot(context, uid) {
    postRef.orderBy("timeStamp", "desc").onSnapshot((snapshot) => {
      // console.log("snap");
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
    async function likedUserIdDelete() {
      const snap = await postRef.doc(ids.id).collection("likedUserId").get();
      const likedUserIds = [];
      if (snap.docs.length > 0) {
        snap.docs.forEach((doc) => {
          likedUserIds.push(doc.data().likedUserId);
          postRef.doc(ids.id).collection("likedUserId").doc(doc.id).delete();
          postRef.doc(ids.id).delete();
        });
        return likedUserIds;
      } else {
        postRef.doc(ids.id).delete();
      }
    }

    function likingDelete(likedUserIds) {
      likedUserIds.forEach((id) => {
        console.log(id);
        likeRef
          .doc(id)
          .collection("liking")
          .get()
          .then((snap) => {
            snap.docs.forEach((doc) => {
              if (doc.data().likingPostId !== ids.id) {
                return;
              } else {
                likeRef.doc(id).collection("liking").doc(doc.id).delete();
              }
            });
          });
      });
    }

    async function deleteMessage() {
      const likedUserIds = await likedUserIdDelete();
      console.log(likedUserIds);
      if (likedUserIds === undefined) {
        return;
      } else {
        likingDelete(likedUserIds);
      }
    }

    deleteMessage();

    // .then((snap) => {
    //   const likedUserIds = [];
    //   snap.docs.forEach((doc) => {
    //     likedUserIds.push(doc.data().likedUserId);
    //     //サブコレクションのlikedUserIdを削除する
    //     // postRef.doc(ids, id).collection("likedUserId").doc(doc.id).delete();
    //   });
    // })
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
              // console.log("add1");
              postRef.doc(ids.id).update({
                likeCount: increment,
              });

              context.dispatch("like/addLiking", ids, { root: true });
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
                // console.log("delete");
                context.dispatch("like/deleteLiking", ids, { root: true });
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
                // console.log("add2");
                context.dispatch("like/addLiking", ids, { root: true });
                postRef.doc(ids.id).update({
                  likeCount: increment,
                });
              });
          }
        }
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
