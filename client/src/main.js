import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import { router } from './utils/router'
import { createPinia } from 'pinia'
import { http } from './utils/http'
import axios from "axios"

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
