import { createRouter, createWebHashHistory } from 'vue-router'
import Test from '../views/Test.vue'
import Login from '../views/Login.vue'
import Dashboard from '../views/dashboard/Dashboard.vue'
import Category from '../views/dashboard/Category.vue'
import ArticleList from '../views/dashboard/ArticleList.vue'
import AddArticle from '../views/dashboard/AddArticle.vue'
import EditArticle from '../views/dashboard/EditArticle.vue'

let routes = [
  { path: '/test', component: Test },
  { path: '/login', component: Login },
  {
    path: '/dashboard', redirect: '/dashboard/articleList', component: Dashboard, children: [
      { path: '/dashboard/category', component: Category },
      { path: '/dashboard/articleList', component: ArticleList },
      { path: '/dashboard/addArticle', component: AddArticle },
      { path: '/dashboard/editArticle', component: EditArticle },
    ]
  },
  // { path: '/dashboard/category', component: Category }
]
let router = createRouter({
  history: createWebHashHistory(),
  routes
})
export { router, routes }