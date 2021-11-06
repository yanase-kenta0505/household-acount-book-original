<template>
  <v-app>
    <v-dialog v-model="dialog" width="500" @click:outside="callChaild" >
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
              <v-list-item-title>収支入力</v-list-item-title>
            </v-list-item-content>
          </template>
        </v-list-group>
      </template>

      <v-card height="650px">
        <v-card-title class="text-h5 grey lighten-2"> 入力 </v-card-title>
        <v-tabs v-model="tab" background-color="transparent" grow>
          <v-tab v-for="(item, index) in items" :key="item" class="grey lighten-4" >
            <p
              style="width: 100%; height: 100%"
              class="pt-5"
              @click="changeIned(index)"
            >
              {{ item }}
            </p>
          </v-tab>
        </v-tabs>

        <template>
          <v-tabs-items v-model="tab">
            <income v-show="index === 0" ref="childIncome" />
            <spending v-show="index === 1" ref="childSpending" />
          </v-tabs-items>
        </template>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import Income from "~/components/income.vue";
import Spending from "~/components/spending.vue";
export default {
  components: { Income, Spending },
  data() {
    return {
      dialog: false,
      tab: null,
      items: ["支出", "収入"],
      index: 0,
    };
  },
  methods: {
    changeIned(index) {
      this.index = index;
      console.log(this.index);
    },
    callChaild(){
      this.$refs.childIncome.resetAmount()
    }
  },
};
</script>

<style lang="scss" scoped>
::v-deep .v-dialog {
  overflow-x: hidden !important;
}
</style>
