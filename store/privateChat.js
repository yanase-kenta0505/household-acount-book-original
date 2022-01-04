import firebase from "~/plugins/firebase";

const db = firebase.firestore();
const privateChatRef = db.collection("privateChat");
let unsubscribe;

export const state = () => ({
  privateChatDialog: false,
  partnerId: null,
  chatDatas: [],
  mutualFollowUserIds: null,
  mutualFollowUserChatLists: [],
});

export const actions = {
  setMutualFollowUserIds(context, mutualFollowUserId) {
    context.commit("setMutualFollowUserIds", mutualFollowUserId);
  },
  changePrivateChatDialog(context) {
    context.commit("changePrivateChatDialog");
  },
  registerPrivateChatMessage(context, ids) {
    let reorganizationString =
      ids.myId.substring(0, 5) + ids.partnerId.substring(0, 5);

    // console.log(reorganizationString);

    let stringArray = reorganizationString.split("");
    // console.log(stringArray);

    let newId = stringArray.sort().join("");
    // console.log(newId);

    // console.log(ids.myId + ids.partnerId);
    privateChatRef.doc(newId).collection("chatMessage").add({
      message: ids.message,
      timeStamp: firebase.firestore.Timestamp.now(),
      uid: ids.myId,
      partnerId: ids.partnerId,
    });
  },
  changePartnerId(context, id) {
    context.commit("changePartnerId", id);
  },
  chatDataSnapshot(context, id) {
    unsubscribe = privateChatRef
      .doc(id)
      .collection("chatMessage")
      .orderBy("timeStamp", "asc")
      .onSnapshot((snapshot) => {
        let datas = [];
        // console.log(snapshot);
        if (snapshot.docs.length === 0) {
          // context.commit("changeEmptyChatData");
          return;
        } else {
          snapshot.forEach((doc) => {
            // console.log("yaa");
            if (doc.data().timeStamp === null || undefined) {
              console.log("return");
              return;
            } else {
              let id = doc.id;
              let data = doc.data();
              data.id = id;
              datas.push(data);
            }
            // console.log(datas);
            context.commit("changeChatData", datas);
          });
        }
      });
  },
  getMutualFollowUserChatList(context, IdsArray) {
    // ダミー処理
    function getData(id) {
      return new Promise((resolve, reject) => {
        privateChatRef
          .doc(id)
          .collection("chatMessage")
          .orderBy("timeStamp", "desc")
          .get()
          .then((snap) => {
            if (snap.docs.length === 0) {
              return;
            } else {
              snap.docs.forEach((doc, index) => {
                if (index > 0) {
                  return;
                } else {
                  let id = doc.id;
                  let data = doc.data();
                  data.id = id;
                  resolve(data);
                }
              });
            }
          });

        // if (id) {
        //   resolve("OK");
        // } else {
        //   reject("ERROR");
        // }
      });
    }

    (async () => {
      // const array = [1, 2, 3];
      const array = IdsArray;

      const result = await Promise.all(
        array.map(async (id) => {
          const data = await getData(id);
          return data;
        })
      );

      // console.log(result); // ["OK", "OK", "OK"]

      context.commit("getMutualFollowUserChatList", result);
    })();

    // const MutualFollowUserChatLists = [];
    // array.forEach((mutualFollowUserId) => {
    //   privateChatRef
    //     .doc(mutualFollowUserId)
    //     .collection("chatMessage")
    //     .get()
    //     .then((snap) => {
    //       if (snap.docs.length === 0) {
    //         return;
    //       } else {
    //         snap.docs.forEach((doc, index) => {
    //           if (index > 0) {
    //             return;
    //           } else {
    //             let id = doc.id;
    //             let data = doc.data();
    //             data.id = id;
    //             MutualFollowUserChatLists.push(data);
    //           }
    //         });
    //       }
    //     })
    // });

    // console.log(MutualFollowUserChatLists.message)
  },
  unsubscribe(context) {
    unsubscribe();
    context.commit("changeEmptyChatData");
    // console.log("foo");
  },
};

export const mutations = {
  setMutualFollowUserIds(state, mutualFollowUserIds) {
    state.mutualFollowUserIds = mutualFollowUserIds;
  },
  changePrivateChatDialog(state) {
    state.privateChatDialog = !state.privateChatDialog;
  },
  changePartnerId(state, id) {
    state.partnerId = id;
  },
  changeChatData(state, datas) {
    state.chatDatas = [];
    datas.forEach((data) => {
      state.chatDatas.push(data);
    });
  },
  changeEmptyChatData(state) {
    state.chatDatas = [];
  },

  getMutualFollowUserChatList(state, mutualFollowUserChatLists) {
    state.mutualFollowUserChatLists = [];
    // console.log(mutualFollowUserChatLists);
    mutualFollowUserChatLists.forEach((mutualFollowUserChat) => {
      state.mutualFollowUserChatLists.push(mutualFollowUserChat);
    });
  },
};
