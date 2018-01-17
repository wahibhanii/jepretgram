<template>
  <v-flex xs12 sm10>
    <v-card>
      <v-layout class="cardmedia" justify-center>
        <img
        :src="post.urlToImage"
        class="cardimage"
      >
      </v-layout>
       <v-card-title primary-title>
            <span v-if="!isEditCaption"><b class="pr-2">{{post.owner.userName}}</b>"{{post.caption}}"</span>
            <v-text-field v-if="isEditCaption" label="new caption" v-model="newCaption" @keyup.enter="submitCaption" :value="post.caption"></v-text-field>
        </v-card-title>
      <v-card-actions class="pl-4 pr-4">
        
          <v-btn flat icon @click="likeUnline" :color="isLiked"><v-icon>thumb_up</v-icon></v-btn>
          
        
        <v-tooltip right >
          <span slot="activator">{{post.likers.length}} Likes</span>
          <span v-if="post.likers.length>0" v-for="liker in post.likers" :key="liker._id"><span>{{liker.userName}}, </span></span>
        </v-tooltip>
        <v-btn flat icon @click="editCaption" v-if="isUserAuth"><v-icon>edit</v-icon></v-btn>
        <v-spacer></v-spacer>
        <a @click="show = !show" class="pink--text"> 
          {{ show ? 'hide' : 'more' }}
        </a>
      </v-card-actions>
      <v-slide-y-transition>
        <v-card-text v-show="show">
          <span class="grey--text pl-2">comments</span>
          <span v-for="comment in post.comments" :key="comment._id">
            <comment :data="comment" :postId="post._id"></comment>
          </span>
          <v-layout row>
            <v-text-field label="add comment" v-model="newComment" @keyup.enter="addComment"></v-text-field>
          </v-layout>
          <v-layout row justify-center v-if="isUserAuth">
            <div>
            <v-btn flat color="red" @click="deletePost"><v-icon>delete</v-icon>Delete post</v-btn>
            </div>
          </v-layout>
        </v-card-text>
      </v-slide-y-transition>
    </v-card>
  </v-flex>
</template>

<script>
import Comment from './Comment'
import jwt from 'jsonwebtoken'
  export default {
    data () {
      return {
        show: false,
        newComment: null,
        isEditCaption: false,
        newCaption : null
      }
    },
    props: ['post'],
    components: {
      Comment
    },
    methods : {
      addComment () {
        this.$axios({
          method: 'put',
          url: `/posts/${this.post._id}/comment`,
          data: {
            comment: this.newComment
          },
          headers: {
            token: localStorage.token
          }
        })
        .then(response =>{
          this.$store.commit('getTimeline');
          this.$store.commit('getAllPosts');
          this.newComment = null;
        })
        .catch(err => console.log(`Fail: ${err}`))

      },
      editCaption () {
        this.isEditCaption = !this.isEditCaption
      },
      submitCaption () {
        this.$axios({
          method: 'put',
          url: `/posts/${this.post._id}/editcaption`,
          data: {
            caption: this.newCaption
          },
          headers: {
            token: localStorage.token
          }
        })
        .then(response =>{
          this.$store.commit('getTimeline')
          this.newCaption = this.post.caption;
          this.isEditCaption = !this.isEditCaption
          alert('Caption Updated!')
        })
        .catch(err => console.log(`Fail: ${err}`))
      },
      deletePost () {
        this.$axios({
          method: 'delete',
          url: `/posts/${this.post._id}`,
          headers: {
            token: localStorage.token
          }
        })
        .then(response =>{
          this.$store.commit('getTimeline')
          this.$store.commit('getAllPosts');
          alert('Post Deleted!')
        })
        .catch(err => console.log(`Fail: ${err}`))
      },
      likeUnline () {
        this.$axios({
          method: 'put',
          url: `/posts/${this.post._id}/likeunlike`,
          headers: {
            token: localStorage.token
          }
        })
        .then(response =>{
          this.$store.commit('getTimeline')
          this.$store.commit('getAllPosts');
        })
        .catch(err => console.log(`Fail: ${err}`))
      }
    },
    computed :{
      isUserAuth () {
        let userId = jwt.decode(localStorage.token)._id
        return (userId === this.post.owner._id)
      },
      isLiked () {
        let userId = jwt.decode(localStorage.token)._id
        if (this.post.likers.map(x => x._id).indexOf(userId) !== -1){
          return 'pink'
        } else {
          return 'grey'
        }
      }
    },
    created () {
      this.newCaption = this.post.caption
    }
  }
</script>

<style scoped>
.cardmedia {
  height: 400px;
}
img{
  width:100%;
  height:100%;
  object-fit: contain;
}
</style>
