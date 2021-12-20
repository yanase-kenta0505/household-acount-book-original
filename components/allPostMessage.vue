<template>
  <v-app>
    <v-card
      id="postBox"
      width="700px"
      height="600px"
      class="transparent mx-auto pt-1"
      outlined
    >
      <v-card
        width="80%"
        height="auto"
        class="mx-auto mt-10"
        v-for="(message,index) in allPostMessages"
        :key="message.id"
      >
        <v-card-title>
          <v-avatar
            size="50"
            color="grey"
            :style="{ backgroundImage: `url(${message.img})` }"
            @click="openDialog(index)"
          ></v-avatar>
          <span class="text-subtitle-1 ml-5"></span>
        </v-card-title>
        <v-card-text class="mb-5"> {{ message.message }}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-icon @click="dialog = false" class="mr-10 mb-5" color="pink"
            >mdi-chat-outline
          </v-icon>
          <v-icon @click="dialog = false" class="mr-10 mb-5" color="pink"
            >mdi-hand-heart
          </v-icon>
        </v-card-actions>
      </v-card>
      <confirm-others-data ref="child" :index="index"/>
    </v-card>
  </v-app>
</template>

<script>
import ConfirmOthersData from '~/components/confirmOthersData.vue'
export default {
  components:{
    ConfirmOthersData
  },
  data() {
    return {
      index: null,
    };
  },
  computed: {
    allPostMessages() {
      const a = JSON.parse(
        JSON.stringify(this.$store.state.postDB.postMessages)
      );
      return a;
    },
    myPostMessages() {
      const a = JSON.parse(
        JSON.stringify(this.$store.state.postDB.postMessages)
      );

      let myPostMessages = [];
      a.forEach((message) => {
        if (message.uid === this.$router.currentRoute.params.id) {
          myPostMessages.push(message);
        }
      });
      return myPostMessages;
    },
  },
  methods:{
    openDialog(index){
       this.$refs.child.openDialog()
       this.index = index
    }
  }
};
</script>

<style lang="scss" scoped>
#postBox {
  overflow: scroll;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    display: none;
  }
}

::v-deep .v-avatar {
  background-size: cover;
}
</style>
