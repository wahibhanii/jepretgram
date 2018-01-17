<template>
  <v-list-tile>
    <v-list-tile-content>
      <v-list-tile-title > <b>{{user.userName}}</b></v-list-tile-title>
    </v-list-tile-content>
    <v-spacer/>
    <v-list-tile-action v-if="!isFollowing && !isMe" >
      <v-btn outline small color="pink" @click="followUnfollow"> Follow </v-btn>
    </v-list-tile-action>
    <v-list-tile-action v-if="isFollowing && !isMe">
      <v-btn small color="pink" dark @click="followUnfollow"> Unfollow </v-btn>
    </v-list-tile-action>
    <v-list-tile-action v-if="isMe" class="pr-2">
      This is you
    </v-list-tile-action>
  </v-list-tile>
</template>

<script>

import {mapGetters} from 'vuex'

  export default {
    data () {
      return {
      }
    },
    props: ['user'],
    methods: {
      followUnfollow() {
        let targetUserId = this.user._id
        this.$axios({
          method: 'put',
          url: `/users/followunfollow/${targetUserId}`,
          headers: {
            token: localStorage.token
          }
        })
        .then(response =>{
          this.$store.commit('getTimeline')
          this.$store.commit('getAllUsers')
          this.$store.commit('getMyProfile');
        })
        .catch(err => console.log(`Fail: ${err}`))
      }
    },
    computed: 
      mapGetters([
        'myProfile'
      ]),
    computed: {
      isFollowing (){
        let isIdMatch = this.$store.state.myProfile.following.find(user => {
          return user._id === this.user._id
        })
        return isIdMatch !== undefined

      },
      isMe () {
        return this.user._id == this.$store.state.myProfile._id
      }
    }
  }
</script>
