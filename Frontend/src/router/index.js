import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      requiresAuth: true
    },
  },
  {
    path: '/about',
    name: 'about',
    meta: {
      requiresAuth: true
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      loginPage: true
    },
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'register',
    meta: {
      
    },
    component: () => import('../views/Register.vue')
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    meta: {
      requiresAuth: true
    },
    component: () => import('../views/Dashboard.vue')
  },
  {
    path: '/wind',
    name: 'wind',
    meta: {
      requiresAuth: true
    },
    component: () => import('../views/Wind.vue')
  },
  {
    path: '/battery',
    name: 'battery',
    meta: {
      requiresAuth: true
    },
    component: () => import('../views/Battery.vue')
  },
  {
    path: '/manage',
    name: 'manager',
    meta: {
      requiresAuth: true
    },
    component: () => import('../views/Manager.vue')
  },
  {
    path: '/u/:id',
    name: 'usersettings',
    meta: {
      requiresAuth: true
    },
    component: () => import('../views/UserSettings.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    // TODO: Validate JWT for simple time
      if (localStorage.getItem('jwt') == null) {
          next({
              path: '/login',
              params: { nextUrl: to.fullPath }
          })
      } else {
          let user = JSON.parse(localStorage.getItem('user'))
          if(to.matched.some(record => record.meta.is_admin)) {
              if(user.is_admin == 1){
                  next()
              }
              else{
                  next({ name: 'home'})
              }
          }else {
              next()
          }
      }
  } else if(to.matched.some(record => record.meta.guest)) {
      if(localStorage.getItem('jwt') == null){
          next()
      }
      else{
        next({ name: 'home'})
      }
  }else {
      next() 
  }
})

export default router
