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
          v-for="message in myPostMessages"
          :key="message.id"
        >
          <v-card-title>
            <v-avatar
              size="50"
              color="grey"
              :style="{ backgroundImage: `url(${message.img})` }"
            ></v-avatar>
            <span class="text-subtitle-1 ml-5"></span>
            <v-icon class="ml-auto" @click="deleteMessage(message)"
              >mdi-close-thick</v-icon
            >
          </v-card-title>
          <v-card-text class="mb-5"> {{ message.message }}</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-icon @click="dialog = false" class="mr-10" color="grey"
              >mdi-chat-outline
            </v-icon>

            <div class="mr-7">
              <v-icon
                class="mb-1 pink"
                @click="changeLikeCount(message)"
                :class="[chack_liking(message) ? 'pink' : 'grey']"
                >mdi-hand-heart
              </v-icon>

              <span>{{ message.likeCount }}</span>
            </div>
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
      );

      let myPostMessages = [];
      a.forEach((message) => {
        if (message.uid === this.$router.currentRoute.params.id) {
          myPostMessages.push(message);
        }
      });
      return myPostMessages;
    },
    likingPostIds() {
      const a = JSON.parse(
        JSON.stringify(this.$store.state.like.likingPostIds)
      );

      let allIds = [];
      a.forEach((id) => {
        allIds.push(id.likingPostId);
      });
      return allIds;
    },
    chack_liking() {
      return function (message) {
        return this.likingPostIds.includes(message.id);
      };
    },
  },

  methods: {
    deleteMessage(message) {
      // console.log(message)
      this.$store.dispatch("postDB/deleteMessage", {
        uid: this.$router.currentRoute.params.id,
        id: message.id,
      });
    },

    changeLikeCount(message) {
      this.$store.dispatch("postDB/changeLikeCount", {
        id: message.id,
        uid: this.$router.currentRoute.params.id,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .v-avatar {
  background-size: cover;
  &:hover {
    cursor: pointer;
    opacity: 0.7;
  }
}

::v-deep .theme--light.v-icon.pink {
  color: rgb(236, 61, 90);
  background-color: transparent !important;
}
::v-deep .theme--light.v-icon.grey {
  color: grey;
  background-color: transparent !important;
}
</style>
