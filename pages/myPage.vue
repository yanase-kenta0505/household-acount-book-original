<template>
  <v-app id="inspire">
    <div id="container">
      <v-system-bar app height="80px" color="#CFD8DC">
        <v-icon large class="ml-5" @click="drawer = !drawer">mdi-menu</v-icon>
        <v-spacer></v-spacer>
        <p
          class="mr-10 mt-5 pa-5 white--text text-subtitle-1"
          id="moveLogin"
          @click="moveLogin"
        >
          ログインページへ
        </p>
      </v-system-bar>

      <v-navigation-drawer v-model="drawer" app>
        <v-sheet class="pa-4" color="#ECEFF1">
          <v-avatar class="mb-4" color="grey darken-1" size="64"></v-avatar>

          <div v-text="userName[this.index]"></div>
        </v-sheet>

        <v-divider></v-divider>

        <v-list>
          <household-acount-book />
          <post-dialog />
          <follow-dialog />
          <like-dialog />
          <direct-message />
          <acount-edit-dialog/>
        </v-list>
      </v-navigation-drawer>

      <v-main id="main" style="height: 100%"> </v-main>

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
export default {
  components: {
    PostDialog,
    FollowDialog,
    LikeDialog,
    DirectMessage,
    AcountEditDialog,
    HouseholdAcountBook
  },
  data: () => ({
    cards: ["Today", "Yesterday"],
    drawer: false,
    userName: ["kenta0505@gmai....", "非ログインユーザー"],
    expand: true,
    index: 1,
  }),

  created() {
    setTimeout(() => {
      this.expand = false;
    }, 500);
  },
  methods: {
    moveLogin() {
      this.$router.push("/login");
    },
  },
};
</script>

<style lang="scss" scoped>
#container {
  width: 100%;
  height: 100%;
  background-image: url("/money-manege.jpg");
  background-position: bottom center;
  background-size: cover;
  position: relative;
  & #moveLogin {
    &:hover {
      cursor: pointer;
    }
  }
  & .v-system-bar {
    background-color: rgba(165, 160, 160, 0.4) !important;
    z-index: 1 !important;
  }

  & .v-card--reveal {
    align-items: center;
    top: 0;
    justify-content: center;
    z-index: 2 !important;
    position: absolute;
  }
}

.v-list ::v-deep .v-application--wrap {
  min-height: unset !important;
}
</style>
