<template>
  <div style="display: flex; margin: 15px 5%">
    <a-select
      v-model:value="categoryId"
      :options="categoryOptions"
      :filter-option="filterOption"
      show-search
      placeholder="全部"
      style="min-width: 100px"
      @change="categoryChange"
    >
    </a-select>
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
      :bordered="false"
      style="cursor: pointer"
    >
      <template #extra>
        <a-typography-text type="secondary">
          {{ article.update_time ? article.update_time : article.create_time }}
        </a-typography-text>
      </template>
      <a-typography-paragraph
        class="blog-content"
        :ellipsis="{ rows: 3 }"
        :content="article.content"
        v-html="article.content"
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
        <a-popconfirm title="确定删除吗？" @confirm="deleteArticle(article.id)">
          <a-button type="primary" danger>删除文章</a-button>
        </a-popconfirm>
      </a-space>
    </div>
  </div>
  <a-empty :image="simpleImage" v-show="articleInfo.articleList.length <= 0" />

  <a-pagination
    v-show="articleInfo.articleList.length > 0"
    v-model:current="current"
    :total="articleInfo.count"
    show-less-items
    @change="pageChange"
    :pageSize="pageSize"
    style="text-align: center; margin-bottom: 3%"
  />
</template>

<script setup>
import { ref, reactive, onMounted, inject } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import moment from 'moment'
import { Empty } from 'ant-design-vue'

const simpleImage = Empty.PRESENTED_IMAGE_SIMPLE

const http = inject('http')
const router = useRouter()
const route = useRoute()

onMounted(() => {
  loadCategory()
  loadArticle()
})

const pageSize = ref(5)
// 当前页面
const current = ref(1)
const searchValue = ref('')

const pageChange = () => {
  loadArticle()
}
const onSearch = () => {
  loadArticle()
}
const categoryChange = () => {
  loadArticle()
}

const categoryId = ref(null)
const categoryOptions = ref([])
// 加载Category数据用于选择器
const loadCategory = async () => {
  let res = await http.get('/category/list')
  categoryOptions.value = res.data.results.map((item) => {
    return { value: item.id, label: item.name }
  })
  categoryOptions.value.unshift({ value: null, label: '全部' })
}
// 选择器类别搜索
const filterOption = (input, option) => {
  return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
}

const articleInfo = reactive({
  page: 1,
  pagesize: 10,
  count: null,
  articleList: [],
})
const loadArticle = async () => {
  let { data } = await http.get('/blog/search', {
    params: {
      page: current.value,
      pagesize: pageSize.value,
      keyword: searchValue.value,
      categoryId: categoryId.value,
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

const goDetailPage = (id) => {
  router.push({ path: '/detail', query: { id } })
}
const deleteArticle = async (id) => {
  await http.delete('/blog/delete', { params: { id } })
  loadArticle()
}

const editArticle = (id) => {
  router.push({ path: '/dashboard/editArticle', query: { id } })
}
</script>

<style lang="scss" scoped></style>
