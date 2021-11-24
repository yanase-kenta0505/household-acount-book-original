<template>
  <v-app>
    <div>
      <!-- <div class="mb-6">
        Active picker: <code>{{ activePicker || "null" }}</code>
      </div> -->
      <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="date"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
            style="width: 300px"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="date"
          :active-picker.sync="activePicker"
          :max="
            new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
              .toISOString()
              .substr(0, 10)
          "
          min="2000-01-01"
          :picker-date.sync="pickerDate"
        ></v-date-picker>
      </v-menu>
    </div>
  </v-app>
</template>

<script>
import moment from "moment";
export default {
  data: () => ({
    activePicker: null,
    date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 4),
    menu: false,
    pickerDate: null,
  }),
  mounted(){
    console.log(this.menu)
  },
  watch: {
    menu(val) {
      val && setTimeout(() => (this.activePicker = "YEAR"));
    },
    pickerDate() {
      console.log(moment(this.pickerDate).format("YYYY"));
      console.log(this.date);
      this.date = moment(this.pickerDate).format("YYYY");
    },
    activePicker() {
      console.log(this.activePicker);
      if (this.activePicker !== "YEAR") {
        this.menu = false;
      }
    },
  },
  // methods: {
  //   save(date) {
  //     this.$refs.menu.save(date);
  //   },
  // },
};
</script>

<style lang="scss" scoped>
::v-deep .v-date-picker-title__date > div {
  display: none;
}

::v-deep .v-date-picker-title__year {
  font-size: 30px !important;
  justify-content: left !important;
  margin-bottom: 0;
}
</style>
