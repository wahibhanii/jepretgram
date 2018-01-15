import jwt from 'jsonwebtoken'
import axios from 'axios'
const baseURL = 'http://35.192.12.158'
const mutations = {
  // setUserData () {
  //   console.log('set user data . . . .')
  //   let userId = jwt.decode(localStorage.token)._id
  //   axios({
  //     method: 'get',
  //     url: `${baseURL}/users/${userId}`,
  //     headers: {token: localStorage.token}
  //   })
  //   .then(response => {
  //     this.state.userData = response.data.data
  //     console.log(this.state.userData)
  //   })
  //   .catch(err => {
  //     console.log(err)
  //   })
  // }
  setLoginStatus(){
    console.log('login status')
    if (localStorage.token !== undefined){
      this.state.isLoggedIn = true
    } else {
      this.state.isLoggedIn = false
    }
    
  },

  setInitialPage() {
    if(!this.state.isLoggedIn) {
      this.state.currentPage = '/signup' 
    }
  },

  getTimeline () {
    console.log('getting timeline')
    axios({
      method: 'get',
      url: `${baseURL}/posts/timeline`,
      headers: {token: localStorage.token}
    })
    .then(response => {
      this.state.timelinePosts = response.data
    })
    .catch(err => {
      console.log(err)
    })
  },

  getAllPosts () {
    console.log('getting all posts')
    axios({
      method: 'get',
      url: `${baseURL}/posts`,
      headers: {token: localStorage.token}
    })
    .then(response => {
      this.state.allPosts = response.data
    })
    .catch(err => {
      console.log(err)
    })
  },

  getAllUsers () {
    console.log('getting all Users')
    axios({
      method: 'get',
      url: `${baseURL}/users`,
      headers: {token: localStorage.token}
    })
    .then(response => {
      this.state.allUsers = response.data.data
    })
    .catch(err => {
      console.log(err)
    })
  },

  getMyProfile () {
    console.log('getting my profile')
    let userId = jwt.decode(localStorage.token)._id
    axios({
      method: 'get',
      url: `${baseURL}/users/${userId}`,
      headers: {token: localStorage.token}
    })
    .then(response => {
      this.state.myProfile = response.data.data
    })
    .catch(err => {
      console.log(err)
    })
  },
}

export default mutations