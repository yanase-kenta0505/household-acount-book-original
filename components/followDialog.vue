<template>
  <v-app>
    <div class="text-center">
      <v-dialog v-model="dialog" width="500">
        <template v-slot:activator="{ on, attrs }">
          <v-list-item link v-bind="attrs" v-on="on" grey>
            <v-list-item-icon>
              <v-icon>mdi-account-heart-outline</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>フォロー</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>

        <v-card width="600px" height="700px">
          <v-card-title class="text-h5 grey lighten-2">
            フォロー中
            <span class="red--text subtitle-2"
              >※相互フォローをしている場合のみチャットが可能です
            </span>
          </v-card-title>

          <v-card
            id="follow-card"
            width="90%"
            height="150px"
            class="mx-auto mt-10"
            v-for="(followingUserData, index) in followingUserDatas"
            :key="followingUserData.uid"
          >
            <v-card-title>
              <v-avatar
                size="50"
                color="grey"
                :style="{
                  backgroundImage: `url(${followingUserData.mainImg})`,
                }"
              ></v-avatar>
              <span class="text-subtitle-1 ml-5">{{
                followingUserData.nickname
              }}</span>
              <v-spacer></v-spacer>

              <v-btn
                height="30px"
                color="#80CBC4"
                class="white--text mr-2"
                :disabled="mutualFollowState(followingUserData)"
                @click="changePrivateChatDialog(followingUserData.uid)"
                >チャットへ</v-btn
              >
              <v-btn
                height="30px"
                color="#EF9A9A"
                class="white--text"
                @click="followCancel(index)"
                >フォロー解除</v-btn
              >
            </v-card-title>
            <v-card-text>{{ followingUserData.selfIntroduction }}</v-card-text>
            <!-- <pre>{{ mutualFollowState(followingUserData) }}</pre> -->
          </v-card>
        </v-card>
      </v-dialog>
      <private-chat-dailog />
    </div>
  </v-app>
</template>

<script>
import PrivateChatDailog from "~/components/privateChatDialog.vue";
export default {
  components: { PrivateChatDailog },
  data() {
    return {
      dialog: false,
      // privateChatDialog: false,
      // followingUserDatas: null,
    };
  },
  computed: {
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
    usersData() {
      const a = JSON.parse(JSON.stringify(this.$store.state.profile.usersData));
      return a;
    },

    followingUserDatas() {
      //フォローしているユーザーの情報のみ取得
      let followingUserDatas = this.usersData.filter((data) => {
        // console.log(data);

        return this.followingUids.find((uid) => {
          return uid.followingUid === data.uid;
        });
      });

      return followingUserDatas;
    },

    mutualFollowState() {
      return function (followingUserData) {
        const key = followingUserData.uid;
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
      };
    },
  },
  methods: {
    followCancel(index) {
      let deleteItem = this.followingUids.find((uid) => {
        return uid.followingUid === this.followingUserDatas[index].uid;
      });

      this.$store.dispatch("follow/deleteFollowing", {
        id: this.$router.currentRoute.params.id,
        deleteItem: deleteItem,
      });
    },
    changePrivateChatDialog(selectedUid) {
      this.$store.dispatch("privateChat/changePartnerId", selectedUid);
      // console.log(followingUid)
      this.$store.dispatch("privateChat/changePrivateChatDialog");

    },
  },
};
</script>

<style lang="scss" scoped>
.v-list-item__content {
  flex: initial;
}
#follow-card {
  & .v-card__text {
    width: 100%;
    height: 60px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
  }
}
::v-deep .v-avatar {
  background-size: cover;
}
</style>
