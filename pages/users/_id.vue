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
   
    index: 1,
    userMainImg: null,
  }),

  created() {
    this.$store.dispatch("profile/usersSnapshot");

   
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
    followingUids() {
      const a = JSON.parse(
        JSON.stringify(this.$store.state.follow.followingUids)
      );
      return a;
    },
    followedUids() {
      const a = JSON.parse(
        JSON.stringify(this.$store.state.follow.followedUids)
      );
      return a;
    },
    mutualFollowUserIds() {
      if (this.followingUids.length === 0 || this.followedUids.length === 0) {
        return;
      } else {
        const a = [];
        const b = [];
        this.followingUids.forEach((id) => {
          a.push(id.followingUid);
        });
        this.followedUids.forEach((id) => {
          b.push(id.followedUid);
        });

        const mutualFollowIds = a.filter((followingUid) => {
          return b.find((followedUid) => {
            return followingUid === followedUid;
          });
        });
        // console.log(mutualFollowIds);
        let newIds = [];

        mutualFollowIds.forEach((mutualFollowId) => {
          newIds.push(
            (
              this.$router.currentRoute.params.id.substring(0, 5) +
              mutualFollowId.substring(0, 5)
            )
              .split("")
              .sort()
              .join("")
          );
        });
        return newIds;
      }
    },
  },
  watch: {
    mutualFollowUserIds() {
      this.$store.dispatch(
        "privateChat/setMutualFollowUserIds",
        this.mutualFollowUserIds
      );
    },
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
}
::v-deep .v-system-bar {
  background-color: rgba(165, 160, 160, 0.4) !important;
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
