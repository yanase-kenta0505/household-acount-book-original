<template>
  <v-app>
    <v-card width="500px" height="500px">
      <v-card-title class="grey lighten-3">{{ day }} </v-card-title>
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
        <v-btn @click="update" class="mr-5">更新</v-btn>
      </div>
    </v-card>
  </v-app>
</template>
<script>
import moment from "moment";
export default {
  props: {
    editTarget: {
      type: Object,
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
      selectedItem: "",
      comment: "",
      day: null,
      amount: null,
      id: null,
    };
  },
  watch: {
    editTarget() {
      console.log(this.editTarget);
      this.day = moment(this.editTarget.start).format("YYYY-MM-DD");
      this.selectedItem = this.editTarget.classification;
      this.amount = this.editTarget.amount;
      this.comment = this.editTarget.comment;
      this.id = this.editTarget.id;
    },
  },
  mounted() {
    console.log(this.editTarget);
    this.day = moment(this.editTarget.start).format("YYYY-MM-DD");
    this.selectedItem = this.editTarget.classification;
    this.amount = this.editTarget.amount;
    this.comment = this.editTarget.comment;
    this.id = this.editTarget.id;
  },

  methods: {
    update() {
      this.$store.dispatch("db/update", {
        classification: this.selectedItem,
        amount: Number(this.amount),
        comment: this.comment,
        id: this.id,
      });
      this.$emit("close");
    },
  },
};
</script>
