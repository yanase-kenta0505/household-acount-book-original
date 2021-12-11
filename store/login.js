import firebase from "~/plugins/firebase";
const db = firebase.firestore();
const usersRef = db.collection("users");

export const actions = {
  stateChange(context) {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
      } else {
      }
    });
  },

  login(context, key) {
    firebase
      .auth()
      .signInWithEmailAndPassword(key.mail, key.password)
      .then((res) => {
        usersRef.doc(res.user.uid).set({
          uid: res.user.uid,
          loginStatus: true,
          headerImg: null,
          mainImg: null,
          nickname: res.user.displayName,
          selfIntroduction: null,
        });
        key.router.push({ name: "users-id", params: { id: res.user.uid } });
      })
      .catch(() => {
        alert("新規登録をしてください。");
      });
  },
  signOut(context, router) {
    firebase
      .auth()
      .signOut()
      .then(() => {
        router.push("/login");
      });
  },
  signUp(context, key) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(key.mail, key.password)
      .then((res) => {
        res.user.updateProfile({
          displayName: key.nickname,
        });
        key.router.push("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  },
};


