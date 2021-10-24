import Vue from 'vue'
import VueRouter from 'vue-router'
import PostManager from '../posts/pages/post-manager'

Vue.use(VueRouter)

const routes = [
  {
    path: '/posts',
    name: 'Post',
    component: PostManager
  },
  {
    path:'/',
    name:'Home',
    component: PostManager
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
  },
  {
    path: "/interests",
    name: "interests",
    component: () => import("../components/interest/pages/interests-list")
  },
  {
    path: "/interests/:id",
    name: "interest-details",
    component: () => import("../components/interest/pages/interest")
  },
  {
    path: "/add",
    name: "add",
    component: () => import("../components/interest/pages/add-interest")
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
