<template>
  <v-app>
    <div
      id="container"
      class="d-flex flex-column align-center justify-center grey white--text"
    >
      <p class="text-h4">MONEY TEACHER</p>
      <v-btn width="30px" @click="changeExpand" class="mx-auto">next</v-btn>
    </div>
  </v-app>
</template>

<script>
export default {
  data() {
    return {};
  },

  methods: {
    changeExpand() {
      this.$router.push("/initialMyPage");
    },
  },
};
</script>

<style lang="scss" scoped>
#container {
  width: 100%;
  height: 100%;
  position: relative;
}
p {
  cursor: pointer;
}

.v-card--reveal {
  align-items: center;
  top: 0;
  justify-content: center;

  position: absolute;
}
</style>
