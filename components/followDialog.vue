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
              <v-icon>mdi-account-heart-outline</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>フォロー</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>

        <v-card width="600px" height="700px">
          <v-card-title class="text-h5 grey lighten-2">
            フォロー中
          </v-card-title>

          <v-card
            id="follow-card"
            width="90%"
            height="150px"
            class="mx-auto mt-10"
          >
            <v-card-title>
              <v-avatar size="50" color="grey"></v-avatar>
              <span class="text-subtitle-1 ml-5">けんたけんた</span>
              <v-spacer></v-spacer>
              <v-btn height="30px">フォロー解除</v-btn>
            </v-card-title>
            <v-card-text
              >ああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああ</v-card-text
            >
          </v-card>

          <!-- <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="dialog = false"> 投稿 </v-btn>
          </v-card-actions> -->
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
#follow-card {
  & .v-card__text {
    width: 100%;
    height: 60px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
  }
}
</style>
