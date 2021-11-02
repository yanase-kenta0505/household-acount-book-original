<template>
  <v-app>
    <div class="text-center">
      <v-dialog v-model="dialog" width="500">
        <template v-slot:activator="{ on, attrs }">
          <!-- <v-btn color="red lighten-2" dark v-bind="attrs" v-on="on">
            Click Me
          </v-btn> -->

          <v-list-item link v-bind="attrs" v-on="on" grey>
            <v-list-item-icon>
              <v-icon>mdi-account-edit</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>アカウント編集</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>

        <v-card width="500px" height="600px">
          <v-card-title class="text-h5 d-flex justify-space-between">
            <v-btn text class="text-subtitle-2">キャンセル</v-btn>
            <span class="text-h6 font-weight-bold mr-8">変更</span>
            <v-btn text class="text-subtitle-2">保存</v-btn>
          </v-card-title>
          <div
            id="backImg"
            class="grey lighten-2 d-flex justify-center align-center"
            style="width: 100%; height: 150px"
          >
            <v-icon large>mdi-camera-plus</v-icon>
            <div
              id="whiteCircle"
              class="white d-flex justify-center align-center"
            >
              <div id="innerImg" class="grey lighten-2 d-flex justify-center align-center">
                  <v-icon >mdi-camera-plus</v-icon>
              </div>
            </div>
          </div>
          <v-text-field class="mt-10 ml-5"
           label="名前" style="width:90%">
           </v-text-field>
          <v-textarea class="ml-5 mt-10" style="width:90%" placeholder="自己紹介を追加しましょう"></v-textarea>
        </v-card>
      </v-dialog>
    </div>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
    };
  },
};
</script>

<style lang="scss" scoped>
.v-list-item__content {
  flex: initial;
}

#backImg {
  position: relative;
  & #whiteCircle {
    width: 70px;
    height: 70px;
    position: absolute;
    bottom: -35px;
    left: 30px;
    border-radius: 50%;
    & #innerImg {
      width: 60px;
      height: 60px;
      border-radius: 50%;
    }
  }
}


</style>
