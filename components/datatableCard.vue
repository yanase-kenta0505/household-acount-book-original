<template>
  <v-app>
    <v-card height="700px" width="100%" class="mx-auto">
      <v-dialog v-model="dialog" width="500px">
        <edit-event-card :editTarget="editTarget" @close="close" />
      </v-dialog>

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
        <template v-slot:[`item.classification`]="{ item }">
          <p class="mt-5">{{ item.classification }}</p>
        </template>

        <template v-slot:[`item.amount`]="{ item }">
          <p class="mt-5">{{ item.amount }}</p>
        </template>
        <template v-slot:[`item.comment`]="{ item }">
          <p class="mt-5">{{ item.comment }}</p>
        </template>
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
import EditEventCard from "~/components/editEventCard.vue";
export default {
  components: { EditEventCard },
  props: {
    sendEvents: {
      type: Array,
    },
    plusEvent: {
      type: Array,
    },
    minusEvent: {
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
      selectItems: [
        "食費",
        "通信費",
        "家賃",
        "電気代",
        "水道代",
        "車関係",
        "保険",
        "その他",
      ],
      dialog: false,
      editTarget: {},
    };
  },
  mounted() {
    this.list = this.sendEvents;
  },

  // computed: {
  //   calendarEvents() {
  //     const a = JSON.parse(
  //       JSON.stringify(this.$store.getters["db/calendarEvent"])
  //     );
  //     // console.log(a);
  //     return a;
  //   },
  // },
  watch: {
    sendEvents(newEvents, oldEvents) {
      console.log("change");
      this.list = newEvents;
    },
    plusEvent(newEvents, oldEvents) {
      console.log(newEvents);
      this.list = newEvents;
    },
    minusEvent(newEvents, oldEvents) {
      console.log(newEvents);
      this.list = newEvents;
    },
    // sendEvents: {
    //   handler(newEvents, oldEvents) {
    //     console.log("change");
    //     this.list = newEvents;
    //   },
    //   deep: true,
    // },
  },
  methods: {
    searchInitialize() {
      this.search = "";
    },
    editItem(item) {
      // console.log(item);
      this.editTarget = item;
      this.dialog = true;
    },
    close() {
      this.dialog = false;
      this.$emit("close");
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep thead {
  & th:nth-of-type(1) {
    width: 200px !important;
  }
  & th:nth-of-type(2) {
    width: 200px !important;
  }
  & th:nth-of-type(4) {
    width: 100px !important;
  }
  & th:nth-of-type(5) {
    width: 100px !important;
  }
}

::v-deep .v-application--wrap {
  min-height: initial;
}
</style>
