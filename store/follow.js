import firebase from "~/plugins/firebase";

const db = firebase.firestore();
const followRef = db.collection("follow");

export const state = () => ({
  followingUids: [],
  followedUids: [],
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
    followRef
      .doc(id)
      .collection("followed")
      .onSnapshot((snapshot) => {
        let followedUids = [];
        snapshot.forEach((doc) => {
          let id = doc.id;
          let data = doc.data();
          data.id = id;
          followedUids.push(data);
        });
        context.commit("changefollowedUids", followedUids);
      });
  },
  registFollowing(context, items) {
    followRef.doc(items.id).collection("following").add({
      followingUid: items.selectedUid,
    });
    followRef.doc(items.selectedUid).collection("followed").add({
      followedUid: items.id,
    });
  },
  deleteFollowing(context, items) {
    followRef
      .doc(items.id)
      .collection("following")
      .doc(items.deleteItem.id)
      .delete();

   

    followRef
      .doc(items.deleteItem.followingUid)
      .collection("followed")
      .get()
      .then((snap) => {
        snap.docs.forEach((doc) => {
          if (doc.data().followedUid === items.id) {
            followRef
              .doc(items.deleteItem.followingUid)
              .collection("followed")
              .doc(doc.id)
              .delete();
          } else {
            return;
          }
        });
      });
  },
};

export const mutations = {
  changeFollowingUids(state, followingUids) {
   
    if (followingUids.length === 0) {
      state.followingUids = [];
    } else {
      state.followingUids = [];
      followingUids.forEach((uid) => {
        state.followingUids.push(uid);
      });
    }
  },
  changefollowedUids(state, followedUids) {
   
    if (followedUids.length === 0) {
      state.followedUids = [];
    } else {
      state.followedUids = [];
      followedUids.forEach((uid) => {
        state.followedUids.push(uid);
      });
    }
  },
};
