<template>
  <v-app>
    <div class="text-center">
      <v-dialog v-model="dialog" width="500">
        <template v-slot:activator="{ on, attrs }">
          <v-list-item link v-bind="attrs" v-on="on" grey>
            <v-list-item-icon>
              <v-icon>mdi-thumb-up</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>お気に入り</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>

        <v-card width="600px" height="700px">
          <v-card-title class="text-h5 grey lighten-2">
            お気に入り
          </v-card-title>

          <v-card
            id="follow-card"
            width="90%"
            height="auto"
            class="mx-auto mt-10"
            v-for="othersLikingPost in otherslikingPostMessages"
            :key="othersLikingPost.id"
          >
            <v-card-title>
              <v-avatar
                size="50"
                color="grey"
                :style="{ backgroundImage: `url(${othersLikingPost.img})` }"
              ></v-avatar>
              <span class="text-subtitle-1 ml-5">{{
                othersLikingPost.name
              }}</span>
            </v-card-title>
            <v-card-text class="mb-5"
              >{{ othersLikingPost.message }}
            </v-card-text>

            <v-card-actions class="d-flex align-start">
              <v-spacer></v-spacer>
              <v-icon @click="dialog = false" class="mr-10 mb-5m" color="grey"
                >mdi-chat-outline
              </v-icon>

              <div class="mr-7">
                <v-icon
                  class="mb-1 pink"
                  @click="changeLikeCount(othersLikingPost)"
                  >mdi-hand-heart
                </v-icon>

                <span>{{ othersLikingPost.likeCount }}</span>
              </div>
            </v-card-actions>
          </v-card>
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
  computed: {
    likingPostIds() {
      const a = JSON.parse(
        JSON.stringify(this.$store.state.like.likingPostIds)
      );
      return a;
    },
    othersPostMessages() {
      const allPostMessages = JSON.parse(
        JSON.stringify(this.$store.state.postDB.postMessages)
      );
      const othersPostMessages = allPostMessages.filter((message) => {
        return message.uid !== this.$router.currentRoute.params.id;
      });
      return othersPostMessages;
    },
    otherslikingPostMessages() {
      const otherPosts = this.othersPostMessages;
      const othersLikingPosts = otherPosts.filter((post) => {
        return this.likingPostIds.find((id) => {
          return post.id === id.likingPostId;
        });
      });
      return othersLikingPosts;
    },
  },
  methods: {
    changeLikeCount(othersLikingPost) {
      // console.log(othersLikingPost);

      this.$store.dispatch("postDB/changeLikeCount", {
        id: othersLikingPost.id,
        uid: this.$router.currentRoute.params.id,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.v-list-item__content {
  flex: initial;
}

::v-deep .theme--light.v-icon.pink {
  color: rgb(236, 61, 90);
  background-color: transparent !important;
}

::v-deep .v-avatar {
  background-size: cover;
  &:hover {
    cursor: pointer;
    opacity: 0.7;
  }
}
</style>
