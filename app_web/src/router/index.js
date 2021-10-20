import Vue from 'vue'
import VueRouter from 'vue-router'
import Register from "@/login/pages/Register";

Vue.use(VueRouter)

const routes = [
  {
    path: '/Register',
    name: 'Register',
    component: Register
  },
  {
    path: '/Posts',
    name: 'Posts',
    component:()=>import('../posts/pages/post-manager.vue')
  },
  {
    path: '/Chat',
    name: 'Chat',
    component:()=>import('../components/Access-chat')
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
