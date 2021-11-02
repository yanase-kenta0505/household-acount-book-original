<template>
  <v-app>
    <v-list>
      <v-list-group :value="true" color="black">
        <template v-slot:activator>
          <v-list-item-icon>
            <v-icon>mdi-send</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>投稿</v-list-item-title>
          </v-list-item-content>
        </template>
        <create-post-message />
        <post-list />
      </v-list-group>
    </v-list>
  </v-app>
</template>

<script>
import CreatePostMessage from "~/components/createPostMessage.vue";
import PostList from "~/components/postList.vue";
export default {
  components: {
    CreatePostMessage,
    PostList,
  },
  data() {
    return {
      dialog: false,
    };
  },
};
</script>

<style lang="scss" scoped>
::v-deep .mdi-menu-down::before {
  content: none !important;
}

.v-list-item__title {
  flex: initial;
}

.v-application .primary--text {
  color: grey;
}
.v-list .v-list-item--active {
  color: grey;
}
</style>
