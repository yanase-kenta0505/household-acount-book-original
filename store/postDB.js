import firebase from "~/plugins/firebase";

const db = firebase.firestore();
const postMessageRef = db.collection("postMessage");

export const state = () => ({
  postMessage: [],
});

export const getters = {
  postMessage(state) {
    return state.postMessage;
  },
};

export const actions = {
  postMessage(context, message) {
    context.commit("postMessage", message);
  },
};
export const mutations = {
  postMessage(state, message) {
    state.postMessage.push(message);
  },
};
