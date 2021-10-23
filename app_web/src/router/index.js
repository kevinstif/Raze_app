import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Posts',
    component:()=>import('../posts/pages/post-manager.vue')
  },
  {
    path: '/Chat',
    name: 'Chat',
    component:()=>import('../components/Access-chat')
  },
  {
    path: '/addPost',
    name: '/addPost',
    component:()=>import('../posts/pages/add-post')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
