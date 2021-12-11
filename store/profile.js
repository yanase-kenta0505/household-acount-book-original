import firebase from "~/plugins/firebase";

const db = firebase.firestore();
const usersRef = db.collection("users");

export const state = () => ({
  openCropperDialog: false,
  openMainCropperDialog: false,
  croppedHeaderImgUrl: null,
  croppedMainImgUrl: null,
  // profileData: null,
  usersData: [],
  headerImageItems: null,
  mainImageItems: null,
});

export const getters = {
  // openCropperDialog(state) {
  //   return state.openCropperDialog;
  // },
  // openMainCropperDialog(state) {
  //   return state.openMainCropperDialog;
  // },
  // croppedHeaderImgUrl(state) {
  //   return state.croppedHeaderImgUrl;
  // },
  // croppedMainImgUrl(state) {
  //   return state.croppedMainImgUrl;
  // },
  // profileData(state) {
  //   return state.profileData;
  // },
  // usersData(state) {
  //   // console.log(state.usersData);
  //   return state.usersData;
  // },
};

export const actions = {
  usersSnapshot(context) {
    usersRef.onSnapshot((snapshot) => {
      console.log("snap");
      let usersData = [];
      snapshot.forEach((doc) => {
        // console.log(doc.data());
        usersData.push(doc.data());
      });
      // localStorage.setItem("usersData", JSON.stringify(usersData));
      // console.log(usersData)
      context.commit("changeUsersData", usersData);
    });
  },
  setMainImage(context, mainImageItems) {
    context.commit("setMainImage", mainImageItems);
  },
  setHeaderImage(context, headerImageItems) {
    context.commit("setHeaderImage", headerImageItems);
  },

  openCropperDialog(context) {
    console.log("open");
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
    // console.log(profileItems);
    usersRef.doc(profileItems.id).update({
      headerImg: profileItems.headerImgUrl,
      mainImg: profileItems.mainImgUrl,
      nickname: profileItems.nickname,
      selfIntroduction: profileItems.selfIntroduction,
    });
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
  setMainImage(state, mainImageItems) {
    state.mainImageItems = mainImageItems;
  },
  setHeaderImage(state, headerImageItems) {
    state.headerImageItems = headerImageItems;
  },

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
  // changeProfile(state, profileData) {
  //   if (profileData === undefined) {
  //     return;
  //   } else {
  //     state.profileData = profileData;
  //     localStorage.setItem(
  //       "profileData",
  //       JSON.stringify({
  //         headerImgUrl: profileData.headerImgUrl,
  //         mainImgUrl: profileData.mainImgUrl,
  //         nickname: profileData.nickname,
  //         selfIntroduction: profileData.selfIntroduction,
  //       })
  //     );
  //   }
  // },
};
