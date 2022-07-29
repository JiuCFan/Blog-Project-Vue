<template>
  <a-layout>
    <a-layout-sider
      width="180"
      style="background: #fff; padding-top: 20px; min-height: 100vh"
    >
      <!-- <a-typography-title :level="5" style="text-align: center"
        >Blog 后台管理系统</a-typography-title
      >
      <a-divider style="margin: 0" /> -->
      <a-menu v-model:selectedKeys="selectedKeys" mode="inline">
        <a-menu-item key="1" @click="goArticle">
          <span>文章管理</span>
        </a-menu-item>
        <a-menu-item key="2" @click="goCategory">
          <span>分类管理</span>
        </a-menu-item>
        <a-menu-item key="3" @click="logout">
          <span>退出登录</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
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

const selectedKeys = ref(['0'])
const router = useRouter()
const route = useRoute()

const goArticle = () => {
  router.push('/dashboard/article')
}
const goCategory = () => {
  router.push('/dashboard/category')
}
const logout = () => {
  clearToken()
  router.push('/login')
}
</script>

<style lang="scss" scoped></style>
