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
          <v-spacer />
          <v-btn
            width="150px"
            color="#90CAF9"
            class="white--text mt-5"
            style="margin-left: 300px"
            >フォローする</v-btn
          >

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
      // selectedUserData: null,
      headerImgUrl: null,
      mainImgUrl: null,
      nickname: null,
      selfIntroduction: "",
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
  },
  watch: {
    index() {
      console.log(this.selectedPost[this.index].uid);
      const selectedUid = this.selectedPost[this.index].uid;
      const selectedUserData = this.selectedusersData.find((data) => {
        return data.uid === selectedUid;
      });
      console.log(selectedUserData);
      this.headerImgUrl = selectedUserData.headerImg;
      this.mainImgUrl = selectedUserData.mainImg;
      this.nickname = selectedUserData.nickname;
      this.selfIntroduction = selectedUserData.selfIntroduction;
    },
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
