<template>
  <a-layout class="layout">
    <a-layout-header>
      <a-typography-title :level="3" style="color: #fff"
        >Blog</a-typography-title
      >
      <a-button v-if="!token" type="primary" @click="login">登录</a-button>
      <div v-else="token">
        <a-popconfirm title="确定退出吗？" @confirm="logout">
          <a-button type="primary">退出登录</a-button>
        </a-popconfirm>
      </div>
    </a-layout-header>
    <a-layout-content style="padding: 0 50px; min-height: 100vh">
      <a-card style="margin: 3% 0 2%">
        <template v-if="token" #title>
          <a-space>
            <a-button type="primary" @click="editArticle(id)"
              >编辑文章</a-button
            >
            <a-popconfirm title="确定删除吗？" @confirm="deleteArticle(id)">
              <a-button type="primary" danger>删除文章</a-button>
            </a-popconfirm>
          </a-space>
        </template>
        <a-typography-title :level="3"> {{ article.title }}</a-typography-title>
        <a-typography-text type="secondary"
          >{{ article.time }}
        </a-typography-text>

        <div class="blog-content">
          <div v-html="article.content"></div>
        </div>
      </a-card>
      <div style="text-align: center; padding-bottom: 20px">
        <a-button @click="goBack">返回</a-button>
      </div>
    </a-layout-content>
  </a-layout>
</template>

<script setup>
import { ref, reactive, inject, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import moment from 'moment'
import { clearToken, getToken } from '../utils/token'

const http = inject('http')
const router = useRouter()
const route = useRoute()
const token = getToken()

let id = route.query.id

const article = reactive({
  title: '',
  content: '',
  time: '',
})

onMounted(() => {
  loadArticle()
})

const loadArticle = async () => {
  let { data } = await http.get('/blog/detail', {
    params: { id },
  })
  let res = data.data
  article.title = res.title
  article.content = res.content
  let temp_time = res.update_time ? res.update_time : res.create_time
  article.time = moment(temp_time).format('YYYY年MM月DD日 HH:mm')
}

const deleteArticle = async (id) => {
  await http.delete('/blog/delete', { params: { id } })
  router.push('/dashboard/articleList')
}

const editArticle = (id) => {
  router.push({ path: '/dashboard/editArticle', query: { id } })
}

const login = () => {
  router.push('/login')
}
const logout = () => {
  clearToken()
  router.push('/')
}
const goBack = () => {
  router.back()
}
</script>

<style lang="scss">
.blog-content {
  margin-top: 10px;
  img {
    max-width: 100%;
  }
}
</style>
<style lang="scss" scoped>
.ant-layout-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
