import Vue from 'vue'
import VueRouter from 'vue-router'
import PostManager from '../posts/pages/post-manager'
import PostDetail from '../posts/pages/post-detail'

Vue.use(VueRouter)

const routes = [
  {
    path: '/posts',
    name: 'Post',
    component: PostManager
  },
  {
    path: '/',
    name: 'Home',
    component: PostManager
  },
  {
    path: '/main/:userId/post-detail/:postId',
    name: 'PostDetail',
    component: PostDetail
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
