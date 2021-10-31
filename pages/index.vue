<template>
  <v-app>
    <div
      id="container"
      class="d-flex flex-column align-center justify-center grey white--text"
    >
      <p class="text-h4">MONEY TEACHER</p>
      <v-btn width="30px" @click="changeExpand" class="mx-auto">next</v-btn>
      <v-expand-transition>
        <v-card
          v-if="expand"
          height="100%"
          width="100%"
          class="
            mx-auto
            secondary
            d-flex
            transition-fast-in-fast-out
            orange
            darken-2
            v-card--reveal
          "
        ></v-card>
      </v-expand-transition>
    </div>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      expand: false,
    };
  },
  methods: {
    changeExpand() {
      this.expand = true;
      setTimeout(() => {
        this.$router.push("/myPage");
        this.expand = false;
      }, 500);
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
