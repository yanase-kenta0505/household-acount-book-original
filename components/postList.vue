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
              <v-list-item-title>投稿一覧</v-list-item-title>
            </v-list-item-content>
          </template>
        </v-list-group>
      </template>
      <v-card width="600px" height="auto" class="pb-10">
        <v-card-title class="text-h5 grey lighten-2"> 投稿一覧 </v-card-title>

        <v-card
          id="follow-card"
          width="90%"
          height="auto"
          class="mx-auto mt-10"
          v-for="(message, index) in myPostMessages"
          :key="message.id"
        >
          <v-card-title>
            <v-avatar size="50" color="grey"></v-avatar>
            <span class="text-subtitle-1 ml-5"></span>
            <v-icon class="ml-auto" @click="deleteMessage(index)"
              >mdi-close-thick</v-icon
            >
          </v-card-title>
          <v-card-text class="mb-5"> {{ message.message }}</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-icon @click="dialog = false" class="mr-10 mb-5" color="pink"
              >mdi-chat-outline
            </v-icon>
            <v-icon @click="dialog = false" class="mr-10 mb-5" color="pink"
              >mdi-hand-heart
            </v-icon>
          </v-card-actions>
        </v-card>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      messages: [],
    };
  },
  computed: {
    myPostMessages() {
      const a = JSON.parse(
        JSON.stringify(this.$store.state.postDB.postMessages)
        // JSON.stringify(this.$store.getters["postDB/postMessages"])
      );

      let myPostMessages = [];
      a.forEach((message) => {
        if (message.uid === this.$router.currentRoute.params.id) {
          myPostMessages.push(message);
        }
      });
      return myPostMessages;
    },
  },
 
  // mounted() {
  //   this.$store.dispatch(
  //     "postDB/messageSnapshot",
  //     this.$router.currentRoute.params.id
  //   );
  // },
  methods: {
    deleteMessage(index) {
      this.$store.dispatch("postDB/deleteMessage", {
        uid: this.$router.currentRoute.params.id,
        id: this.myPostMessages[index].id,
      });
    },
  },
};
</script>
