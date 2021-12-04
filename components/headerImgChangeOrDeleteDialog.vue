<template>
  <v-app>
    <v-menu
      v-model="showMenu"
      :position-x="x"
      :position-y="y"
      absolute
      offset-y
    >
      <v-list class="pa-0">
        <v-list-item v-for="(item, index) in items" :key="item.title">
          <v-list-item-title @click="changeOrDelete(index)">{{
            item.title
          }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app>
</template>
<script>
import firebase from "~/plugins/firebase";
export default {
  data: () => ({
    showMenu: false,
    x: 0,
    y: 0,
    items: [{ title: "画像を変更する" }, { title: "画像を削除する" }],
  }),

  methods: {
    openMenu(e) {
      e.preventDefault();
      this.showMenu = false;
      this.x = e.clientX;
      this.y = e.clientY;
      this.$nextTick(() => {
        this.showMenu = true;
      });
    },
    changeOrDelete(index) {
      if (index === 0) {
      } else {
        let strage = firebase.storage().ref();
        let headerImageItems = JSON.parse(
          localStorage.getItem("headerImageItems")
        );
        strage
          .child(`header/${headerImageItems.name}`)
          .delete()
          .then(() => {
            console.log("delete");
            this.$store.dispatch("profile/deleteHeaderImg");
            localStorage.removeItem("headerImageItems");
            this.$store.dispatch("profile/openCropperDialog");
          });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep
  .theme--light.v-list-item:not(.v-list-item--active):not(.v-list-item--disabled) {
  &:hover {
    background-color: rgb(212, 207, 207);
  }
}
</style>
