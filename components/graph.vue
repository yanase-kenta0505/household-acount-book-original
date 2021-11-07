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
              <v-list-item-title>推移グラフ</v-list-item-title>
            </v-list-item-content>
          </template>
        </v-list-group>
      </template>
      <v-card width="1000px">
        <v-card-title class="text-h5 grey lighten-2"> 推移グラフ </v-card-title>
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
          <v-tab-item v-for="item in items" :key="item">
            <pie-chart v-show="index === 1" />
            <column-chart v-show="index === 2" />
            <line-chart v-show="index === 3" />
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
export default {
  components: { ColumnChart, PieChart, LineChart },
  data() {
    return {
      dialog: false,
      tab: null,
      items: ["カレンダー","円グラフ", "棒グラフ", "折れ線グラフ"],
      index: 0,
    };
  },
  methods: {
    changeIndex(index) {
      this.index = index;
    },
  },
};
</script>
