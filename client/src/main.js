import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import Antd, { message } from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import { router } from './utils/router'
import { createPinia } from 'pinia'
import { http } from './utils/http'
import { getToken } from './utils/token'

/**
 * axios
 * pinia
 * sass
 * vue-router
 * ant-design
 * wangeditor
 */

http.defaults.baseURL = "http://localhost:8080"

const app = createApp(App)
app.provide("http", http)
app.provide("server_url", http.defaults.baseURL)
app.use(createPinia())
app.use(router)
app.use(Antd).mount('#app')

//判断是否登录
const token = getToken()
router.beforeEach(function (to, from, next) {
  if (to.meta.needLogin && from.name != 'login') {
    //从cookie中获取用户信息，判断是否已登录
    if (token) {
      next() //表示已经登录
    } else {
      //未登录
      //next可以传递一个路由对象作为参数 表示需要跳转到的页面
      message.error('请先登录')
      next({
        name: "login",
        query: { redirect: to.meta.redirect } //登录后再跳回此页面时要做的配置
      })
    }
  } else {
    //表示不需要登录
    next() //继续往后走
  }
})
