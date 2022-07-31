<template>
  <a-layout>
    <a-layout-header>
      <a-typography-title :level="3" style="color: #fff"
        >Blog</a-typography-title
      >
      <a-popconfirm title="确定退出吗？" @confirm="logout">
        <a-button type="primary">退出登录</a-button>
      </a-popconfirm>
    </a-layout-header>
    <a-layout>
      <a-layout-sider width="180" style="background: #fff; min-height: 100vh">
        <a-menu
          v-model:selectedKeys="selectedKeys"
          v-model:openKeys="openKeysKeys"
          mode="inline"
        >
          <a-sub-menu key="sub1">
            <template #title>文章管理</template>
            <a-menu-item key="list" @click="goArticleList"
              >文章列表</a-menu-item
            >
            <a-menu-item key="add" @click="goAddArticle">添加文章</a-menu-item>
          </a-sub-menu>
          <a-menu-item key="2" @click="goCategory">
            <span>分类管理</span>
          </a-menu-item>
        </a-menu>
      </a-layout-sider>
      <a-layout-content>
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { clearToken } from '../../utils/token'

const selectedKeys = ref(['list'])
const openKeysKeys = ref(['sub1'])
const router = useRouter()
const route = useRoute()

const goArticleList = () => {
  router.push('/dashboard/articleList')
}
const goAddArticle = () => {
  router.push('/dashboard/addArticle')
}
const goCategory = () => {
  router.push('/dashboard/category')
}
const logout = () => {
  clearToken()
  router.push('/')
}
</script>

<style lang="scss" scoped>
.ant-layout-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
