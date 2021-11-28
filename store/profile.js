import firebase from "~/plugins/firebase";

const db = firebase.firestore();
const usersRef = db.collection("users");

export const state = () => ({
  headerImg: [],
  openCropperDialog: false,
});

export const getters = {
  headerImg(state) {
    return state.headerImg;
  },
  openCropperDialog(state) {
    return state.openCropperDialog;
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
  openCropperDialog(context) {
    context.commit("openCropperDialog");
  },
};
export const mutations = {
  changeHeaderImage(state, headerImg) {
    state.headerImg = headerImg;
  },
  openCropperDialog(state) {
    state.openCropperDialog = true;
  },
};
