<template>
  <v-app>
    <div class="text-center">
      <v-dialog v-model="dialog" width="500">
        <template v-slot:activator="{ on, attrs }">
          <v-list-item link v-bind="attrs" v-on="on" grey>
            <v-list-item-icon>
              <v-icon>mdi-account-edit</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>アカウント編集</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>

        <v-card width="500px" height="600px">
          <v-card-title class="text-h5 d-flex justify-space-between">
            <v-btn text class="text-subtitle-2" @click="close">閉じる</v-btn>
            <span class="text-h6 font-weight-bold">変更</span>
            <v-btn depressed class="white" plain disabled></v-btn>
          </v-card-title>
          <div
            id="backImg"
            class="grey lighten-2 d-flex justify-center align-center"
            style="width: 100%; height: 150px"
            :style="{ backgroundImage: `url(${headerImgUrl})` }"
            @mouseenter="headerCloseApper"
            @mouseleave="headerCloseDisapper"
          >
            <!-- <v-icon large>mdi-camera-plus</v-icon> -->
            <camera-plus v-show="headerImgUrl === null" />
            <v-btn
              id="headerImgClose"
              text
              fab
              small
              v-if="
                headerCloseIcon === true &&
                headerImgUrl &&
                mainCloseIcon === false
              "
              @click="deleteHeaderImg"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <div
              id="whiteCircle"
              class="white d-flex justify-center align-center"
              @click="stop"
              @mouseenter="mainCloseApper"
              @mouseleave="mainCloseDisapper"
            >
              <div
                id="innerImg"
                class="grey lighten-2 d-flex justify-center align-center pl-1"
                :style="{ backgroundImage: `url(${mainImgUrl})` }"
              >
                <main-img-camera-plus v-show="mainImgUrl === null" />
                <v-btn
                  id="mainImgClose"
                  text
                  fab
                  small
                  v-if="mainCloseIcon === true && mainImgUrl"
                  @click="deleteMainImg"
                >
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </div>
            </div>
          </div>
          <v-text-field
            class="mt-10 ml-5"
            label="名前"
            style="width: 90%"
            :value="nickname"
            @change="changeNickname"
          >
          </v-text-field>
          <v-textarea
            class="ml-5 mt-10"
            style="width: 90%"
            placeholder="自己紹介を追加しましょう"
            :value="selfIntroduction"
            @change="changeSelfIntroduction"
          ></v-textarea>
        </v-card>
        <cropper-dialog />
        <main-cropper-dialog />
      </v-dialog>
    </div>
  </v-app>
</template>

<script>
import CameraPlus from "~/components/cameraPlus.vue";
import CropperDialog from "~/components/cropperDialog.vue";
import MainImgCameraPlus from "~/components/mainImgCameraPlus.vue";
import MainCropperDialog from "~/components/mainCropperDialog.vue";

export default {
  components: {
    CameraPlus,
    CropperDialog,
    MainImgCameraPlus,
    MainCropperDialog,
  },
  data() {
    return {
      dialog: false,
      headerImgUrl: null,
      mainImgUrl: null,
      nickname: null,
      selfIntroduction: "",
      headerCloseIcon: false,
      mainCloseIcon: false,
    };
  },

  computed: {
    userData() {
      const a = JSON.parse(JSON.stringify(this.$store.state.profile.usersData));
      const userData = a.find((data) => {
        return data.uid === this.$router.currentRoute.params.id;
      });
      return userData;
    },
    croppedHeaderImgUrl() {
      const a = JSON.parse(
        JSON.stringify(this.$store.state.profile.croppedHeaderImgUrl)
      );
      return a;
    },
    croppedMainImgUrl() {
      const a = JSON.parse(
        JSON.stringify(this.$store.state.profile.croppedMainImgUrl)
      );
      return a;
    },
  },
  watch: {
    userData(newItem, oldItem) {
      console.log(newItem);
      this.headerImgUrl = newItem.headerImg;
      this.mainImgUrl = newItem.mainImg;
      this.nickname = newItem.nickname;
      this.selfIntroduction = newItem.selfIntroduction;
    },
    croppedHeaderImgUrl() {
      this.headerImgUrl = this.croppedHeaderImgUrl;
    },
    croppedMainImgUrl() {
      this.mainImgUrl = this.croppedMainImgUrl;
    },
  },

  methods: {
    stop(e) {
      e.stopPropagation();
    },
    deleteHeaderImg() {
      this.$store.dispatch("profile/deleteHeaderImg", {
        userData: this.userData,
        id: this.$router.currentRoute.params.id,
      });
    },
    deleteMainImg() {
      this.$store.dispatch("profile/deleteMainImg", {
        userData: this.userData,
        id: this.$router.currentRoute.params.id,
      });
    },

    headerCloseApper(e) {
      console.log("parent");
      this.headerCloseIcon = true;
      // e.stopPropagation();
    },
    headerCloseDisapper() {
      this.headerCloseIcon = false;
    },
    mainCloseApper(e) {
      console.log("child");
      this.mainCloseIcon = true;
      // e.stopPropagation();
    },
    mainCloseDisapper() {
      this.mainCloseIcon = false;
    },

    close() {
      this.dialog = false;
    },
    changeNickname(e) {
      console.log(e);
      this.$store.dispatch("profile/changeNickname", {
        nickname: e,
        id: this.$router.currentRoute.params.id,
      });
    },
    changeSelfIntroduction(e) {
      console.log(e);
      this.$store.dispatch("profile/changeSelfIntroduction", {
        selfIntroduction: e,
        id: this.$router.currentRoute.params.id,
      });
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
