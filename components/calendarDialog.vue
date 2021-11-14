<template>
  <v-app>
    <v-row class="fill-height">
      <v-col>
        <v-sheet height="64">
          <v-toolbar flat>
            <v-btn
              outlined
              class="mr-4"
              color="grey darken-2"
              @click="setToday"
            >
              Today
            </v-btn>
            <v-btn fab text small color="grey darken-2" @click="prev">
              <v-icon small> mdi-chevron-left </v-icon>
            </v-btn>
            <v-btn fab text small color="grey darken-2" @click="next">
              <v-icon small> mdi-chevron-right </v-icon>
            </v-btn>
            <v-toolbar-title v-if="$refs.calendar">
              {{ $refs.calendar.title }}
            </v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
        </v-sheet>

        <v-sheet height="600">
          <v-dialog v-model="dialog" width="500">
            <template v-slot:activator="{ on, attrs }">
              <div v-bind="attrs" v-on="on">
                <v-calendar
                  style="width: 100%; height: 600px"
                  ref="calendar"
                  v-model="focus"
                  color="primary"
                  :events="events"
                  :type="type"
                  @change="updateRange"
                  @click:day="day"
                  @click:event="stop"
                >
                  <template v-slot:event="{ event }">
                    <div
                      id="event"
                      :class="event.state === 'plus' ? 'plus' : 'minus'"
                    >
                      {{ `￥ ${event.amount.toLocaleString()}` }}
                    </div>
                  </template>
                </v-calendar>
              </div>
            </template>

            <add-calendar-event-card
              :events="events"
              :selectDay="selectDay"
              @close="close"
            />
          </v-dialog>
        </v-sheet>
        <v-dialog
          width="1000px"
          v-model="dataTableDialog"
          @click:outside="closeDataTable"
        >
          <data-table :sendEvents="sendEvents" ref="child" />
        </v-dialog>
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
import AddCalendarEventCard from "~/components/addCalendarEventCard.vue";
import DataTable from "~/components/datatableCard.vue";
export default {
  components: {
    AddCalendarEventCard,
    DataTable,
  },
  data: () => ({
    focus: "",
    type: "month",
    typeToLabel: {
      month: "Month",
      week: "Week",
      day: "Day",
      "4day": "4 Days",
    },
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    events: [],
    // plusEvents: [],
    // minusEvents: [],
    dialog: false,
    selectDay: null,
    eventName: "",
    dataTableDialog: false,
    sendEvents: null,
  }),
  mounted() {
    this.$refs.calendar.checkChange();
    // console.log(this.events);
  },
  computed: {
    calendarPlusEvent() {
      return this.$store.getters["db/calendarPlusEvent"];
    },
    calendarMinusEvent() {
      return this.$store.getters["db/calendarMinusEvent"];
    },
  },
  watch: {
    calendarPlusEvent() {
      if (this.calendarPlusEvent.length === 0) {
        return;
      } else {
        const targets = this.calendarPlusEvent.filter((event) => {
          return (
            new Date(event.start).getTime() ===
            new Date(this.selectDay).getTime()
          );
        });
        let plusNum = Number(0);
        targets.forEach((target) => {
          plusNum += target.amount;
        });

        const eventsArrayTarget = this.events.find((event) => {
          return (
            event.state === "plus" &&
            new Date(event.start).getTime() ===
              new Date(this.selectDay).getTime()
          );
        });

        if (eventsArrayTarget) {
          eventsArrayTarget.amount = plusNum;
        } else {
          this.events.push({
            amount: plusNum,
            start: new Date(this.selectDay),
            state: "plus",
          });
        }
      }
    },
    calendarMinusEvent() {
      if (this.calendarMinusEvent.length === 0) {
        return;
      } else {
        const targets = this.calendarMinusEvent.filter((event) => {
          return (
            new Date(event.start).getTime() ===
            new Date(this.selectDay).getTime()
          );
        });
        let minusNum = Number(0);
        targets.forEach((target) => {
          minusNum += target.amount;
        });

        const eventsArrayTarget = this.events.find((event) => {
          return (
            event.state === "minus" &&
            new Date(event.start).getTime() ===
              new Date(this.selectDay).getTime()
          );
        });

        if (eventsArrayTarget) {
          eventsArrayTarget.amount = minusNum;
        } else {
          this.events.push({
            amount: minusNum,
            start: new Date(this.selectDay),
            state: "minus",
          });
        }
      }
    },
    
  },
  methods: {
    getEventColor(event) {
      return event.color;
    },
    setToday() {
      this.focus = "";
    },
    prev() {
      this.$refs.calendar.prev();
    },
    next() {
      this.$refs.calendar.next();
    },

    updateRange({ start, end }) {
      const events = [];
      this.events = events;
    },
    day({ date }) {
      this.selectDay = date;
    },

    stop({ nativeEvent, event, day }) {
      // console.log(event.state);
      this.selectDay = day.date;
      // console.log(this.selectDay);
      let sendEvents;
      if (event.state === "plus") {
        sendEvents = this.plusEvents.filter((plusEvent) => {
          return (
            plusEvent.start.getTime() === new Date(this.selectDay).getTime()
          );
        });
      } else {
        sendEvents = this.minusEvents.filter((minusEvent) => {
          return (
            minusEvent.start.getTime() === new Date(this.selectDay).getTime()
          );
        });
      }

      // console.log(sendEvents);
      this.sendEvents = sendEvents;
      // console.log(this.sendEvents);
      this.dataTableDialog = true;
      nativeEvent.stopPropagation();
    },
    // add(addItem) {
    //   // console.log(addItem);
    //   if (addItem.state === "plus") {
    //     this.plusEvents.push(addItem);
    //   } else {
    //     this.minusEvents.push(addItem);
    //   }
    // },
    close() {
      this.dialog = false;
    },
    closeDataTable() {
      this.$refs.child.searchInitialize();
      this.dataTableDialog = false;
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .v-calendar .v-event {
  color: white !important;
  font-size: 14px;
  width: 90% !important;
  z-index: 3 !important;
  text-align: center;
  margin: 5px auto 5px;
  color: black !important;
  padding: 0;
  & .plus {
    background-color: rgb(234, 247, 234) !important;
  }
  & .minus {
    background-color: rgb(243, 207, 207) !important;
  }
}

::v-deep .v-application--wrap {
  min-height: initial;
}
</style>
