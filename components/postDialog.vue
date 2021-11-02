<template>
  <v-app>
    <v-list>
      <v-list-group :value="true" color="black">
        <template v-slot:activator>
          <v-list-item-icon>
            <v-icon>mdi-send</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>投稿</v-list-item-title>
          </v-list-item-content>
        </template>

        <v-dialog v-model="dialog" width="500">
          <template v-slot:activator="{ on, attrs }">
            <v-list-group
              :value="true"
              no-action
              sub-group　link
              v-bind="attrs"
              v-on="on"
              grey
              color="black"
            >
              <template v-slot:activator>
                <v-list-item-content>
                  <v-list-item-title>新規投稿作成</v-list-item-title>
                </v-list-item-content>
              </template>
            </v-list-group>
          </template>
          <v-card>
            <v-card-title class="text-h5 grey lighten-2">
              投稿画面
            </v-card-title>

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

        <v-list-group no-action sub-group color="black">
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>投稿一覧</v-list-item-title>
            </v-list-item-content>
          </template>
        </v-list-group>
      </v-list-group>
    </v-list>
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
::v-deep .mdi-menu-down::before {
  content: none !important;
}

.v-list-item__title {
  flex: initial;
}

.v-application .primary--text {
  color: grey;
}
.v-list .v-list-item--active{
  color: grey;
}
</style>
