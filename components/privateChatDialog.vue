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
        <v-card width="90%" height="65%" class="mx-auto"> </v-card>
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
          <v-textarea outlined class="white"></v-textarea>
          <v-btn
            color="primary"
            width="40px"
            height="40px"
            class="ml-2 align-self-center"
            >送信</v-btn
          >
        </v-card>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
export default {
  computed: {
    privateChatDialog() {
      const a = JSON.parse(
        JSON.stringify(this.$store.state.privateChat.privateChatDialog)
      );
      return a;
    },
  },
  watch: {
    privateChatDialog() {
      console.log(this.privateChatDialog);
    },
  },
  methods: {
    changePrivateChatDialog() {
      this.$store.dispatch("privateChat/changePrivateChatDialog");
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
</style>
