<template>
  <div
    v-for="(article, index) in articleInfo.articleList"
    style="margin: 15px 5%"
  >
    <a-card
      :title="article.title"
      @click="goDetailPage"
      :bordered="false"
      style="cursor: pointer"
    >
      <template #extra>{{
        article.update_time ? article.update_time : article.create_time
      }}</template>
      <a-typography-paragraph
        :ellipsis="{ rows: 3 }"
        :content="article.content"
      />
    </a-card>
    <div
      style="
        display: flex;
        justify-content: flex-end;
        padding: 3px;
        background-color: white;
      "
    >
      <a-space>
        <a-button type="primary" @click="editArticle(article.id)"
          >编辑文章</a-button
        >
        <a-button type="primary" danger @click="deleteArticle(article.id)"
          >删除文章</a-button
        >
      </a-space>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import moment from 'moment'
import { http } from '../../utils/http'
import { router } from '../../utils/router'

onMounted(() => {
  loadArticle()
})

const articleInfo = reactive({
  page: 1,
  pagesize: 10,
  articleList: [],
})
const loadArticle = async () => {
  let { data } = await http.get('/blog/search')
  let res = data.data
  articleInfo.page = res.page
  articleInfo.pagesize = res.pagesize
  let tempList = res.results
  for (let item of tempList) {
    item.create_time = moment(item.create_time).format('YYYY年MM月DD日 HH:mm')
    if (item.update_time) {
      item.update_time = moment(item.update_time).format('YYYY年MM月DD日 HH:mm')
    }
  }
  articleInfo.articleList = tempList
  console.log(articleInfo.articleList)
}

const goDetailPage = () => {
  console.log('goDetailPage')
}
const deleteArticle = async (id) => {
  await http.delete('/blog/delete', { params: { id } })
  loadArticle()
}

const editArticle = (id) => {
  console.log('edit')
  router.push({ path: '/dashboard/editArticle', query: { id } })
}
</script>

<style lang="scss" scoped></style>
