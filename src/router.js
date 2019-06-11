import Vue from 'vue'
import Router from 'vue-router'
//状态管理
import store from './store'

import AdminListArticle from './views/article/ListArticle.vue'
import AdminCreateArticle from './views/article/CreateArticle.vue'
import AdminEditArticle from './views/article/EditArticle.vue'

import AdminRerouceList from './views/resource/ResourceList.vue'
import AdminRerouceCreate from './views/resource/ResourceCreate.vue'

import AdminFriendList from './views/friend/FriendList.vue'
import AdminFriendCreate from './views/friend/FriendCreate.vue'


import AdminLogin from './views/alogin/alogin.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'login',
      component: AdminLogin,
    },
    {
      path: '/admin',
      name: 'home',
      redirect: '/admin/articles/index',
      meta: {
        requireAuth: true
      }
    },
    //--------------------------------------------------------
    {
      path: '/a/articles/index',
      name: 'list-article',
      component: AdminListArticle,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/a/articles/create',
      name: 'crtea-article',
      component: AdminCreateArticle,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/a/articles/:id/edit',
      name: 'edit-article',
      component: AdminEditArticle,
      meta: {
        requireAuth: true
      }
    },
    //------------------------------------------------
    {
      path: '/a/resources/index',
      name: 'lsit-resouce',
      component: AdminRerouceList,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/a/resources/create',
      name: 'create-resouce',
      component: AdminRerouceCreate,
      meta: {
        requireAuth: true
      }
    },
    //---------------------------------------------------
    {
      path: '/a/friends/index',
      name: 'lsit-friend',
      component: AdminFriendList,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/a/friends/create',
      name: 'create-friend',
      component: AdminFriendCreate,
      meta: {
        requireAuth: true
      }
    },
    //---------------------------------------------------------
  ]
});
router.beforeEach((to, from, next) => {
  if (to.fullPath.indexOf('/a') !== -1) {
    store.commit('IS_ADMIN_WRAP', true)
  } else {
    store.commit('IS_ADMIN_WRAP', false)
  }
  let token = localStorage.getItem('Authorization');
  if (to.path === '/login') {
    next();
  } else {

    if (token === 'null' || token === "") {
      next('/login')
    } else {
      next();
    }
  }
  if (to.meta.requireAuth) {
    //登录拦截
    if (!token) {
      next('/login')
    }
  }
  else {
    next() // 确保一定要调用 next()
  }
})
export default router