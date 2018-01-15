<template>
  <v-container>
    <v-layout>
      <span class="display-2">{{this.$store.state.myProfile.userName}}</span>
    </v-layout>
    <v-layout>
      <span class="headline"> E-mail: {{this.$store.state.myProfile.email}}</span>
    </v-layout>
    <h1 class="title pa-4">Following</h1>
    <v-list v-for="(following,i) in this.$store.state.myProfile.following" :key="i" >
        <user-tile :user="following"></user-tile>
    </v-list>
    <h1 class="title pa-4">Followers: </h1>
    <v-list v-for="(follower,i) in this.$store.state.myProfile.followers" :key="i" >
      <user-tile :user="follower"></user-tile>
    </v-list>

  </v-container>
</template>

<script>
import UserTile from './UserTile'
  export default {
    data () {
      return {
      }
    },
    components:{
      UserTile
    },
    created () {
      this.$store.commit('getMyProfile')
    }
  }
</script>