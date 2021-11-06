<template>
  <v-app>
    <v-tab-item>
      <v-card flat width="100%" height="calc(100% - 110px)">
        <p
          style="width: 80%; height: 50px"
          class="mt-5 ml-auto text-right pt-3 text-h4"
          v-if="amount !== ''"
        >
          ￥{{ amount | changeNum | numberFormat }}
        </p>
        <v-text-field
          prefix="￥"
          label="金額"
          style="width: 80%"
          class="mx-auto"
          :class="{ topspace: amount === '' }"
          v-model="amount"
          type="number"
        ></v-text-field>
        <v-select
          :items="selectItems"
          label="分類"
          style="width: 80%"
          class="mx-auto"
        ></v-select>

        <v-row style="width: 100%" class="mt-5">
          <v-col cols="9" class="pa-0 mx-auto">
            <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              :return-value.sync="date"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="date"
                  label="日にちを選択してください"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="date" no-title scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="menu = false">
                  Cancel
                </v-btn>
                <v-btn text color="primary" @click="$refs.menu.save(date)">
                  OK
                </v-btn>
              </v-date-picker>
            </v-menu>
          </v-col>
        </v-row>

        <v-textarea
          label="コメント入力欄"
          outlined
          style="width: 80%"
          height="100px"
          class="mx-auto mt-5"
        ></v-textarea>

        <div style="width: 90%" class="mx-auto">
          <v-btn width="50px" class="ml-auto d-block mb-5" @click="resetAmount"
            >追加</v-btn
          >
        </div>
      </v-card>
    </v-tab-item>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      amount: "",
      price: 24000000000,
      text: "",
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
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      menu: false,
      modal: false,
      menu2: false,
    };
  },
  watch: {
    amount() {
      console.log(typeof this.amount);
    },
  },
  methods: {
    resetAmount() {
      this.amount = "";
    },
  },
  filters: {
    numberFormat: function (num) {
      return num.toLocaleString();
    },
    changeNum: function (value) {
      return Number(value);
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .v-text-field__prefix,
.v-text-field__suffix {
  font-weight: bold;
  font-size: 20px;
}
.topspace {
  margin-top: 30px;
}
</style>
