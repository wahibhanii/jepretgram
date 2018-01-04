import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from '@/components/Home'
import Signup from '@/components/Signup'
import Login from '@/components/Login'
import Timeline from '@/components/Timeline'
import Explore from '@/components/Explore'
import MyProfile from '@/components/MyProfile'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      children: [
        {
          path: 'timeline',
          component: Timeline,
        },
        {
          path: 'explore',
          component: Explore,
        },
        {
          path: 'myprofile',
          component: MyProfile,
        },
      ]
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
  ]
})
