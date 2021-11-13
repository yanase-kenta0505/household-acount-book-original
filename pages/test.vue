<template>
  <v-app>
    <v-card width="500px" height="500px" class="mx-auto"> 
      <v-text-field v-model="text" class="mt-10"></v-text-field>
      <pre>{{ text }}</pre>
      <v-btn @click="add">add</v-btn>
    </v-card>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      text: "",
    };
  },
  methods: {
    add() {
      this.$store.dispatch("db/add", this.text);
    },
  },
};
</script>
