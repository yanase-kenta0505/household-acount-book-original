<template>
  <v-app id="inspire">
    <div id="container">
      <v-system-bar app height="80px" color="#CFD8DC">
        <v-icon large class="ml-5" @click="drawer = !drawer">mdi-menu</v-icon>
        <v-spacer></v-spacer>
        <p
          id="gestLogin"
          @click="gestLogin"
          class="mr-10 mt-5 pa-5 white--text text-subtitle-1"
        >
          ゲストログイン
        </p>
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
      </v-navigation-drawer>

      <v-main id="main" style="height: 100%"> </v-main>

     
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
    HouseholdAcountBook,
  },
  data: () => ({
    cards: ["Today", "Yesterday"],
    drawer: false,
    userName: ["kenta0505@gmai....", "非ログインユーザー"],
    expand: true,
    index: 1,
    gestMail: "gest@gmail.com",
    gestPassword: "gestgest",
  }),

  
  methods: {
    moveLogin() {
      this.$router.push("/login");
    },
    gestLogin() {
      this.$store.dispatch("login/login", {
        mail: this.gestMail,
        password: this.gestPassword,
        router: this.$router,
      });
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

#gestLogin {
  &:hover {
    cursor: pointer;
  }
}
</style>
