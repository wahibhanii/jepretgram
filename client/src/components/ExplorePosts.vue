<template>
  <v-app>
    <v-layout  class="scrollable" row justify-center v-for="post in allPosts" :key="post._id" mb-1>
        <post :post="post"></post>
      </v-layout>
  </v-app>
</template>

<script>
  import Post from './Post'
import {mapGetters} from 'vuex'
  export default {
    data () {
      return {
      }
    },
    components: {
      Post
    },
    computed: 
      mapGetters([
        'allPosts'
      ])
    ,
    created () {
      // this.$store.commit('getTimeline')
    }
  }
</script>



