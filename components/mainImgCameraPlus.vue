<template>
  <v-app>
    <v-file-input
      class="grey lighten-2 d-flex justify-center align-center"
      style="width: 30px; height: 30px"
      hide-input
      prepend-icon="mdi-camera-plus"
      @change="setImage"
      @click="stop"
    />
  </v-app>
</template>

<script>
import firebase from "~/plugins/firebase";
export default {
  data() {
    return {};
  },

  methods: {
    stop(e) {
      e.target.value = "";
      e.stopPropagation();
    },
    setImage(e) {
      // console.log(e);
      let file = e;
      let strage = firebase.storage().ref();
      this.$store.dispatch("profile/openMainCropperDialog");
      strage
        .child(`main/${file.name}`)
        .put(file)
        .then((snapshot) => {
          snapshot.ref.getDownloadURL().then((url) => {
            this.$store.dispatch("profile/setMainImage", {
              url: url,
              fileName: file.name,
            });
          });
        });
    },
  },
};
</script>
<style lang="scss" scoped>
::v-deep .mdi-camera-plus::before {
  font-size: 30px;
}
::v-deep .v-input {
  flex: initial;
}
::v-deep .v-text-field {
  padding: 0 !important;
  margin: 0 !important;
}
</style>
