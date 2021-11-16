import Vue from 'vue'
import VueRouter from 'vue-router'
import Register from "@/login/pages/Register";
import Web from "@/views/Web";
import PostDetail from '../posts/pages/post-detail'
import Introduction from "@/introduction/pages/Introduction";


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
    path: '/Introduction/:userId',
    name: 'Introduction',
    component: Introduction
  },

  {
    path: '/Web/:userId?',
    name: 'Web',
    component: Web,
    children: [
      {
        path: '/web/:userId/posts',
        name: 'Posts',
        component: () => import('../posts/pages/post-manager.vue')
      },
      {
        path: '/web/:userId/Chat',
        name: 'Chat',
        component: () => import('../components/chat/access-chat')
      },
      {
        path: '/web/:userId/addPost',
        name: 'addPost',
        component: () => import('../posts/pages/add-post')
      },

      {
        path: "/web/:userId/interests",
        name: "interests",
        component: () => import("../components/interest/pages/interests-list")
      },
      {
        path: "/interests/:interestId",
        name: "interest-details",
        component: () => import("../components/interest/pages/interest")
      },
      {
        path: "/addInterest",
        name: "add",
        component: () => import("../components/interest/pages/add-interest")
      },
      {
        path: "/professions",
        name: "professions",
        component: () => import("../components/profession/pages/professions-list")
      },
      {
        path: "/professions/:professionId",
        name: "profession-details",
        component: () => import("../components/profession/pages/profession")
      },
      {
        path: "/addProfession",
        name: "addProfession",
        component: () => import("../components/profession/pages/add-profession")
      },
      {
        path: "/web/:userId/profile",
        name: "profile",
        component: () => import("../components/profile/profile-manager")
      },
      {
        path: '/main/:userId/post-detail/:postId',
        name: 'PostDetail',
        component: PostDetail
      },
      {
        path: '/visited/:userId/profile/:visitedId',
        name: 'visited',
        component: ()=>import("../components/profile-visited/visited-manager")
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
