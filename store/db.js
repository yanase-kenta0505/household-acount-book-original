import firebase from "~/plugins/firebase";

const db = firebase.firestore();
const calendarEventRef = db.collection("calendarEvent");

export const state = () => ({
  calendarEvent: [],
});

export const getters = {
  calendarEvent(state) {
    return state.calendarEvent;
  },
};

export const actions = {
  calendarSnapshot(context) {
    calendarEventRef.onSnapshot((snapshot) => {
      let events = [];
      snapshot.forEach((doc) => {
        // console.log(doc.id);
        const id = doc.id;
        const data = doc.data();
        data.id = id;
        // console.log(data);
        events.push(data);
      });
      context.commit("changecalendarEvent", events);
    });
  },
  add(context, eventItem) {
    calendarEventRef.add({
      amount: eventItem.amount,
      start: eventItem.start,
      classification: eventItem.classification,
      comment: eventItem.comment,
      state: eventItem.state,
    });
  },
  update(context, item) {
    // console.log(typeof item.amount);

    calendarEventRef.doc(item.id).update({
      classification: item.classification,
      amount: item.amount,
      comment: item.comment,
    });
  },
  delete(context, item) {
    // console.log(item)
    calendarEventRef.doc(item.id).delete();
  },
};

export const mutations = {
  changecalendarEvent(state, events) {
    state.calendarEvent = events;
  },
};
