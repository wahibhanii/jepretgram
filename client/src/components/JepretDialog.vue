<template> 
<v-dialog v-model="dialog" persistent max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">Share a Jepret</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
              <v-flex elevation-1>
                <input type="file" ref="jepretImage" class="hide" accept="image/*" name="image" @change="uploadHandler">
              </v-flex>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Caption" v-model="uploadCaption"></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="closeDialog">Close</v-btn>
          <v-btn color="blue darken-1" flat @click.native="sharePost">Share!</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
import Comment from './Comment'
  export default {
    data () {
      return {
        uploadFile: null,
        uploadCaption: null
      }
    },
    methods: {
      closeDialog () {
        this.$store.state.jepretDialog = false
      },
      uploadHandler () {
        this.uploadFile = this.$refs.jepretImage.files[0]
      },
      sharePost () {
        const formData = new FormData()
        formData.append('file', this.uploadFile)
        formData.append('caption', this.uploadCaption)
        this.$axios
          .post('/posts', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              'token': localStorage.getItem('token')
            }
          })
          .then(response =>{
            this.$store.commit('getTimeline')
            this.uploadCaption = null;
            this.updated = null;
            this.$store.state.jepretDialog = false
            alert('Shared...!')
          })
          .catch(err => console.log(`Fail: ${err}`))
      }
    },
    computed:{
      dialog(){
        return this.$store.state.jepretDialog
      }
    },
    components: {
      Comment
    }
  }
</script>