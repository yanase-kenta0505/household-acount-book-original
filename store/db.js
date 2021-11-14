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
  add(context, eventItem) {
    calendarEventRef.add({
      amount: eventItem.amount,
      start: eventItem.start,
      classification: eventItem.classification,
      comment: eventItem.comment,
      state: eventItem.state,
    });
  },
  calendarSnapshot(context) {
    calendarEventRef.onSnapshot((snapshot) => {
      let events = [];
      snapshot.forEach((doc) => {
        events.push(doc.data());
      });
      context.commit("changecalendarEvent", events);
    });
  },
};

export const mutations = {
  changecalendarEvent(state, events) {
    state.calendarEvent = events;
  },

};
