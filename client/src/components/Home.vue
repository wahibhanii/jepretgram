<template>
  <v-app>
  <div class="view">
    <top-nav></top-nav>
    <router-view ></router-view>
  </div>
    <bottom-nav></bottom-nav>
  </v-app>
</template>

<script>
  import BottomNav from './BottomNav'
  import TopNav from './TopNav'
  export default {
    data () {
      return {
      }
    },
    components: {
      BottomNav, TopNav
    },
    created () {
      this.$router.replace('/timeline')
    }
  }
</script>

<style>
.view{
  margin-top: 60px;
  margin-bottom : 56px
}
</style>