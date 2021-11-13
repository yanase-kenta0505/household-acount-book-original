<template>
  <v-app>
    <v-card width="500px" height="500px">
      <v-card-title class="grey lighten-3">{{ selectDay }} </v-card-title>
      <v-select
        :items="selectItems"
        label="分類"
        style="width: 80%"
        class="mx-auto"
        v-model="selectedItem"
      ></v-select>
      <v-text-field
        style="width: 80%"
        class="mx-auto"
        label="金額"
        type="number"
        v-model="amount"
      ></v-text-field>
      <v-textarea
        outlined
        style="width: 80%"
        class="mx-auto mt-5"
        v-model="comment"
      >
      </v-textarea>

      <div class="text-center">
        <v-btn @click="increment" class="mr-5">+</v-btn>
        <v-btn @click="decrement" class="ml-5">ー</v-btn>
      </div>
    </v-card>
  </v-app>
</template>
<script>
export default {
  props: {
    selectDay: {
      type: String,
    },
    events: {
      type: Array,
    },
  },
  data() {
    return {
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
      selectedItem: null,
      amount: null,
      comment: "",
    };
  },
  methods: {
    increment() {
      this.$emit("add", {
        amount: Number(this.amount),
        start: new Date(this.selectDay),
        classification: this.selectedItem,
        comment: this.comment,
        state: "plus",
      });

      this.amount = null;
      this.selectedItem = "";
      this.comment = "";
      this.$emit("close");
    },
    decrement() {
      this.$emit("add", {
        amount: Number(-this.amount),
        start: new Date(this.selectDay),
        classification: this.selectedItem,
        comment: this.comment,
        state: "minus",
      });

      this.amount = null;
      this.selectedItem = "";
      this.comment = "";
      this.$emit("close");
    },
  },
};
</script>
