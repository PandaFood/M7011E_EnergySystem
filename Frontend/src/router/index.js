import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/about',
    name: 'about',
    meta: {
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
    path: '/dashboard/:houseId',
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
    path: '/manage/control',
    name: 'controlpanel',
    meta: {
      requiresAuth: true
    },
    component: () => import('../views/ControlPanel.vue')
  },
  {
    path: '/u/:id',
    name: 'User',
    meta: {
      requiresAuth: true
    },
    component: () => import('../views/User.vue')
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
          next()
          
      }
  } else if(to.matched.some(record => record.meta.guest)) {
      if(localStorage.getItem('jwt') == null){
          next()
      }
      else{
        next()
      }
  }else if(to.fullPath === '/'){
    let role = localStorage.getItem('role');

    if(role == null) {
      next({
        path: '/login',
      })
    }
    else if(role == "ADMIN") {
      next({
        path: '/manage',
      })
    } else {
      next({
        path: '/dashboard/'+ localStorage.getItem('houseId'),
      })
    }
  } else {
    next()
  }
})

export default router
