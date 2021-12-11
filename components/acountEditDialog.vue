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
            <v-btn text class="text-subtitle-2" @click="close"
              >キャンセル</v-btn
            >
            <span class="text-h6 font-weight-bold mr-8">変更</span>
            <v-btn text class="text-subtitle-2" @click="saveProfile"
              >保存</v-btn
            >
          </v-card-title>
          <div
            id="backImg"
            class="grey lighten-2 d-flex justify-center align-center"
            style="width: 100%; height: 150px"
            :style="{ backgroundImage: `url(${headerImgUrl})` }"
            @click="headerImgChangeOrDelete"
          >
            <!-- <v-icon large>mdi-camera-plus</v-icon> -->
            <camera-plus v-show="headerImgUrl === null" />
            <div
              id="whiteCircle"
              class="white d-flex justify-center align-center"
              @click="stop"
            >
              <div
                id="innerImg"
                class="grey lighten-2 d-flex justify-center align-center pl-1"
                :style="{ backgroundImage: `url(${mainImgUrl})` }"
                @click="mainImgChangeOrDelete"
              >
                <main-img-camera-plus v-show="mainImgUrl === null" />
              </div>
            </div>
          </div>
          <v-text-field
            class="mt-10 ml-5"
            label="名前"
            style="width: 90%"
            v-model="nickname"
          >
          </v-text-field>
          <v-textarea
            class="ml-5 mt-10"
            style="width: 90%"
            placeholder="自己紹介を追加しましょう"
            v-model="selfIntroduction"
          ></v-textarea>
        </v-card>
        <cropper-dialog />
        <main-cropper-dialog />
        <header-img-change-or-delete-dialog ref="header" />
        <main-img-change-or-delete-dialog ref="main" />
      </v-dialog>
    </div>
  </v-app>
</template>

<script>
import CameraPlus from "~/components/cameraPlus.vue";
import CropperDialog from "~/components/cropperDialog.vue";
import MainImgCameraPlus from "~/components/mainImgCameraPlus.vue";
import MainCropperDialog from "~/components/mainCropperDialog.vue";
import HeaderImgChangeOrDeleteDialog from "~/components/headerImgChangeOrDeleteDialog.vue";
import MainImgChangeOrDeleteDialog from "~/components/mainImgChangeOrDeleteDialog.vue";
export default {
  components: {
    CameraPlus,
    CropperDialog,
    MainImgCameraPlus,
    MainCropperDialog,
    HeaderImgChangeOrDeleteDialog,
    MainImgChangeOrDeleteDialog,
  },
  data() {
    return {
      dialog: false,
      headerImgUrl: null,
      mainImgUrl: null,
      nickname: null,
      selfIntroduction: "",
    };
  },
  

  computed: {
    usersData() {
      const a = JSON.parse(
        JSON.stringify(this.$store.state.profile.usersData)
      );
      return a;
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
    usersData() {
      const userData = this.usersData.find((data) => {
        return data.uid === this.$router.currentRoute.params.id;
      });
      if (userData === null || undefined) {
        return;
      } else {
        console.log(userData);
        this.headerImgUrl = userData.headerImg;
        this.mainImgUrl = userData.mainImg;
        this.nickname = userData.nickname;
        this.selfIntroduction = userData.selfIntroduction;
      }
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
    headerImgChangeOrDelete(e) {
      if (this.headerImgUrl === null) {
        return;
      } else {
        this.$refs.header.openMenu(e);
      }
      console.log("foo");
    },
    mainImgChangeOrDelete(e) {
      if (this.mainImgUrl === null) {
        return;
      } else {
        this.$refs.main.openMenu(e);
      }
      console.log("hoo");
    },
    saveProfile() {
      this.$store.dispatch("profile/saveProfile", {
        headerImgUrl: this.headerImgUrl,
        mainImgUrl: this.mainImgUrl,
        nickname: this.nickname,
        selfIntroduction: this.selfIntroduction,
        id: this.$router.currentRoute.params.id,
      });
      this.dialog = false;
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
    & #innerImg {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background-size: cover;
    }
  }
}
::v-deep .v-application--wrap {
  min-height: 0;
}
</style>
