import firebase from "~/plugins/firebase";

const db = firebase.firestore();
const likeRef = db.collection("like");

export const state = () => ({
  likingPostIds: [],
});

export const actions = {
  likingPostIdSnapshot(contetx, uid) {
    likeRef
      .doc(uid)
      .collection("liking")
      .onSnapshot((snapshot) => {
        let likingPostIds = [];
        snapshot.forEach((doc) => {
          let id = doc.id;
          let data = doc.data();
          data.id = id;
          likingPostIds.push(data);
        });
        contetx.commit("changeLikingPostIds", likingPostIds);
      });
  },
  addLiking(context, ids) {
    // console.log("add");
    likeRef.doc(ids.uid).collection("liking").add({
      likingPostId: ids.id,
    });
  },
  deleteLiking(context, ids) {
    likeRef
      .doc(ids.uid)
      .collection("liking")
      .get()
      .then((snap) => {
        const a = snap.docs.find((doc) => {
          return doc.data().likingPostId === ids.id;
        });

        likeRef
          .doc(ids.uid)
          .collection("liking")
          .doc(a.id)
          .delete()
          .then(() => {
            // console.log("delete");
          });
      });
  },
};
export const mutations = {
  changeLikingPostIds(state, likingPostIds) {
    state.likingPostIds = [];
    likingPostIds.forEach((id) => {
      state.likingPostIds.push(id);
    });
  },
};
