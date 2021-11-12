<template>
  <v-app>
    <v-card width="500px" height="500px">
      <v-card-title class="grey lighten-3">{{ selectDay }} </v-card-title>
      <v-select
        :items="selectItems"
        label="分類"
        style="width: 80%"
        class="mx-auto"
      ></v-select>
      <v-text-field
        style="width: 80%"
        class="mx-auto"
        label="金額"
        type="number"
        v-model="amount"
      ></v-text-field>
      <v-textarea outlined style="width: 80%" class="mx-auto mt-5"> </v-textarea>

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
        "",
        "食費",
        "通信費",
        "家賃",
        "電気代",
        "水道代",
        "車関係",
        "保険",
        "その他",
      ],
      amount: null,
    };
  },
  methods: {
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

      this.amount = null;
      this.$emit("close");
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
      this.amount = null;
      this.$emit("close");
    },
  },
};
</script>
