import firebase from "~/plugins/firebase";

const db = firebase.firestore();
const usersRef = db.collection("users");

export const state = () => ({
  openCropperDialog: false,
  openMainCropperDialog: false,
  croppedHeaderImgUrl: null,
  croppedMainImgUrl: null,
  profileData: null,
});

export const getters = {
  openCropperDialog(state) {
    return state.openCropperDialog;
  },
  openMainCropperDialog(state) {
    return state.openMainCropperDialog;
  },
  croppedHeaderImgUrl(state) {
    return state.croppedHeaderImgUrl;
  },
  croppedMainImgUrl(state) {
    return state.croppedMainImgUrl;
  },
  profileData(state) {
    return state.profileData;
  },
};

export const actions = {
  profileSnapshot(context, uid) {
    console.log(uid);
    usersRef
      .doc(uid)
      .collection("profile")
      .onSnapshot((snapshot) => {
        let profileData;
        snapshot.forEach((doc) => {
          profileData = doc.data();
          let id = doc.id;
          profileData.id = id;
        });
        // console.log(profileData);
        context.commit("changeProfile", profileData);
      });
  },
  openCropperDialog(context) {
    context.commit("openCropperDialog");
  },
  openMainCropperDialog(context) {
    context.commit("openMainCropperDialog");
  },
  displayHeaderImg(context, croppedHeaderImgUrl) {
    context.commit("displayHeaderImg", croppedHeaderImgUrl);
  },
  displayMainImg(context, croppedMainImgUrl) {
    context.commit("displayMainImg", croppedMainImgUrl);
  },
  deleteHeaderImg(context) {
    context.commit("deleteHeaderImg");
  },
  deleteMainImg(context) {
    context.commit("deleteMainImg");
  },
  saveProfile(context, profileItems) {
    console.log(profileItems);
    usersRef.doc(profileItems.uid).collection("profile").add({
      headerImgUrl: profileItems.headerImgUrl,
      mainImgUrl: profileItems.mainImgUrl,
      nickname: profileItems.nickname,
      selfIntroduction: profileItems.selfIntroduction,
    });
  },
};
export const mutations = {
  openCropperDialog(state) {
    state.openCropperDialog = !state.openCropperDialog;
  },
  openMainCropperDialog(state) {
    state.openMainCropperDialog = !state.openMainCropperDialog;
  },
  displayHeaderImg(state, croppedHeaderImgUrl) {
    state.croppedHeaderImgUrl = croppedHeaderImgUrl;
  },
  displayMainImg(state, croppedMainImgUrl) {
    state.croppedMainImgUrl = croppedMainImgUrl;
  },
  deleteHeaderImg(state) {
    state.croppedHeaderImgUrl = null;
  },
  deleteMainImg(state) {
    state.croppedMainImgUrl = null;
  },
  changeProfile(state, profileData) {
    if (profileData === undefined) {
      return;
    } else {
      state.profileData = profileData;
      localStorage.setItem(
        "profileData",
        JSON.stringify({
          headerImgUrl: profileData.headerImgUrl,
          mainImgUrl: profileData.mainImgUrl,
          nickname: profileData.nickname,
          selfIntroduction: profileData.selfIntroduction,
        })
      );
    }
  },
};
