import firebase from "~/plugins/firebase";

const db = firebase.firestore();
const usersRef = db.collection("users");

export const state = () => ({
  openCropperDialog: false,
  openMainCropperDialog: false,
  croppedHeaderImgUrl: null,
  croppedMainImgUrl: null,
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
};

export const actions = {
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
};
