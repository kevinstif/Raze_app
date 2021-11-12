import Vue from 'vue'
import VueRouter from 'vue-router'
import Register from "@/login/pages/Register";
import Web from "@/views/Web";
import PostDetail from '../posts/pages/post-detail'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Register',
    component: Register,
  },
  {
    path: '/Register',
    name: 'Register',
    component: Register
  },
  {
    path: '/calendar',
    name: 'Calendar',
    component: ()=>import('../components/calendar/pages/access-calendar')
  },
  {
    path: '/test',
    name: 'Test',
    component: ()=>import('../components/calendar/pages/calendar')
  },
  {
    path: '/Web/:idUser?',
    name: 'Web',
    component: Web,
    children: [
      {
        path: '/web/Posts',
        name: 'Posts',
        component: () => import('../posts/pages/post-manager.vue')
      },
      {
        path: '/Chat',
        name: 'Chat',
        component: () => import('../components/Access-chat')
      },
      {
        path: '/addPost',
        name: '/addPost',
        component: () => import('../posts/pages/add-post')
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
      },
      {
        path: '/main/:userId/post-detail/:postId',
        name: 'PostDetail',
        component: PostDetail
      }

    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
