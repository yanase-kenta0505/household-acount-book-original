<template>
  <v-app>
    <!-- <div>
      <label class="postImage-appendBtn">
        <input type="file" data-label="画像の添付" @change="setImage" />
      </label>
      <img :src="url" alt="" />
    </div> -->
    <v-file-input
      class="grey lighten-2 d-flex justify-center align-center"
      style="width: 50px; height: 50px"
      hide-input
      prepend-icon="mdi-camera-plus"
      @change="setImage"
    />
  </v-app>
</template>

<script>
import firebase from "~/plugins/firebase";
export default {
  data() {
    return {
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
  },
  watch: {
    headerImg() {
      console.log(this.headerImg);
      if (this.headerImg.length === 0) {
        return;
      } else {
        let top = firebase.storage().ref();
        console.log(top);
        top.listAll().then((res) => {
          console.log(res);
          res.prefixes.forEach((prefixe) => {
            console.log(prefixe.name);
          });
          res.items.forEach((item) => {
            console.log(item.name);
          });
        });

        let child = top.child("test/outgoing.png");
        console.log(child);
        child.getDownloadURL().then((url) => {
          console.log(url);
          this.url = url;
        });
      }
    },
  },
  mounted() {
    this.$store.dispatch(
      "profile/profileSnapshot",
      localStorage.getItem("uid")
    );
  },
  methods: {
    setImage(e) {
      //   let file = e.target.files[0];
      //   console.log(file);
      console.log(e);
      let file = e;
      let strage = firebase.storage().ref();
      strage
        .child(`test/${file.name}`)
        .put(file)
        .then((snapshot) => {
          snapshot.ref.getDownloadURL().then((url) => {
            console.log(url);
            this.$store.dispatch("profile/setImage", {
              url: url,
              uid: localStorage.getItem("uid"),
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
