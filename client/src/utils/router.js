import { createRouter, createWebHashHistory } from 'vue-router'
import Test from '../views/Test.vue'
import Login from '../views/Login.vue'
import Dashboard from '../views/dashboard/Dashboard.vue'
import Category from '../views/dashboard/Category.vue'
import Article from '../views/dashboard/Article.vue'
let routes = [
  { path: '/test', component: Test },
  { path: '/login', component: Login },
  {
    path: '/dashboard', component: Dashboard, children: [
      { path: '/dashboard/category', component: Category },
      { path: '/dashboard/article', component: Article }
    ]
  },
  // { path: '/dashboard/category', component: Category }
]
let router = createRouter({
  history: createWebHashHistory(),
  routes
})
export { router, routes }