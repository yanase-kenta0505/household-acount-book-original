<template>
  <v-app>
    <v-list>
      <v-list-group :value="true" color="black">
        <template v-slot:activator>
          <v-list-item-icon>
            <v-icon>mdi-finance</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>家計簿</v-list-item-title>
          </v-list-item-content>
        </template>
        <!-- <balance-of-payment /> -->
        <graph />
      </v-list-group>
    </v-list>
  </v-app>
</template>

<script>
// import BalanceOfPayment from "~/components/inputBalanceOfPayment.vue";
import Graph from "~/components/graph.vue";

export default {
  components: {
    // BalanceOfPayment,
    Graph,
  },
};
</script>

<style lang="scss" scoped>
::v-deep .mdi-menu-down::before {
  content: none !important;
}

.v-list-item__title {
  flex: initial;
}

.v-application .primary--text {
  color: grey;
}
.v-list .v-list-item--active {
  color: grey;
}
</style>
