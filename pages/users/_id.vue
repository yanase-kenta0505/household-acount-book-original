<template>
  <v-app id="inspire">
    <div id="container">
      <v-system-bar app height="80px">
        <v-icon large class="ml-5" @click="drawer = !drawer">mdi-menu</v-icon>
        <v-spacer></v-spacer>
        <p
          class="mr-10 mt-5 pa-5 white--text text-subtitle-1"
          id="moveLogin"
          @click="signOut"
        >
          サインアウト
        </p>
      </v-system-bar>

      <v-navigation-drawer v-model="drawer" app>
        <v-sheet class="pa-4" color="#ECEFF1">
          <v-avatar
            class="mb-4"
            color="grey darken-1"
            size="64"
            :style="{ backgroundImage: `url(${userMainImg})` }"
          ></v-avatar>

          <h1>{{ userName }}様</h1>
        </v-sheet>

        <v-divider></v-divider>

        <v-list>
          <household-acount-book />
          <post-dialog />
          <follow-dialog />
          <like-dialog />
          <direct-message />
          <acount-edit-dialog />
        </v-list>
      </v-navigation-drawer>

      <v-main id="main" style="height: 500px">
        <all-post-message class="transparent" />
      </v-main>

      <v-expand-transition>
        <v-card
          v-if="expand"
          height="100%"
          width="100%"
          class="
            mx-auto
            secondary
            d-flex
            transition-fast-in-fast-out
            black
            darken-2
            v-card--reveal
          "
        ></v-card>
      </v-expand-transition>
    </div>
  </v-app>
</template>

<script>
import HouseholdAcountBook from "~/components/householdacountbook.vue";
import PostDialog from "~/components/postDialog.vue";
import FollowDialog from "~/components/followDialog.vue";
import LikeDialog from "~/components/likeDialog.vue";
import DirectMessage from "~/components/directMessage.vue";
import AcountEditDialog from "~/components/acountEditDialog.vue";
import AllPostMessage from "~/components/allPostMessage.vue";
export default {
  components: {
    PostDialog,
    FollowDialog,
    LikeDialog,
    DirectMessage,
    AcountEditDialog,
    HouseholdAcountBook,
    AllPostMessage,
  },

  data: () => ({
    cards: ["Today", "Yesterday"],
    drawer: false,
    userName: "",
    expand: true,
    index: 1,
    userMainImg: null,
  }),

  created() {
    this.$store.dispatch("profile/usersSnapshot");
    // this.$store.dispatch("postDB/allMessageSnapshot");

    setTimeout(() => {
      this.expand = false;
    }, 500);
    this.$store.dispatch("login/stateChange");
  },

  mounted() {
    this.$store.dispatch(
      "postDB/messageSnapshot",
      this.$router.currentRoute.params.id
    );
    this.$store.dispatch(
      "like/likingPostIdSnapshot",
      this.$router.currentRoute.params.id
    );
    
  },

  computed: {
    usersData() {
      const a = JSON.parse(JSON.stringify(this.$store.state.profile.usersData));
      return a;
    },
    // allPostMessages() {
    //   const a = JSON.parse(
    //     JSON.stringify(this.$store.state.postDB.postMessages)
    //   );

    //   // return a;
    // },
  },
  watch: {
    usersData() {
      const userData = this.usersData.find((data) => {
        return data.uid === this.$router.currentRoute.params.id;
      });
      this.userName = userData.nickname;
      this.userMainImg = userData.mainImg;
    },
  },

  methods: {
    signOut() {
      this.$store.dispatch("login/signOut", this.$router);
    },
  },
};
</script>

<style lang="scss" scoped>
#container {
  width: 100%;
  height: 700px;
  background-image: url("/money-manege.jpg");
  background-position: bottom center;
  background-size: cover;
  // position: relative;

  & #moveLogin {
    &:hover {
      cursor: pointer;
    }
  }

  // & .v-card--reveal {
  //   align-items: center;
  //   top: 0;
  //   justify-content: center;
  //   z-index: 2 !important;
  //   position: absolute;
  // }
}
::v-deep .v-system-bar {
  background-color: rgba(165, 160, 160, 0.4) !important;
  // z-index: 1 !important;
}

.v-list ::v-deep .v-application--wrap {
  min-height: unset !important;
}

#main ::v-deep .v-application--wrap {
  min-height: unset !important;
}

::v-deep .v-avatar {
  background-size: cover;
}
</style>
