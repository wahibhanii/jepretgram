<template>
  <v-app>
      <v-container grid-list-xs center class="mt-5" >
        <v-layout row justify-center>
          <h1 class="display-2">Join</h1>
        </v-layout>
         <v-layout row justify-center pb-3>
          <h1 class="display-2">Jepretgram</h1>
        </v-layout>
        <v-layout row justify-center pt-3>
          <v-flex xs10
            sm6 
            md6 
            elevation-3 pa-3
            >
            <v-form v-model="valid" >
              <v-flex>
              <v-text-field
                label="User Name"
                v-model="userName"
                :rules="nameRules"
                :counter="10"
                required
              ></v-text-field>
              </v-flex>
              <v-text-field
                label="E-mail"
                v-model="email"
                :rules="emailRules"
                required
              ></v-text-field>
              <v-text-field 
                label="Password" 
                type="password"
                v-model="password"
                :rules="passwordRules"
                required>
              </v-text-field>
              <v-text-field 
                label="Re-enter Password" 
                type="password"
                v-model="passwordConf"
                :rules="passwordRules"
                required>
              </v-text-field>
            </v-form>
            <v-layout row justify-center>
              <p class="subheading red--text">{{failMessage}}</p>
            </v-layout>
            <v-layout row justify-center>
              <v-btn @click="signUp"> Sign Up</v-btn>
              
            </v-layout>
          </v-flex>
        </v-layout>
        <v-layout row justify-center pa-4>
          <p>Already have account? </p><a @click="gotoLogin" class="pl-2">Log in</a>
        </v-layout>
      </v-container>
      <foots></foots>
  </v-app>
</template>

<script>
import Foots from './Foots'
export default {
    data () {
      return {
        valid: false,
        userName: null,
        nameRules: [
          (v) => !!v || 'Name is required',
          (v) => v.length <= 10 || 'Name must be less than 10 characters',
          (v) => !/^$|\s+/.test(v) || 'only one word is allowed for user name'
        ],
        email: null,
        emailRules: [
          (v) => !!v || 'E-mail is required',
          (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
        ],
        password: null,
        passwordRules: [
          (v) => !!v || 'Password is required',
          // (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
        ],
        passwordConf: null,
        passwordRules: [
          (v) => !!v || 'Password Confirmation is required',
          // (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
        ],
        failMessage: null,
      }
    },
    components : {
      Foots
    },
    methods: {
      signUp () {
        if (this.valid) {
          if (this.password !== this.passwordConf){
            this.failMessage = 'Password not matched please re-enter password'
            this.passwordConf = null
          } else {
            this.$axios({
              method: 'post',
              url: `/users`,
              data: {
                email: this.email,
                password: this.password,
                userName: this.userName
              }
            })
            .then(signUpResponse => {
              console.log(signUpResponse);
              if (signUpResponse.status === 200){
                this.email = null;
                this.password = null;
                this.failMessage = null;
                this.userName = null;
                this.passwordConf = null;
                this.valid = false;
                this.$router.push('/login')
              } else if (signUpResponse.status === 202) {
                this.failMessage = signUpResponse.data.message
              } else {
                this.failMessage = signUpResponse
              }
            })
            .catch(err => {
              console.log(err);
              res.status(500).send(err);
            })
          }
        } else {
          this.failMessage = 'Validation error'
        }
      },

      gotoLogin(){
        this.$router.push('/login')
      }
    }
  }

</script>