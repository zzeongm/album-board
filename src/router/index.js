import { createRouter, createWebHistory } from 'vue-router'
import BoardList from '../views/BoardList.vue'

const routes = [
  {
    path: '/',
    name: 'boardlist',
    component: BoardList
  },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }

    {
    path: '/boardwrite',
   
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "boardwrite" */ '../views/BoardWrite.vue')
  },
  {
    path: '/boardlogin',
   
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "boardlogin" */ '../views/BoardLogin.vue')
  },
  {
    path: '/boardread',
   
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "boardread" */ '../views/BoardRead.vue')
  },
  {
    path: '/boardupdate',
   
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "boardupdate" */ '../views/BoardUpdate.vue')
  },
  {
    path: '/boardjoin',
   
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "boardjoin" */ '../views/BoardJoin.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
