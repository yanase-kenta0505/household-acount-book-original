<template>
  <v-app>
    <v-card height="700px" width="100%" class="mx-auto">
      <v-card-title>
        <v-spacer></v-spacer>
        <v-text-field
          
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table :headers="headers" :items="list" :search="search">
        <template v-slot:[`item.edit`]="{ item }">
          <v-icon @click="editItem(item)"> mdi-pencil </v-icon>
        </template>
        <template v-slot:[`item.delete`]="{ item }">
          <v-icon @click="deleteItem(item)"> mdi-delete </v-icon>
        </template>
      </v-data-table>
    </v-card>
  </v-app>
</template>

<script>
export default {
  props: {
    sendEvents: {
      type: Array,
    },
  },
  data() {
    return {
      search: "",
      headers: [
        {
          text: "種別",
          value: "classification",
        },
        {
          text: "金額",
          value: "amount",
        },
        {
          text: "コメント",
          value: "comment",
        },
        {
          text: "編集",
          value: "edit",
        },
        {
          text: "削除",
          value: "delete",
        },
      ],
      list: [],
    };
  },
  mounted() {
    this.list = this.sendEvents;
  },
  watch: {
    sendEvents(newEvents, oldEvents) {
      this.list = newEvents;
    },
  },
  methods: {
    searchInitialize() {
      this.search = "";
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep thead {
  & th:nth-of-type(1) {
    min-width: 120px;
  }
  & th:nth-of-type(2) {
    min-width: 120px;
  }
}
</style>
