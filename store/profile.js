import firebase from "~/plugins/firebase";

const db = firebase.firestore();
const usersRef = db.collection("users");

export const state = () => ({
  headerImg: null,
  openCropperDialog: false,
  croppedHeaderImgUrl: null,
});

export const getters = {
  headerImg(state) {
    return state.headerImg;
  },
  openCropperDialog(state) {
    return state.openCropperDialog;
  },
  croppedHeaderImgUrl(state) {
    return state.croppedHeaderImgUrl;
  },
};

export const actions = {
  
  setImage(context, url) {
    context.commit("setImage", url);
  },
  openCropperDialog(context) {
    context.commit("openCropperDialog");
  },
  displayHeaderImg(context, croppedHeaderImgUrl) {
    context.commit("displayHeaderImg", croppedHeaderImgUrl);
  },
};
export const mutations = {
  setImage(state, url) {
    state.headerImg = url;
  },
  openCropperDialog(state) {
    state.openCropperDialog = true;
  },
  displayHeaderImg(state, croppedHeaderImgUrl) {
    state.croppedHeaderImgUrl = croppedHeaderImgUrl;
  },
};
