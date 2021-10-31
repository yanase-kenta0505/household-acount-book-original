<template>
  <v-app>
    <p @click="moveMyPage" class="mx-auto mt-10 text-h6">マイページへ</p>
  </v-app>
</template>

<script>
export default {
  methods: {
    moveMyPage() {
      this.$router.push("/myPage");
    },
  },
};
</script>

<style lang="scss" scoped>
p {
  cursor: pointer;
}
</style>
