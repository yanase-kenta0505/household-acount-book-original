<template>
  <v-app>
    <v-dialog v-model="dialog" width="800px">
      <v-card width="100%" height="500px">
        <!-- <v-img :src="url" width="100%" height="100%"></v-img> -->
        <cropper
          ref="cropper"
          stencil-component="circle-stencil"
          :src="url"
          id="cropper"
          :stencil-props="{
            handlers: {},
            movable: false,
            scalable: false,
          }"
          :resize-image="{
            adjustStencil: false,
          }"
          image-restriction="stencil"
          :stencil-size="{
            width: 60,
            height: 60,
          }"
        />
      </v-card>
      <v-btn @click="crop">CROP</v-btn>
    </v-dialog>
  </v-app>
</template>
<script>
import { Cropper } from "vue-advanced-cropper";
import "vue-advanced-cropper/dist/style.css";
export default {
  components: {
    Cropper,
  },
  data() {
    return {
      dialog: false,
      url: "",
    };
  },
  computed: {
    // mainImg() {
    //   const a = JSON.parse(
    //     JSON.stringify(this.$store.getters["profile/mainImg"])
    //   );
    //   return a;
    // },
    openMainCropperDialog() {
      const a = JSON.parse(
        JSON.stringify(this.$store.getters["profile/openMainCropperDialog"])
      );
      return a;
    },
  },
  watch: {
    // mainImg() {
    //   if (this.mainImg === null) {
    //     return;
    //   } else {
    //     this.url = this.mainImg;
    //   }
    // },
    openMainCropperDialog() {
      this.dialog = this.openMainCropperDialog;
      let mainImageItems = JSON.parse(localStorage.getItem("mainImageItems"));
      if (mainImageItems === null || undefined) {
        return;
      } else {
        this.url = mainImageItems.url;
      }
    },
  },
  methods: {
    crop() {
      const { coordinates, canvas } = this.$refs.cropper.getResult();

      let croppedMainImgUrl = canvas.toDataURL();

      this.$store.dispatch("profile/displayMainImg", croppedMainImgUrl);
      this.dialog = false;
    },
  },
};
</script>

<style lang="scss" scoped>
#cropper {
  width: 100%;
  height: 100%;
}
</style>
