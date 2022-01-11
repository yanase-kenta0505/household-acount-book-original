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
        // console.log(res.user.uid);
        usersRef
          .doc(res.user.uid)
          .get()
          .then((snap) => {
            // console.log(snap.data());
            if (snap.data() === undefined) {
              usersRef
                .doc(res.user.uid)
                .set({
                  uid: res.user.uid,
                  loginStatus: true,
                  headerImg: null,
                  headerImgFileName: null,
                  mainImg: null,
                  mainImgFileName: null,
                  nickname: res.user.displayName,
                  selfIntroduction: null,
                })
                .then(() => {
                  key.router.push({
                    name: "users-id",
                    params: { id: res.user.uid },
                  });
                });
            } else {
              console.log(snap.data().uid);
              let uid = snap.data().uid;
              key.router.push({
                name: "users-id",
                params: { id: uid },
              });
            }
          })
          .catch(() => {
            alert("新規登録をしてください。");
          });
      });
  },
  signOut(context, router) {
    firebase
      .auth()
      .signOut()
      .then(() => {
        router.push("/initialMyPage");
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
