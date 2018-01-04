<template>
  <v-app>
    <v-tabs grow  v-model="active" >
      <v-tabs-bar class="pink" dark>
        <v-tabs-item
          href="#posts"
          ripple
        >
          Posts 
        </v-tabs-item>
         <v-tabs-item
          href="#users"
          ripple
        >
          Users 
        </v-tabs-item>
        <v-tabs-slider color="yellow"></v-tabs-slider>
      </v-tabs-bar>
      <v-tabs-items class="exploretab" >
        <v-tabs-content
          id="posts"
          class="scrollable"
        >
        <v-container class="">
          <v-layout row justify-center >
            <div class="scrollable" >
                <explore-posts></explore-posts>
            </div>
          </v-layout>
        </v-container>
        </v-tabs-content>
        <v-tabs-content
          id="users"
        >
          <v-card flat class="scrollable">

            <explore-users></explore-users>
          </v-card>
        </v-tabs-content>
      </v-tabs-items>
    </v-tabs>
  </v-app>
</template>

<script>
import ExplorePosts from './ExplorePosts'
import ExploreUsers from './ExploreUsers'
  export default {
    data () {
      return {
        active: null,
        }
    },
    components:{
      ExplorePosts, ExploreUsers
    },
    methods: {
      next () {
        this.active = this.tabs[(this.tabs.indexOf(this.active) + 1) % this.tabs.length]
      }
    },
    created () {
      this.$store.commit('getAllPosts');
      this.$store.commit('getAllUsers');
      this.$store.commit('getMyProfile');
    },
    updated () {
      this.$store.commit('getAllPosts');
      this.$store.commit('getAllUsers');
      this.$store.commit('getMyProfile');
    }
  }
</script>

<style>
.exploretab{
  position: fixed;
  height : 79%;
  width: 100%;
  margin-bottom : 56px;
}

.scrollable{
  height: 100%;
  width: 100%;
  overflow: scroll;
}
</style>