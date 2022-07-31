<template>
  <a-layout class="layout">
    <a-layout-header>
      <a-typography-title :level="3" style="color: #fff"
        >Blog</a-typography-title
      >
      <a-button type="primary" @click="login">登录</a-button>
    </a-layout-header>
    <a-layout-content style="padding: 0 50px; min-height: 100vh">
      <div style="margin: 15px 5%">
        <a-input-search
          v-model:value="searchValue"
          placeholder="搜文章..."
          enter-button
          @change="onSearch"
        />
      </div>
      <div
        v-for="(article, index) in articleInfo.articleList"
        style="margin: 15px 5%"
      >
        <a-card
          :title="article.title"
          @click="goDetailPage(article.id)"
          hoverable
        >
          <template #extra>
            <a-typography-text type="secondary">
              {{
                article.update_time ? article.update_time : article.create_time
              }}
            </a-typography-text>
          </template>
          <a-typography-paragraph
            :ellipsis="{ rows: 3 }"
            :content="article.content"
            v-html="article.content"
            class="blog-content"
          ></a-typography-paragraph>
        </a-card>
      </div>

      <a-pagination
        v-model:current="current"
        :total="articleInfo.count"
        show-less-items
        @change="pageChange"
        style="text-align: center; margin-bottom: 3%"
        :pageSize="articleInfo.pagesize"
      />
    </a-layout-content>
  </a-layout>
</template>

<script setup>
import { ref, reactive, onMounted, inject } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import moment from 'moment'

const http = inject('http')
const router = useRouter()
const route = useRoute()

onMounted(() => {
  loadArticle()
})

// 当前页面
const current = ref(1)
const searchValue = ref('')
const pageChange = () => {
  loadArticle()
}

const onSearch = () => {
  loadArticle()
}

const articleInfo = reactive({
  page: 1,
  pagesize: 5,
  count: null,
  articleList: [],
})
const loadArticle = async () => {
  let { data } = await http.get('/blog/search', {
    params: {
      page: current.value,
      keyword: searchValue.value,
      pagesize: articleInfo.pagesize,
    },
  })
  let res = data.data
  articleInfo.page = res.page
  articleInfo.pagesize = res.pagesize
  articleInfo.count = res.count
  let tempList = res.results
  for (let item of tempList) {
    item.create_time = moment(item.create_time).format('YYYY年MM月DD日 HH:mm')
    if (item.update_time) {
      item.update_time = moment(item.update_time).format('YYYY年MM月DD日 HH:mm')
    }
  }
  articleInfo.articleList = tempList
}
const login = () => {
  router.push('/login')
}
const goDetailPage = (id) => {
  router.push({ path: '/detail', query: { id } })
}
</script>

<style lang="scss" scoped>
.ant-layout-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
