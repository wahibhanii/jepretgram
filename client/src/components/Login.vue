<template>
  <v-app>
      <v-container grid-list-xs center class="mt-5" >
        <v-layout row justify-center>
          <h1 class="display-2">Log-in to</h1>
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
            </v-form>
            <v-layout row justify-center>
              <p class="subheading red--text">{{failMessage}}</p>
            </v-layout>
            <v-layout row justify-center>
              <v-btn @click="login"> Log in</v-btn>
            </v-layout>
          </v-flex>
        </v-layout>
        <v-layout row justify-center pa-4>
          <p>Doesn't have account yet? </p><a @click="gotoSignup" class="pl-2">Sign Up</a>
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
        email: null,
        emailRules: [
          (v) => !!v || 'E-mail is required',
          // (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
        ],
        password: null,
        passwordRules: [
          (v) => !!v || 'Password is required',
          // (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
        ],
        failMessage: null,
      }
    },
    components : {
      Foots
    },
    methods: {
      login () {
        console.log('Loggin in', this.email, this.password)
        this.$axios({
          method: 'post',
          url: `/users/login`,
          data: {
            email: this.email,
            password: this.password
          }
        })
        .then(loginResponse => {
          if (loginResponse.status === 200) {
            this.email = null
            this.password = null
            this.failMessage = null
            localStorage.setItem('token', loginResponse.data.token)
            this.$store.state.isLoggedIn = true
            this.$router.push('/')
          } else if (loginResponse.status === 204) {
            this.failMessage = 'User not Found'
            this.email = null
            this.password = null
          } else if (loginResponse.status === 202) {
            this.failMessage = 'Wrong Password'
            this.password = null
          }
        })
        .catch(err => {
          console.log(err)
        })
      },

      gotoSignup(){
        this.$router.push('/signup')
      }
    }
  }

</script>