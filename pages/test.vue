<template>
  <v-app>
    <div>
      <v-sheet
        tile
        height="6vh"
        color="grey lighten-3"
        class="d-flex align-center"
      >
        <v-btn outlined small class="ma-4" @click="setToday"> 今日 </v-btn>
        <v-btn icon @click="$refs.calendar.prev()">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
        <v-btn icon @click="$refs.calendar.next()">
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
        <v-toolbar-title>{{ title }}</v-toolbar-title>
      </v-sheet>
      <v-sheet height="94vh">
        <v-calendar
          ref="calendar"
          v-model="value"
          :events="events"
          :event-color="getEventColor"
          locale="ja-jp"
          :day-format="(timestamp) => new Date(timestamp.date).getDate()"
          :month-format="
            (timestamp) => new Date(timestamp.date).getMonth() + 1 + ' /'
          "
          @change="getEvents"
          @click:event="showEvent"
          @click:date="viewDay"
        ></v-calendar>
      </v-sheet>
    </div>
  </v-app>
</template>

<script>
import moment from "moment";

export default {
  data: () => ({
    events: [],
    value: moment().format("YYYY-MM-DD"),
  }),
  watch: {
    events() {
      console.log(this.events);
    },
  },
  computed: {
    title() {
      return moment(this.value).format("YYYY年 M月");
    },
  },
  methods: {
    setToday() {
      this.value = moment().format("YYYY-MM-DD");
    },
    showEvent({ event }) {
      alert(`clicked ${event.name}`);
    },
    viewDay({ date }) {
      alert(`date: ${date}`);
    },
    getEvents() {
      const events = [
        // new Dateからmomentに変更
        {
          name: "会議",
          start: moment("2020-08-03 10:00:00").toDate(),
          end: moment("2020-08-03 11:00:00").toDate(),
          color: "blue",
          timed: true,
        },
        // イベントを追加
        {
          name: "休暇",
          start: moment("2020-08-04").toDate(),
          end: moment("2020-08-04").toDate(),
          color: "green",
          timed: false,
        },
        {
          name: "出張",
          start: moment("2020-08-05").toDate(),
          end: moment("2020-08-07").toDate(),
          color: "cyan",
          timed: false,
        },
        {
          name: "飲み会",
          start: moment("2020-08-06").toDate(),
          end: moment("2020-08-06").toDate(),
          color: "orange",
          timed: false,
        },
        {
          name: "打ち合わせ",
          start: moment("2020-08-07 10:00").toDate(),
          end: moment("2020-08-07 11:00").toDate(),
          color: "cyan",
          timed: true,
        },
        {
          name: "振り返り",
          start: moment("2020-08-07 11:00:00").toDate(),
          end: moment("2020-08-07 12:00").toDate(),
          color: "cyan",
          timed: true,
        },
        {
          name: "休暇",
          start: moment("2020-09-07").toDate(),
          end: moment("2020-09-11").toDate(),
          color: "green",
          timed: false,
        },
      ];
      this.events = events;
    },
    getEventColor(event) {
      return event.color;
    },
  },
};
</script>
