<template>
  <v-app>
    <div class="text-center">
      <v-dialog v-model="dialog" width="500">
        <template v-slot:activator="{ on, attrs }">
          <v-list-item link v-bind="attrs" v-on="on" grey>
            <v-list-item-icon>
              <v-icon>mdi-human-greeting-proximity</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>DM</v-list-item-title>
            </v-list-item-content>
            <v-list-item-content class="ml-auto" v-if="unreadMessageLength > 0">
              <v-avatar size="24" color="pink" class="white--text">{{
                unreadMessageLength
              }}</v-avatar>
            </v-list-item-content>
          </v-list-item>
        </template>

        <v-card id="hidden-card" width="600px" height="700px">
          <v-card-title class="text-h5 grey lighten-2">
            メッセージ
          </v-card-title>

          <v-card
            id="follow-card"
            width="90%"
            height="200px"
            class="mx-auto mt-10"
            v-for="mutualFollowUserChatList in mutualFollowUserChatLists"
            :key="mutualFollowUserChatList.id"
          >
            <v-card-title>
              <v-avatar
                size="50"
                color="grey"
                :style="{
                  backgroundImage: `url(${partnerImg(
                    mutualFollowUserChatList
                  )})`,
                }"
              ></v-avatar>
              <span class="text-subtitle-1 ml-5">{{
                partnerName(mutualFollowUserChatList)
              }}</span>
            </v-card-title>
            <v-card-text class="text-truncate">{{
              mutualFollowUserChatList.message
            }}</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                class="mb-5"
                color="primary"
                text
                @click="openPrivateChatDialog(mutualFollowUserChatList)"
                >詳細</v-btn
              >
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
      expand: false,
    };
  },
  computed: {
    mutualFollowUserIds() {
      const a = JSON.parse(
        JSON.stringify(this.$store.state.privateChat.mutualFollowUserIds)
      );
      return a;
    },
    mutualFollowUserChatLists() {
      const a = JSON.parse(
        JSON.stringify(this.$store.state.privateChat.mutualFollowUserChatLists)
      );
      const c = a.filter((b) => {
        if (b === undefined) {
          return;
        } else {
          return b;
        }
      });
      // console.log(a)
      return c;
    },
    usersData() {
      const a = JSON.parse(JSON.stringify(this.$store.state.profile.usersData));
      // console.log(a)
      return a;
    },
    allChatDatas() {
      const a = JSON.parse(
        JSON.stringify(this.$store.state.privateChat.allChatDatas)
      );
      // console.log(a)
      return a;
    },
    chatDatas() {
      const a = JSON.parse(
        JSON.stringify(this.$store.state.privateChat.chatDatas)
      );
      // console.log(a)
      return a;
    },
    unreadMessageLength() {
      console.log(this.allChatDatas);
      // console.log(this.chatDatas)
      let unreadMessages = this.allChatDatas.filter((data) => {
        return (
          data.alreadyRead === false &&
          data.partnerId === this.$router.currentRoute.params.id
        );
      });
      // console.log(unreadMessages);
      let othersPostUnreadMessages = unreadMessages.filter((message) => {
        return message.uid !== this.$router.currentRoute.params.id;
      });

      // console.log(othersPostUnreadMessages);
      return othersPostUnreadMessages.length;
    },
    partnerName() {
      return function (mutualFollowUserChatList) {
        // console.log(mutualFollowUserChatList);
        const a = [];
        a.push(mutualFollowUserChatList.uid);
        a.push(mutualFollowUserChatList.partnerId);

        const b = a.find((id) => {
          return id !== this.$router.currentRoute.params.id;
        });

        const c = this.usersData.find((data) => {
          return data.uid === b;
        });
        // console.log(c);

        return c.nickname;
      };
    },
    partnerImg() {
      return function (mutualFollowUserChatList) {
        // console.log(mutualFollowUserChatList);
        const a = [];
        a.push(mutualFollowUserChatList.uid);
        a.push(mutualFollowUserChatList.partnerId);

        const b = a.find((id) => {
          return id !== this.$router.currentRoute.params.id;
        });

        const c = this.usersData.find((data) => {
          return data.uid === b;
        });
        // console.log(c);

        return c.mainImg;
      };
    },
  },
  created() {
    this.$store.dispatch("privateChat/allChatSnapshot");
  },
  watch: {
    dialog() {
      if (this.dialog === false) {
        return;
      } else {
        this.$store.dispatch(
          "privateChat/getMutualFollowUserChatList",
          this.mutualFollowUserIds
        );
      }
    },
    allChatDatas() {
      if (this.mutualFollowUserIds === null) {
        return;
      } else {
        this.$store.dispatch(
          "privateChat/getMutualFollowUserChatList",
          this.mutualFollowUserIds
        );
      }
    },
  },
  methods: {
    openPrivateChatDialog(mutualFollowUserChatList) {
      this.expand = true;
      // console.log(mutualFollowUserChatList);
      const ids = [];
      ids.push(mutualFollowUserChatList.uid);
      ids.push(mutualFollowUserChatList.partnerId);
      let partnerId = ids.find((id) => {
        return id !== this.$router.currentRoute.params.id;
      });
      // console.log(partnerId);

      this.$store.dispatch("privateChat/changePartnerId", partnerId);
      this.$store.dispatch("privateChat/changePrivateChatDialog");
    },
    onClickOutside() {
      this.expand = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.v-list-item__content {
  flex: initial;
}

#hidden-card {
  position: relative;
  & .v-card--reveal {
    top: 0;
    z-index: 2 !important;
    position: absolute;
    overflow-x: hidden;

    & #close-btn {
      position: absolute;
      bottom: 60px;
      right: 30px;
    }
  }
}

.v-application .transition-fast-in-fast-out {
  transition-duration: 1.5s !important;
}
</style>
