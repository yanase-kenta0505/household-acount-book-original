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
      // coordinates: {
      //   width: 0,
      //   height: 0,
      //   left: 0,
      //   top: 0,
      // // },
      // croppedImage: null,
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
      if (this.headerImg.length === 0) {
        return;
      } else {
        console.log(this.headerImg);
        this.url = this.headerImg[0].url;
        console.log(this.url);
      }
    },
    openCropperDialog() {
      this.dialog = this.openCropperDialog;
    },
  },
  methods: {
    // change({ coordinates, canvas }) {
    //   console.log(coordinates, canvas);
    // },
    crop() {
      const { coordinates, canvas } = this.$refs.cropper.getResult();
      // this.coordinates = coordinates;
      // You able to do different manipulations at a canvas
      // but there we just get a cropped image, that can be used
      // as src for <img/> to preview result
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
