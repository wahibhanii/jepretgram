<template>
  <v-app>
    <v-container class="">
      <v-layout row justify-center v-for="post in userTimelinePosts" :key="post._id" mb-1>
        <post :post="post"></post>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
import Post from './Post'
import {mapGetters} from 'vuex'
  export default {
    data () {
      return {
        timelines: null,
      }
    },
    components: {
      Post
    },
    computed: 
      mapGetters([
        'userTimelinePosts'
      ])
    ,
    created () {
      // this.$store.commit('getTimeline')
    }
  }
</script>