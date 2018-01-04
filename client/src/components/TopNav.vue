<template>
    <v-toolbar color="white" dense fixed>
        <v-dialog >
         <v-btn flat icon slot="activator" color="pink" light>
            <v-icon>info_outline</v-icon>
          </v-btn>
          <v-card>
            <v-card-title class="headline">About Jepretgram</v-card-title>
            <v-card-text>Portofolio project by Haniiful Wahib <br/> 2018 - <a href="https://github.com/wahibhanii/jepretgram" target="_blank" >GitHub</a></v-card-text>
          </v-card>
        </v-dialog>
        <v-spacer></v-spacer>
        <v-toolbar-title class="title" > <v-icon color="pink">camera</v-icon>Jepretgram</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-menu left class="pr-4">
          <v-btn flat icon slot="activator" color="pink" light>
            <v-icon>more_vert</v-icon>
          </v-btn>
          <v-list>
            <v-list-tile>
              <v-list-tile-title>Hello, {{userName}}</v-list-tile-title>
            </v-list-tile>
            <v-divider/>
            <v-list-tile  >
                <v-btn color="pink" outline @click="logout">
                  <v-icon >exit_to_app</v-icon>
                  Logout
                </v-btn>
            </v-list-tile>
          </v-list>
        </v-menu>
      </v-toolbar>
</template>

<script>
import jwt from 'jsonwebtoken'
  export default {
    data () {
      return {
        dialog: false
      }
    },
    methods: {
      logout () {
        localStorage.removeItem('token');
        this.$router.push('/signup')
      }
    },
    computed: {
      userName () {
        return jwt.decode(localStorage.token).userName
      }
    }
  }
</script>
<style>
.title{

}
</style>