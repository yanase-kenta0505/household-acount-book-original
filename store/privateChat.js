import firebase from "~/plugins/firebase";

export const state = () => ({
  privateChatDialog: false,
});

export const actions = {
  changePrivateChatDialog(context) {
    context.commit("changePrivateChatDialog");
  },
};

export const mutations = {
  changePrivateChatDialog(state) {
    state.privateChatDialog = !state.privateChatDialog;
  },
};
