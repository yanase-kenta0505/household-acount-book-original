<template>
  <v-app>
    <v-dialog v-model="dialog" width="800px">
      <v-card width="100%" height="500px">
        <cropper
          ref="cropper"
          stencil-component="circle-stencil"
          :src="beforeCropMainImgUrl"
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
      // url: "",
    };
  },
  computed: {
    openMainCropperDialog() {
      const a = JSON.parse(
        JSON.stringify(this.$store.state.profile.openMainCropperDialog)
      );
      return a;
    },
    mainImgFileName() {
      const a = JSON.parse(
        JSON.stringify(this.$store.state.profile.mainImgFileName)
      );
      return a;
    },
    beforeCropMainImgUrl() {
      const a = JSON.parse(
        JSON.stringify(this.$store.state.profile.beforeCropMainImgUrl)
      );
      return a;
    },
  },
  watch: {
    openMainCropperDialog() {
      this.dialog = this.openMainCropperDialog;
    },
   
  },
  methods: {
    crop() {
      const { coordinates, canvas } = this.$refs.cropper.getResult();
      let croppedMainImgUrl = canvas.toDataURL();
      this.$store.dispatch("profile/registerMainImg", {
        croppedMainImgUrl: croppedMainImgUrl,
        mainImgFileName: this.mainImgFileName,
        id: this.$router.currentRoute.params.id,
      });
      this.$store.dispatch("profile/openMainCropperDialog");
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
