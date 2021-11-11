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
          width="500px"
          v-model="dialog2"
          @click:outside="dialog2 = false"
        >
          <v-card width="500px" height="300px"> </v-card>
        </v-dialog>
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
import AddCalendarEventCard from "~/components/addCalendarEventCard.vue";
export default {
  components: {
    AddCalendarEventCard,
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
    dialog: false,
    selectDay: null,
    eventName: "",

    dialog2: false,
  }),
  mounted() {
    this.$refs.calendar.checkChange();
  },
  watch: {
    events() {
      console.log(this.events);
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
      console.log("day");
      // this.selectDay = new Date(date);
      this.selectDay = date;
      console.log(typeof date);
    },

    stop({ nativeEvent, event, day }) {
      this.dialog2 = true;
      console.log("stop");
      nativeEvent.stopPropagation();
    },
    close() {
      this.dialog = false;
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