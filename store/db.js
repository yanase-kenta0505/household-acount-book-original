import firebase from "~/plugins/firebase";

const db = firebase.firestore();
const calendarPlusEventRef = db.collection("calendarPlusEvent");
const calendarMinusEventRef = db.collection("calendarMinusEvent");

export const state = () => ({
  calendarPlusEvent: [],
  calendarMinusEvent: [],
});

export const getters = {
  calendarPlusEvent(state) {
    return state.calendarPlusEvent;
  },
  calendarMinusEvent(state) {
    return state.calendarMinusEvent;
  },
};

export const actions = {
  add(context, eventItem) {
    if (eventItem.state === "plus") {
      calendarPlusEventRef.add({
        amount: eventItem.amount,
        start: eventItem.start,
        classification: eventItem.classification,
        comment: eventItem.comment,
        state: eventItem.state,
      });
    } else {
      calendarMinusEventRef.add({
        amount: eventItem.amount,
        start: eventItem.start,
        classification: eventItem.classification,
        comment: eventItem.comment,
        state: eventItem.state,
      });
    }
  },
  calendarSnapshot(context) {
    calendarPlusEventRef.onSnapshot((snapshot) => {
      let events = [];
      snapshot.forEach((doc) => {
        events.push(doc.data());
      });
      // console.log(events);
      context.commit("changeCalendarPlusEvent", events);
    });
    calendarMinusEventRef.onSnapshot((snapshot) => {
      let events = [];
      snapshot.forEach((doc) => {
        events.push(doc.data());
      });
      // console.log(events);
      context.commit("changeCalendarMinusEvent", events);
    });
  },
};

export const mutations = {
  changeCalendarPlusEvent(state, events) {
    state.calendarPlusEvent = events;
  },
  changeCalendarMinusEvent(state, events) {
    state.calendarMinusEvent = events;
  },
};
