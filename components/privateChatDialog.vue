<template>
  <v-app>
    <v-dialog
      v-model="privateChatDialog"
      @click:outside="changePrivateChatDialog"
    >
      <v-card width="700px" height="500px" color="#E3F2FD">
        <v-card
          width="100%"
          height="12%"
          class="mx-auto mb-5 d-flex align-center"
          color="#3949AB"
          tile
        >
          <v-avatar size="50" color="white" class="ml-3"></v-avatar>
          <span class="ml-3 white--text">aaaaaa</span>
        </v-card>
        <v-card id="chatBox" width="90%" height="65%" class="mx-auto pt-8 pb-8">
          <div
            class="d-flex mt-3"
            v-for="chatData in chatDatas"
            :key="chatData.id"
          >
            <v-avatar
              class="ml-2"
              size="30"
              color="grey"
              v-if="myMessage(chatData) === false"
            ></v-avatar>
            <v-card
              width="30%"
              height="auto"
              v-bind:class="myMessage(chatData) ? 'me' : 'partner'"
            >
              {{ chatData.message }}
            </v-card>
          </div>
        </v-card>
        <v-card
          width="90%"
          height="12%"
          class="mx-auto mt-3 d-flex transparent"
          flat
        >
          <v-avatar
            size="50"
            color="primary"
            class="mr-2 ml-2 align-self-center"
          ></v-avatar>
          <v-textarea outlined class="white" v-model="message"></v-textarea>
          <v-btn
            color="primary"
            width="40px"
            height="40px"
            class="ml-2 align-self-center"
            @click="registerPrivateChatMessage()"
            >送信</v-btn
          >
        </v-card>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      message: "",
    };
  },
  computed: {
    privateChatDialog() {
      const a = JSON.parse(
        JSON.stringify(this.$store.state.privateChat.privateChatDialog)
      );
      return a;
    },
    partnerId() {
      const a = JSON.parse(
        JSON.stringify(this.$store.state.privateChat.partnerId)
      );
      return a;
    },
    chatDatas() {
      const a = JSON.parse(
        JSON.stringify(this.$store.state.privateChat.chatDatas)
      );
      return a;
    },
    myMessage() {
      return function (chatData) {
        // console.log(chatData.uid);
        // console.log(this.$router.currentRoute.params.id);
        // console.log(chatData.uid === this.$router.currentRoute.params.id);
        if (chatData.uid === this.$router.currentRoute.params.id) {
          return true;
        } else {
          return false;
        }
      };
    },
  },

  watch: {
    privateChatDialog() {
      let newId = (
        this.$router.currentRoute.params.id.substring(0, 5) +
        this.partnerId.substring(0, 5)
      )
        .split("")
        .sort()
        .join("");

      // console.log(newId);
      if (this.privateChatDialog === false) {
        this.$store.dispatch('privateChat/unsubscribe');
      } else {
        // console.log(this.partnerId);
        this.$store.dispatch("privateChat/chatDataSnapshot", newId);
      }
    },
  },

  methods: {
    changePrivateChatDialog() {
      this.$store.dispatch("privateChat/changePrivateChatDialog");
    },
    registerPrivateChatMessage() {
      if (this.message === "") {
        return;
      } else {
        this.$store.dispatch("privateChat/registerPrivateChatMessage", {
          myId: this.$router.currentRoute.params.id,
          partnerId: this.partnerId,
          message: this.message,
        });
        this.message = "";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .v-dialog {
  width: initial;
}

::v-deep .v-textarea {
  flex: initial;
  align-items: initial !important;
  width: 75%;
}

.partner {
  background-color: rgb(101, 101, 245);
  margin-right: auto;
  margin-left: 10px;
  color: white;
  font-size: 15px;
  padding: 5px;
}
.me {
  background-color: rgb(45, 163, 45);
  margin-left: auto;
  margin-right: 20px;
  color: white;
  font-size: 15px;
  padding: 5px;
}

#chatBox {
  overflow-y: scroll;
}
</style>
