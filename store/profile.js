import firebase from "~/plugins/firebase";

const db = firebase.firestore();
const usersRef = db.collection("users");

export const state = () => ({
  headerImg: [],
});

export const getters = {
  headerImg(state) {
    return state.headerImg;
  },
};

export const actions = {
  profileSnapshot(context, uid) {
    usersRef
      .doc(uid)
      .collection("profile")
      .onSnapshot((snapshot) => {
        let headerImg = [];
        snapshot.forEach((doc) => {
          // console.log(doc.data().headerImgUrl);
          headerImg.push({
            id: doc.id,
            url: doc.data().headerImgUrl,
          });
        });
        context.commit("changeHeaderImage", headerImg);
      });
  },
  setImage(context, items) {
    console.log(items.uid);
    usersRef.doc(items.uid).collection("profile").add({
      headerImgUrl: items.url,
    });
  },
};
export const mutations = {
  changeHeaderImage(state, headerImg) {
    state.headerImg = headerImg;
  },
};
