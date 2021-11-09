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
            <v-card width="500px" height="300px">
              <v-card-title>{{ selectDay }} </v-card-title>

              <v-text-field
                style="width: 80%"
                class="mx-auto"
                label="金額"
                type="number"
                v-model="amount"
              ></v-text-field>

              <div class="text-center">
                <v-btn @click="increment">+</v-btn>
                <v-btn @click="decrement">ー</v-btn>
              </div>
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
    // incrementDone: false,
    // decrementDone: false,
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
      // this.selectDay = new Date(date);
      this.selectDay = date;
      // console.log(this.events);
    },
    increment() {
      const target = this.events.find((event) => {
        console.log(event.start.getTime());
        console.log(new Date(this.selectDay).getTime());
        console.log(
          event.start.getTime() === new Date(this.selectDay).getTime()
        );
        return (
          event.state === "plus" &&
          event.start.getTime() === new Date(this.selectDay).getTime()
        );
      });

      console.log(target);

      if (target) {
        console.log(target.amount + Number(this.amount));
        target.amount = target.amount + Number(this.amount);
      } else {
        this.events.push({
          // name: `￥ ${Number(this.amount).toLocaleString()}`,
          amount: Number(this.amount),
          start: new Date(this.selectDay),
          state: "plus",
        });
        // this.incrementDone = true;
      }
      this.dialog = false;
      this.amount = null;
    },
    decrement() {
      const target = this.events.find((event) => {
        console.log(event.start.getTime());
        console.log(new Date(this.selectDay).getTime());
        console.log(
          event.start.getTime() === new Date(this.selectDay).getTime()
        );
        return (
          event.state === "minus" &&
          event.start.getTime() === new Date(this.selectDay).getTime()
        );
      });

      console.log(target);

      if (target) {
        console.log(target.amount + Number(-this.amount));
        target.amount = target.amount + Number(-this.amount);
      } else {
        this.events.push({
          // name: `￥ ${Number(this.amount).toLocaleString()}`,
          amount: Number(-this.amount),
          start: new Date(this.selectDay),
          state: "minus",
        });
        // this.incrementDone = true;
      }
      this.dialog = false;
      this.amount = null;
    },

    stop({ nativeEvent, event, day }) {
      console.log(day);
      console.log(event);
      // console.log(nativeEvent);
      console.log("stop", event);
      nativeEvent.stopPropagation();
    },
    foo() {
      alert("foo");
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
</style>
