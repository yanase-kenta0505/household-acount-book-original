<template>
  <v-app>
    <v-dialog v-model="dialog" width="800px">
      <v-card width="100%" height="500px" class="d-flex justify-center align-center">
        <cropper
          v-if="beforeCropHeaderImgUrl !== null"
          ref="cropper"
          :src="beforeCropHeaderImgUrl"
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
            width: 500,
            height: 150,
          }"
        />

        <v-progress-circular
          indeterminate
          color="primary"
          v-if="beforeCropHeaderImgUrl === null"
        ></v-progress-circular>
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
    openCropperDialog() {
      const a = JSON.parse(
        JSON.stringify(this.$store.state.profile.openCropperDialog)
      );
      return a;
    },
    headerImgFileName() {
      const a = JSON.parse(
        JSON.stringify(this.$store.state.profile.headerImgFileName)
      );
      return a;
    },
    beforeCropHeaderImgUrl() {
      const a = JSON.parse(
        JSON.stringify(this.$store.state.profile.beforeCropHeaderImgUrl)
      );
      return a;
    },
  },
  watch: {
    openCropperDialog() {
      this.dialog = this.openCropperDialog;
    },
  },
  methods: {
    crop() {
      const { coordinates, canvas } = this.$refs.cropper.getResult();
      let croppedHeaderImgUrl = canvas.toDataURL();
      this.$store.dispatch("profile/registerHeaderImg", {
        croppedHeaderImgUrl: croppedHeaderImgUrl,
        headerImgFileName: this.headerImgFileName,
        id: this.$router.currentRoute.params.id,
      });
      this.$store.dispatch("profile/openCropperDialog");
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
