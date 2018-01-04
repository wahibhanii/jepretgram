<template>
  <v-app>
  <div class="view">
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