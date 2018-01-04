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
      console.log ('redirection')
      if (this.$router.currentRoute.name === 'Login' || this.$router.currentRoute.name === 'Signup'){
        if (this.$store.state.isLoggedIn) {
          this.$router.replace('/')
        }
      } else {
        console.log('selain signup login',this.$store.state.isLoggedIn )
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
    // console.log(this.$store.state.currentPage)
    // console.log(this.$router.currentRoute)
    // this.$router.replace({path: this.$store.state.currentPage});
    // if (this.$router.currentRoute.name === 'Home'){
    //   if (!this.$store.state.isLoggedIn) {
    //     this.$router.replace('/signup')
    //   }
    // }
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
