<template>
  <v-app>
    <v-dialog v-model="dialog" width="800px">
      <v-card width="100%" height="500px">
        <!-- <v-img :src="url" width="100%" height="100%"></v-img> -->
        <cropper
          ref="cropper"
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
            width: 500,
            height: 150,
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
    headerImg() {
      const a = JSON.parse(
        JSON.stringify(this.$store.getters["profile/headerImg"])
      );
      return a;
    },
    openCropperDialog() {
      const a = JSON.parse(
        JSON.stringify(this.$store.getters["profile/openCropperDialog"])
      );
      return a;
    },
  },
  watch: {
    headerImg() {
      if (this.headerImg === null) {
        return;
      } else {
        this.url = this.headerImg;
      }
    },
    openCropperDialog() {
      this.dialog = this.openCropperDialog;
    },
  },
  methods: {
    crop() {
      const { coordinates, canvas } = this.$refs.cropper.getResult();

      let croppedHeaderImgUrl = canvas.toDataURL();

      this.$store.dispatch("profile/displayHeaderImg", croppedHeaderImgUrl);
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
