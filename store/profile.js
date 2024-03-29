import firebase from "~/plugins/firebase";

const db = firebase.firestore();
const usersRef = db.collection("users");

export const state = () => ({
  openCropperDialog: false,
  openMainCropperDialog: false,
  croppedHeaderImgUrl: null,
  croppedMainImgUrl: null,
  usersData: [],
  headerImgFileName: null,
  beforeCropHeaderImgUrl: null,
  mainImgFileName: null,
  beforeCropMainImgUrl: null,
  changeAcountEditDialog: false,
});

export const actions = {
  usersSnapshot(context) {
    usersRef.onSnapshot((snapshot) => {
      // console.log("snap");
      let usersData = [];
      snapshot.forEach((doc) => {
        usersData.push(doc.data());
      });
      context.commit("changeUsersData", usersData);
    });
  },
  setHeaderImage(context, headerImageItems) {
    context.commit("setHeaderImage", headerImageItems);
  },
  setMainImage(context, mainImageItems) {
    context.commit("setMainImage", mainImageItems);
  },

  openCropperDialog(context) {
    console.log("open");
    context.commit("openCropperDialog");
  },
  openMainCropperDialog(context) {
    context.commit("openMainCropperDialog");
  },
  registerHeaderImg(context, items) {
    // context.commit("displayHeaderImg", croppedHeaderImgUrl);
    usersRef.doc(items.id).update({
      headerImgFileName: items.headerImgFileName,
      headerImg: items.croppedHeaderImgUrl,
    });

    context.commit("clearBeforeCropHeaderImgUrl");
  },
  registerMainImg(context, items) {
    // context.commit("displayMainImg", croppedMainImgUrl);
    usersRef.doc(items.id).update({
      mainImgFileName: items.mainImgFileName,
      mainImg: items.croppedMainImgUrl,
    });
    context.dispatch(
      "postDB/setImg",
      {
        id: items.id,
        img: items.croppedMainImgUrl,
      },
      { root: true }
    );

    context.commit("clearBeforeCropMainImgUrl");
  },

  deleteHeaderImg(context, items) {
    const storage = firebase.storage().ref();
    storage
      .child(`header/${items.userData.headerImgFileName}`)
      .delete()
      .then(() => {
        console.log("delete");
        usersRef.doc(items.id).update({
          headerImg: null,
          headerImgFileName: null,
        });
      });
  },
  deleteMainImg(context, items) {
    const storage = firebase.storage().ref();
    storage
      .child(`main/${items.userData.mainImgFileName}`)
      .delete()
      .then(() => {
        console.log("delete");
        usersRef.doc(items.id).update({
          mainImg: null,
          mainImgFileName: null,
        });
      });

    context.dispatch(
      "postDB/removeImg",
      {
        id: items.id,
      },
      { root: true }
    );
  },
  changeNickname(context, items) {
    usersRef.doc(items.id).update({
      nickname: items.nickname,
    });
  },
  changeSelfIntroduction(context, items) {
    usersRef.doc(items.id).update({
      selfIntroduction: items.selfIntroduction,
    });
  },
  changeAcountEditDialog(context) {
    context.commit("changeAcountEditDialog");
  },
};

export const mutations = {
  changeUsersData(state, usersData) {
    // console.log(usersData);
    state.usersData = [];
    usersData.forEach((data) => {
      state.usersData.push(data);
    });
  },
  setHeaderImage(state, headerImageItems) {
    state.headerImgFileName = headerImageItems.fileName;
    state.beforeCropHeaderImgUrl = headerImageItems.url;
  },
  setMainImage(state, mainImageItems) {
    state.mainImgFileName = mainImageItems.fileName;
    state.beforeCropMainImgUrl = mainImageItems.url;
  },

  openCropperDialog(state) {
    state.openCropperDialog = !state.openCropperDialog;
  },
  openMainCropperDialog(state) {
    state.openMainCropperDialog = !state.openMainCropperDialog;
  },

  clearBeforeCropHeaderImgUrl(state) {
    state.beforeCropHeaderImgUrl = null;
  },
  clearBeforeCropMainImgUrl(state) {
    state.beforeCropMainImgUrl = null;
  },
  changeAcountEditDialog(state) {
    state.changeAcountEditDialog = !state.changeAcountEditDialog;
  },
};
