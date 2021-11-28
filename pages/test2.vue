<template>
  <v-app>
    <div>
      <cropper
        :src="img"
        @change="change"
        id="cropper"
        class="mt-10"
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
    </div>
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
      img: "https://images.pexels.com/photos/4323307/pexels-photo-4323307.jpeg",
    };
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
  width: 40%;
}
</style>
