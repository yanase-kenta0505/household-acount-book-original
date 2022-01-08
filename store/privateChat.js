import firebase from "~/plugins/firebase";

const db = firebase.firestore();
const privateChatRef = db.collection("privateChat");
const allChatRef = db.collection("allChat");
let unsubscribe;

export const state = () => ({
  privateChatDialog: false,
  partnerId: null,
  chatDatas: [],
  allChatDatas: [],
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

    let stringArray = reorganizationString.split("");

    let newId = stringArray.sort().join("");

    privateChatRef
      .doc(newId)
      .collection("chatMessage")
      .add({
        message: ids.message,
        timeStamp: firebase.firestore.Timestamp.now(),
        uid: ids.myId,
        partnerId: ids.partnerId,
        newId: newId,
        alreadyRead: false,
      })
      .then((result) => {
        console.log(result.id);
        allChatRef.add({
          message: ids.message,
          timeStamp: firebase.firestore.Timestamp.now(),
          uid: ids.myId,
          partnerId: ids.partnerId,
          newId: newId,
          alreadyRead: false,
          privateChatMessageId: result.id,
        });
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
  allChatSnapshot(context) {
    allChatRef.onSnapshot((snapshot) => {
      if (snapshot.docs === 0) {
        return;
      } else {
        const allChatData = [];
        snapshot.forEach((doc) => {
          let id = doc.id;
          let data = doc.data();
          data.id = id;
          allChatData.push(data);
        });
        context.commit("changeAllChatData", allChatData);
      }
    });
  },
  getMutualFollowUserChatList(context, IdsArray) {
    function getData(id) {
      return new Promise((resolve, reject) => {
        privateChatRef
          .doc(id)
          .collection("chatMessage")
          .orderBy("timeStamp", "desc")
          .get()
          .then((snap) => {
            if (snap.docs.length === 0) {
              reject();
            } else {
              snap.docs.map((doc, index) => {
                if (index > 0) {
                  reject();
                } else {
                  let id = doc.id;
                  let data = doc.data();
                  data.id = id;
                  // console.log(data);
                  resolve(data);
                }
              });
            }
          });
      });
    }

    (async () => {
      const array = IdsArray;
      // console.log(array)
      await Promise.allSettled(
        array.map(async (id) => {
          const data = await getData(id);
          return data;
        })
      )
        .then((result) => {
          const resolveData = result.map((data) => {
            if (data.status === "fulfilled") {
              return data.value;
            } else {
              return;
            }
          });
          // console.log(resolveData);
          // console.log("done");
          context.commit("getMutualFollowUserChatList", resolveData);
        })
        .catch((error) => {
          console.log(error);
        });
    })();
  },
  unsubscribe(context) {
    unsubscribe();
    context.commit("changeEmptyChatData");
    // console.log("foo");
  },

  alreadyRead(context, unreadDatas) {
    // console.log(unreadDatas);
    unreadDatas.forEach((unreadData) => {
      console.log(unreadData);
      privateChatRef
        .doc(unreadData.newId)
        .collection("chatMessage")
        .doc(unreadData.id)
        .update({
          alreadyRead: true,
        })
        .then(() => {
          // allChatRef.doc(unreadData.id).update({
          //   alreadyRead: true,
          // });
          allChatRef.get().then((snap) => {
            snap.docs.forEach((doc) => {
              // console.log(doc.data().privateChatMessageId);
              // console.log(unreadData.id);
              if (doc.data().privateChatMessageId !== unreadData.id) {
                // console.log("return");
                return;
              } else {
                // console.log(doc.id);
                allChatRef
                  .doc(doc.id)
                  .update({
                    alreadyRead: true,
                  })
                  .then(() => {
                    console.log("done");
                  });
              }
            });
          });
        });
    });
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
    // console.log("foo");
    // console.log(mutualFollowUserChatLists);
    state.mutualFollowUserChatLists = [];
    // console.log(mutualFollowUserChatLists);
    mutualFollowUserChatLists.forEach((mutualFollowUserChat) => {
      state.mutualFollowUserChatLists.push(mutualFollowUserChat);
    });
  },
  changeAllChatData(state, allChatData) {
    state.allChatDatas = [];
    allChatData.forEach((data) => {
      state.allChatDatas.push(data);
    });
  },
};
