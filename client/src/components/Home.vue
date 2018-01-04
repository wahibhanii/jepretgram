<template>
  <v-app>
  <top-nav></top-nav>
  <div class="view">
    <div class="scrollable">
      <router-view ></router-view>
    </div>
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
  padding-top: 48px;
  padding-bottom : 56px;
  height: 100vh;
  width: 100vw;
  position: fixed;
}

.scrollable{
  height: 100%;
  width: 100%;
  overflow: scroll;
}
</style>