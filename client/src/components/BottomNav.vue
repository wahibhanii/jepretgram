<template>
    <v-bottom-nav  :value="true" :active.sync="e1" color="white">
      <v-btn flat color="pink" value="timeline" @click="gotoTimeline">
        <span>home</span>
        <v-icon>home</v-icon>
      </v-btn>
      <v-btn flat color="pink" value="explore" @click="gotoExplore">
        <span>explore</span>
        <v-icon>search</v-icon>
      </v-btn>
      <v-btn flat color="pink" :value="e1" @click="jepret">
        <span>jepret!</span>
        <v-icon>camera</v-icon>
      </v-btn>
      <v-btn flat color="pink" value="nearby" @click="gotoMyProfile">
        <span>my profile</span>
        <v-icon>person</v-icon>
      </v-btn>
      <jepret-dialog></jepret-dialog>
    </v-bottom-nav>
</template>

<script>
  import JepretDialog from './JepretDialog'
  export default {
    data () {
      return {
        e1: 'timeline',
        jepretDialog: false,
      }
    },
    components: {
      JepretDialog
    },
    methods: {
      gotoTimeline () {
        this.$router.push('/timeline')
      },
      gotoExplore () {
        this.$router.push('/explore')
      },
      gotoMyProfile () {
        this.$router.push('/myProfile')
      },
      jepret () {
        this.$store.state.jepretDialog = true
      }
     
    },
    updated () {
      this.$store.state.activeNav = this.e1
    }
  }
</script>