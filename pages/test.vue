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
                  :event-color="getEventColor"
                  :type="type"
                  @change="updateRange"
                  @click:day="day"
                  @click:event="stop"
                ></v-calendar>
              </div>
            </template>
            <v-card width="500px" height="300px">
              <v-card-title>{{ selectDay }} </v-card-title>
              <v-text-field
                style="width: 80%"
                class="mx-auto"
                placeholder="名前"
                v-model="eventName"
              ></v-text-field>
              <v-text-field
                style="width: 80%"
                class="mx-auto"
                placeholder="金額"
                type="number"
                v-model="amount"
              ></v-text-field>

              <v-btn @click="addEvent">追加</v-btn>
            </v-card>
          </v-dialog>
          <v-menu
            v-model="selectedOpen"
            :close-on-content-click="false"
            :activator="selectedElement"
            offset-x
          >
            <v-card color="grey lighten-4" min-width="350px" flat>
              <v-toolbar :color="selectedEvent.color" dark>
                <v-btn icon>
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon>
                  <v-icon>mdi-heart</v-icon>
                </v-btn>
                <v-btn icon>
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </v-toolbar>
              <v-card-text>
                <span v-html="selectedEvent.details"></span>
              </v-card-text>
              <v-card-actions>
                <v-btn text color="secondary" @click="selectedOpen = false">
                  Cancel
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-menu>
        </v-sheet>
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
export default {
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
    amount: null,
  }),
  mounted() {
    this.$refs.calendar.checkChange();
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
      console.log(new Date(date));
      this.selectDay = new Date(date);
    },
    addEvent() {
      console.log(this.amount, this.selectDay);
      this.events.push({
        name: this.amount,
        start: this.selectDay,
      });
      this.dialog = false;
    },
    stop({ nativeEvent }) {
      console.log("stop");
      nativeEvent.stopPropagation();
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .v-calendar .v-event {
  color: white !important;
  font-size: 14px;
  background-color: grey;
  width: 100%;
  z-index: 3 !important;
}
</style>
