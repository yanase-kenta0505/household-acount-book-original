<template>
  <v-app>
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on, attrs }">
        <v-list-group
          :value="true"
          no-action
          sub-group
          link
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
        <v-card-title class="text-h5 grey lighten-2"> 投稿画面 </v-card-title>

        <v-textarea
          placeholder="メッセージを入力してください"
          outlined
          style="width: 90%"
          class="mx-auto mt-10"
          v-model="message"
        ></v-textarea>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="post"> 投稿 </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>
<script>
export default {
  data() {
    return {
      dialog: false,
      message: "",
    };
  },
  computed: {
    userData() {
      const a = JSON.parse(JSON.stringify(this.$store.state.profile.usersData));
      const userData = a.find((data) => {
        return data.uid === this.$router.currentRoute.params.id;
      });
      return userData;
    },
  },
 
  methods: {
    post() {
      this.$store.dispatch("postDB/postMessageAdd", {
        message: this.message,
        uid: this.$router.currentRoute.params.id,
        img:this.userData.mainImg,
        name:this.userData.nickname
      });
      this.message = "";
      this.dialog = false;
    },
  },
};
</script>
