<template> 
<v-layout row @mouseover="show = true" @mouseleave="show=false">
  <div>
    <span><b>{{data.owner.userName}}</b></span>
    <span>{{data.comment}}</span>
  </div>
    <a v-if="show && isUserAuth" class="red--text pl-3" @click="deleteComment">delete</a>
</v-layout>
</template>

<script>
import Comment from './Comment'
import jwt from 'jsonwebtoken'
  export default {
    data () {
      return {
        show: false,
      }
    },
    props: ['data', 'postId'],
    components: {
      Comment
    },
    methods: {
      deleteComment () {
        this.$axios({
          method: 'put',
          url: `/posts/${this.postId}/uncomment`,
          data: {
            commentId: this.data._id
          },
          headers: {
            token: localStorage.token
          }
        })
        .then(response =>{
          this.$store.commit('getTimeline');
          this.newComment = null;
        })
      }
    },
    computed :{
      isUserAuth () {
        let userId = jwt.decode(localStorage.token)._id
        return (userId === this.data.owner._id)
      }
    }
  }
</script>