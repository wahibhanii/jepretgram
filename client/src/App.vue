<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
import axios from 'axios'
import store from './vuex/index'

export default {
  name: 'app',
  store,
  data () {
    return {

    }
  },
  methods: {
    redirection () {
      if (this.$router.currentRoute.name === 'Login' || this.$router.currentRoute.name === 'Signup'){
        if (this.$store.state.isLoggedIn) {
          this.$router.replace('/')
        }
      } else {
        if (!this.$store.state.isLoggedIn) {
          this.$router.replace('/signup')
        }
      }
    }
  },
  created () {
    this.$store.commit('setLoginStatus');
    this.$store.commit('setInitialPage');
    this.redirection();
    this.$store.commit('getTimeline')
    this.$store.commit('getAllPosts');
    this.$store.commit('getAllUsers');
    this.$store.commit('getMyProfile');
  },
  updated () {
    this.$store.commit('setLoginStatus');
    this.redirection();
    this.$store.commit('getTimeline')
  }

}
</script>

<style>

</style>
