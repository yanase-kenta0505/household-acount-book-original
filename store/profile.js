import firebase from "~/plugins/firebase";

const db = firebase.firestore();
const profileRef = db.collection("profile");

export const state = () => ({
  imageUrl: "",
});

export const getters = {
  imageUrl(state) {
    return state.imageUrl;
  },
};

export const actions = {
  setImage(context, url) {
    context.commit("setImage", url);
  },
};
export const mutations = {
  setImage(state, url) {
    state.imageUrl = url;
  },
};
