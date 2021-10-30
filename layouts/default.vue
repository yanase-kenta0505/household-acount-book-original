<template>
  <v-app id="inspire">
    <div id="container">
      <v-system-bar app height="80px" color="#CFD8DC">
        <v-icon large class="ml-5" @click="drawer = !drawer">mdi-menu</v-icon>
        <v-spacer></v-spacer>
        <h3 class="mr-10 white--text text-bold">ログイン</h3>
      </v-system-bar>

      <v-navigation-drawer v-model="drawer" app>
        <v-sheet class="pa-4" color="#ECEFF1">
          <v-avatar class="mb-4" color="grey darken-1" size="64"></v-avatar>

          <div>非ログインユーザーです</div>
        </v-sheet>

        <v-divider></v-divider>

        <v-list>
          <v-list-item v-for="link in links" :key="link.text" link>
            <v-list-item-icon>
              <v-icon>{{ link.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title @click="errorDialog">{{
                link.text
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <!-- <v-main>
      <v-container class="py-8 px-6" fluid>
        <v-row>
          <v-col v-for="card in cards" :key="card" cols="12">
            <v-card>
              <v-subheader>{{ card }}</v-subheader>

              <v-list two-line>
                <template v-for="n in 6">
                  <v-list-item :key="n">
                    <v-list-item-avatar color="grey darken-1">
                    </v-list-item-avatar>

                    <v-list-item-content>
                      <v-list-item-title>Message {{ n }}</v-list-item-title>

                      <v-list-item-subtitle>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Nihil repellendus distinctio similique
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>

                  <v-divider
                    v-if="n !== 6"
                    :key="`divider-${n}`"
                    inset
                  ></v-divider>
                </template>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main> -->

      <v-main id="main" class="d-flex align-center justify-center " style="height:100%" >
        <v-card
          width="550px"
          height="100px"
          class="d-flex  mx-auto transparent"
          flat
        >
          <v-card-text class="text-h4 text-center white--text "
            >ログインしてください</v-card-text
          >
        </v-card>
      </v-main>
    </div>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    cards: ["Today", "Yesterday"],
    drawer: false,
    links: [
      {
        icon: "mdi-send",
        text: "投稿",
      },
      {
        icon: "mdi-account-heart-outline",
        text: "フォロー",
      },
      {
        icon: "mdi-thumb-up",
        text: "お気に入り",
      },
      {
        icon: "mdi-human-greeting-proximity",
        text: "DM",
      },
      {
        icon: "mdi-account-edit",
        text: "アカウント編集",
      },
    ],
  }),
  methods: {
    errorDialog() {
      alert("ログインしてください");
    },
  },
};
</script>

<style lang="scss" scoped>
#container {
  width: 100%;
  height: 100%;
  background-image: url("/money-manege.jpg");
  background-position: bottom center;
  background-size: cover;
  & .v-system-bar {
    background-color: rgba(165, 160, 160, 0.4) !important;
  }
  
}
</style>
