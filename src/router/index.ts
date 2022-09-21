import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '../views/HomeView.vue')
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/join',
    name: 'join',
    component: () => import(/* webpackChunkName: "join" */ '../views/JoinView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/LoginView.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import(/* webpackChunkName: "profile" */'../views/ProfileView.vue'),
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('login') === 'true') {
        next()
      } else {
        next('/profile')
      }
    }
  },
  {
    path: '/admin',
    children: [
      {
        path: 'overview',
        name: 'overview',
        component: () => import(/* webpackChunkName: "overview" */'../views/Admin/OverviewView.vue')
      },
      {
        path: 'users',
        children: [
          {
            path: '',
            name: 'userList',
            component: () => import(/* webpackChunkName: "users" */'../views/Admin/Users/UserList.vue'),
          },
          {
            path: ':id',
            name: 'userDetail',
            component: () => import(/* webpackChunkName: "userDetail" */'../views/Admin/Users/UserDetail.vue')
          }
        ]
      },
      {
        path: 'interviews',
        children: [
          {
            path: '',
            name: 'interviewList',
            component: () => import(/* webpackChunkName: "interviewList" */'../views/Admin/Interviews/InterviewList.vue')
          },
          {
            path: ':user',
            name: 'interviewDetail',
            component: () => import(/* webpackChunkName: "interviewDetail" */'../views/Admin/Interviews/InterviewDetail.vue')
          }
        ]
      }
    ],
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('admin') === 'true') {
          next()
      } else {
        next('/forbidden')
      }
    }
  },
  {
    path: '/forbidden',
    name: 'forbidden',
    component: () => import(/* webpackChunkName: "forbidden" */ '../views/forbidden.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import(/* webpackChunkName: "notFound" */ '../views/404View.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
