<template>
  <v-app>
    <v-card
      id="postBox"
      width="700px"
      height="600px"
      class="transparent mx-auto pt-1"
      outlined
    >
      <v-card
        width="80%"
        height="auto"
        class="mx-auto mt-10"
        v-for="(message, index) in allPostMessages"
        :key="message.id"
      >
        <v-card-title>
          <v-avatar
            size="50"
            color="grey"
            :style="{ backgroundImage: `url(${message.img})` }"
            @click="openDialog(index)"
          ></v-avatar>
          <span class="text-subtitle-1 ml-5">{{message.name}}</span>
        </v-card-title>
        <v-card-text class="mb-5"> {{ message.message }}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <div>
            <v-icon class="mr-8" color="grey">mdi-chat-outline </v-icon>
          </div>
          <div class="mr-7">
            <v-icon
              :class="[chack_liking(message) ? 'pink' : 'grey']"
              class="mb-1"
              @click="changeLikeCount(index)"
              >mdi-hand-heart
            </v-icon>

            <span v-if="message.likeCount > 0">{{ message.likeCount }}</span>
          </div>
        </v-card-actions>
      </v-card>
      <confirm-others-data ref="child" :index="index" />
    </v-card>
  </v-app>
</template>

<script>
import ConfirmOthersData from "~/components/confirmOthersData.vue";
export default {
  components: {
    ConfirmOthersData,
  },
  data() {
    return {
      index: null,
    };
  },
  computed: {
    allPostMessages() {
      const a = JSON.parse(
        JSON.stringify(this.$store.state.postDB.postMessages)
      );
      return a;
    },
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
    openDialog(index) {
      if (
        this.allPostMessages[index].uid === this.$router.currentRoute.params.id
      ) {
        this.$store.dispatch("profile/changeAcountEditDialog");
      } else {
        this.$refs.child.openDialog();
        this.index = index;
      }
    },
    changeLikeCount(index) {
      // console.log(this.allPostMessages[index])
      this.$store.dispatch("postDB/changeLikeCount", {
        id: this.allPostMessages[index].id,
        uid: this.$router.currentRoute.params.id,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
#postBox {
  overflow: scroll;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    display: none;
  }
}

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
