<template>
  <v-app>
    <div class="text-center">
      <v-dialog v-model="dialog" width="500">
        <v-card width="500px" height="600px">
          <v-card-title class="d-flex justify-space-between">
            <v-btn text class="text-subtitle-2" @click="close">閉じる</v-btn>
            <span class="text-h6 font-weight-bold">{{ nickname }}</span>
            <v-btn depressed class="white" plain disabled></v-btn>
          </v-card-title>
          <div
            id="backImg"
            class="grey lighten-2 d-flex justify-center align-center"
            style="width: 100%; height: 150px"
            :style="{ backgroundImage: `url(${headerImgUrl})` }"
          >
            <div
              id="whiteCircle"
              class="white d-flex justify-center align-center"
            >
              <div
                id="innerImg"
                class="grey lighten-2 d-flex justify-center align-center pl-1"
                :style="{ backgroundImage: `url(${mainImgUrl})` }"
              ></div>
            </div>
          </div>
          <!-- <v-spacer /> -->
          <div class="d-flex justify-end mr-3">
            <v-btn
              width="150px"
              color="#80CBC4"
              class="white--text mt-5 mr-3"
              :disabled="mutualFollowState"
              @click="changePrivateChatDialog"
              >チャットへ</v-btn
            >
            <v-btn
              width="150px"
              color="#90CAF9"
              class="white--text mt-5"
              @click="registFollowing"
              v-show="followingState === false"
              >フォローする</v-btn
            >
            <v-btn
              width="150px"
              color="#EF9A9A"
              class="white--text mt-5"
              @click="deleteFollowing"
              v-show="followingState === true"
              >フォロー解除</v-btn
            >
          </div>

          <v-textarea
            class="ml-5 mt-10"
            style="width: 90%"
            :value="selfIntroduction"
            readonly
          />
        </v-card>
      </v-dialog>
    </div>
  </v-app>
</template>

<script>
export default {
  props: {
    index: {
      type: Number,
    },
  },
  data() {
    return {
      dialog: false,
      headerImgUrl: null,
      mainImgUrl: null,
      nickname: null,
      selfIntroduction: "",
      selectedUid: null,
    };
  },

  computed: {
    selectedPost() {
      const a = JSON.parse(
        JSON.stringify(this.$store.state.postDB.postMessages)
      );

      return a;
    },
    selectedusersData() {
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

    followingState() {
      if (this.index === null || undefined) {
        return;
      } else {
        const selectedUid = this.selectedPost[this.index].uid;
        let matchId = this.followingUids.filter((uid) => {
          return uid.followingUid === selectedUid;
        });
        if (matchId.length === 0) {
          return false;
        } else {
          return true;
        }
      }
    },
    mutualFollowState() {
      const key = this.selectedUid;
      // console.log(key);
      const a = [];
      this.followingUids.forEach((followingUid) => {
        a.push(followingUid.followingUid);
      });
      // console.log(this.followedUids);
      const b = [];
      this.followedUids.forEach((followedUid) => {
        b.push(followedUid.followedUid);
      });

      if (a.includes(key) && b.includes(key)) {
        // console.log("ok");
        return false;
      } else {
        // console.log("no");
        return true;
      }
    },
  },
  watch: {
    index() {
      const selectedUid = this.selectedPost[this.index].uid;
      const selectedUserData = this.selectedusersData.find((data) => {
        return data.uid === selectedUid;
      });

      this.headerImgUrl = selectedUserData.headerImg;
      this.mainImgUrl = selectedUserData.mainImg;
      this.nickname = selectedUserData.nickname;
      this.selfIntroduction = selectedUserData.selfIntroduction;
      this.selectedUid = selectedUid;
      console.log(selectedUid);
    },

    followingUids() {
      if (this.dialog === false) {
        // console.log("return");
        return;
      }
    },
  },
  created() {
    this.$store.dispatch(
      "follow/followingSnapshot",
      this.$router.currentRoute.params.id
    );
  },

  methods: {
    openDialog() {
      setTimeout(() => {
        this.dialog = true;
      }, 300);
    },
    close() {
      this.dialog = false;
    },
    registFollowing() {
      console.log("regist");
      if (this.selectedUid === this.$router.currentRoute.params.id) {
        return;
      }

      this.$store.dispatch("follow/registFollowing", {
        selectedUid: this.selectedUid,
        id: this.$router.currentRoute.params.id,
      });
    },
    deleteFollowing() {
      let deleteItem = this.followingUids.find((uid) => {
        return uid.followingUid === this.selectedUid;
      });

      this.$store.dispatch("follow/deleteFollowing", {
        id: this.$router.currentRoute.params.id,
        deleteItem: deleteItem,
      });
    },
    changePrivateChatDialog() {
      this.$store.dispatch("privateChat/changePrivateChatDialog");
    },
  },
};
</script>

<style lang="scss" scoped>
.v-list-item__content {
  flex: initial;
}

#backImg {
  position: relative;
  background-size: cover;

  & #whiteCircle {
    width: 70px;
    height: 70px;
    position: absolute;
    bottom: -35px;
    left: 30px;
    border-radius: 50%;
    z-index: 50;
    & #innerImg {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background-size: cover;
      position: relative;

      #mainImgClose {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }
  #headerImgClose {
    position: absolute;
    right: 10px;
    top: 10px;
  }
}
::v-deep .v-application--wrap {
  min-height: 0;
}
</style>
