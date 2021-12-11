<template>
  <v-app>
    <v-file-input
      class="grey lighten-2 d-flex justify-center align-center"
      style="width: 50px; height: 50px"
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
      e.stopPropagation();
    },
    setImage(e) {
      let file = e;
      let strage = firebase.storage().ref();
      this.$store.dispatch("profile/openCropperDialog");
      strage
        .child(`header/${file.name}`)
        .put(file)
        .then((snapshot) => {
          snapshot.ref.getDownloadURL().then((url) => {
            console.log(url);
            this.$store.dispatch("profile/setHeaderImage", {
              url: url,
              name: file.name,
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
