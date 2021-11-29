<template>
  <v-app>
    <v-dialog v-model="dialog" width="800px">
      <v-card width="100%" height="500px">
        <!-- <v-img :src="url" width="100%" height="100%"></v-img> -->
        <cropper
          :src="url"
          @change="change"
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
            width: 280,
            height: 50,
          }"
        />
      </v-card>
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
      img: "https://images.pexels.com/photos/4323307/pexels-photo-4323307.jpeg",
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
    change({ coordinates, canvas }) {
      console.log(coordinates, canvas);
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
