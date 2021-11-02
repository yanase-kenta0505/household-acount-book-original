<template>
  <v-app>
    <div class="text-center">
      <v-dialog v-model="dialog" width="500">
        <template v-slot:activator="{ on, attrs }">
         

          <v-list-item link v-bind="attrs" v-on="on" grey>
            <v-list-item-icon>
              <v-icon>mdi-send</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>投稿</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>

        <v-card>
          <v-card-title class="text-h5 grey lighten-2"> 投稿画面 </v-card-title>

          <v-textarea
            placeholder="メッセージを入力してください"
            outlined
            style="width: 90%"
            class="mx-auto mt-10"
          ></v-textarea>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="dialog = false"> 投稿 </v-btn>
          </v-card-actions>
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
</style>
