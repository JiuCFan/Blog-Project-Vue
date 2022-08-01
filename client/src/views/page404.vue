<template>
  <a-result status="404" title="404" sub-title="抱歉，您访问的页面不存在">
    <template #extra>
      <a-button type="primary" @click="goHomePage">返回首页</a-button>
    </template>
  </a-result>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
const goHomePage = () => {
  router.push('/')
}
</script>

<style lang="scss" scoped></style>
