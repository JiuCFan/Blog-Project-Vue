import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '../views/Login.vue'
import HomePage from '../views/HomePage.vue'
import Dashboard from '../views/dashboard/Dashboard.vue'
import Category from '../views/dashboard/Category.vue'
import ArticleList from '../views/dashboard/ArticleList.vue'
import AddArticle from '../views/dashboard/AddArticle.vue'
import EditArticle from '../views/dashboard/EditArticle.vue'
import ArticleDetail from '../views/ArticleDetail.vue'
import page404 from '../views/page404.vue'
import { getToken } from './token'
import { message } from 'ant-design-vue'

let routes = [
  { path: '/', component: HomePage, name: 'home' },
  { path: '/login', component: Login, name: 'login' },
  {
    path: '/dashboard', redirect: '/dashboard/articleList', component: Dashboard,
    children: [
      { path: '/dashboard/category', component: Category, meta: { needLogin: true } },
      { path: '/dashboard/articleList', component: ArticleList, meta: { needLogin: true } },
      { path: '/dashboard/addArticle', component: AddArticle, meta: { needLogin: true } },
      { path: '/dashboard/editArticle', component: EditArticle, meta: { needLogin: true } },
    ],
    meta: {
      needLogin: true
    }
  },
  { path: '/detail', component: ArticleDetail, name: 'detail' },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: page404 },
]
let router = createRouter({
  history: createWebHashHistory(),
  routes
})
const token = getToken()

// 全局路由守卫
/* router.beforeEach((to, from) => {
  if (
    // 检查用户是否已登录
    !token &&
    // ❗️ 避免无限重定向
    to.name !== 'login' &&
    to.name !== 'home' &&
    to.name !== 'detail'
  ) {
    message.error('请先登录')
    // 将用户重定向到登录页面
    return '/login'
  }
}) */



export { router, routes }