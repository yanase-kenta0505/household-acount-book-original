<template>
  <v-app>
    <v-dialog v-model="dialog" width="1000px">
      <template v-slot:activator="{ on, attrs }">
        <v-list-group
          :value="true"
          no-action
          sub-group　link
          v-bind="attrs"
          v-on="on"
          grey
          color="black"
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>収支入力・確認</v-list-item-title>
            </v-list-item-content>
          </template>
        </v-list-group>
      </template>
      <v-card width="1000px">
        <v-card-title class="text-h5 grey lighten-2">
          収支入力・確認
        </v-card-title>
        <v-tabs v-model="tab" grow>
          <v-tab
            v-for="(item, index) in items"
            :key="item"
            class="grey lighten-4"
          >
            <p
              style="width: 100%; height: 100%"
              class="pt-5"
              @click="changeIndex(index)"
            >
              {{ item }}
            </p>
          </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
          <v-tab-item
            v-for="componentsItem in componentsItems"
            :key="componentsItem"
            :class="index === 0 ? 'calendarHeight' : 'otherHeight'"
          >
            <component
              :is="componentsItem"
              :class="{
                pieGraph: index === 1,
                otherGraph: index === 2 || index === 3,
              }"
            />

            <date-picker v-if="index === 1" />
            <!-- <v-btn>fooo</v-btn> -->
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import ColumnChart from "~/components/columnChart.vue";
import PieChart from "~/components/pieChart.vue";
import LineChart from "~/components/lineChaart.vue";
import Calendar from "~/components/calendarDialog.vue";
import DatePicker from "~/components/datepicker.vue";
export default {
  components: { ColumnChart, PieChart, LineChart, Calendar, DatePicker },
  data() {
    return {
      dialog: false,
      tab: null,
      items: ["カレンダー", "円グラフ", "棒グラフ", "折れ線グラフ"],
      index: 0,
      componentsItems: ["Calendar", "PieChart", "ColumnChart", "LineChart"],
    };
  },
  methods: {
    changeIndex(index) {
      this.index = index;
    },
  },
};
</script>

<style lang="scss" scoped>
.pieGraph {
  width: 60%;
  margin-top: 30px;
  margin-left: 10px;
}

.otherGraph {
  width: 60%;
  margin-left: 50px;
  margin-top: 30px;
  width: 500px !important;
}

.calendarHeight {
  height: 700px;
}
.otherHeight {
  height: 500px;
}
</style>
