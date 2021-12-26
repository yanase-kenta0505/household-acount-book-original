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
          >
            <v-card-title>
              <v-avatar size="50" color="grey"></v-avatar>
              <span class="text-subtitle-1 ml-5">けんたけんた</span>
            </v-card-title>
            <v-card-text class="text-truncate"
              >ああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああ</v-card-text
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn class="mb-5" color="primary" text @click="expandChange"
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
  methods: {
    expandChange() {
      this.expand = true;

      // setTimeout(() => {
      //   this.expand = false;
      // }, 500);
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

    & #close-btn{
      position: absolute;
      bottom:60px;
      right: 30px;
    }
  }
}

.v-application .transition-fast-in-fast-out {
  transition-duration: 1.5s !important;
}
</style>
