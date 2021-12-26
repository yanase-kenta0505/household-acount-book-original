import firebase from "~/plugins/firebase";

const db = firebase.firestore();
const followRef = db.collection("follow");

export const state = () => ({
  followingUids: [],
});

export const actions = {
  followingSnapshot(context, id) {
    followRef
      .doc(id)
      .collection("following")
      .onSnapshot((snapshot) => {
        let followingUids = [];
        snapshot.forEach((doc) => {
          let id = doc.id;
          let data = doc.data();
          data.id = id;
          followingUids.push(data);
        });
        context.commit("changeFollowingUids", followingUids);
      });
  },
  registFollowing(context, items) {
    followRef.doc(items.id).collection("following").add({
      followingUid: items.selectedUid,
    });
  },
  deleteFollowing(context, items) {
    followRef
      .doc(items.id)
      .collection("following")
      .doc(items.deleteItem.id)
      .delete()
      .then(() => {
        // console.log("delete");
      });
  },
};

export const mutations = {
  changeFollowingUids(state, followingUids) {
    // console.log("change");
    // console.log(followingUids);
    if (followingUids.length === 0) {
      state.followingUids = [];
    } else {
      state.followingUids = [];
      followingUids.forEach((uid) => {
        state.followingUids.push(uid);
      });
    }
  },
};
