<template>
  <v-app>
    <v-card>

      <v-list v-for="user in allUsers" :key="user._id">
        <user-tile :user="user"></user-tile>
      </v-list>
    </v-card>
  </v-app>
</template>

<script>
  import UserTile from './UserTile'
  import {mapGetters} from 'vuex'
  export default {
    data () {
      return {
      }
    },
    components: {
      UserTile
    },
    computed: 
      mapGetters([
        'allUsers'
      ])
    ,
    created () {
      // this.$store.commit('getTimeline')
    }
  }
</script>

