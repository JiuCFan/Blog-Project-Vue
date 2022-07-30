<template>
  <a-form
    :model="article"
    @finish="addArticle"
    style="margin: 0 auto; margin: 5% 5%"
  >
    <a-form-item
      name="title"
      :rules="[{ required: true, message: '请输入标题' }]"
    >
      <a-typography-title :level="5">文章标题</a-typography-title>
      <a-input v-model:value="article.title" placeholder="请输入标题" />
    </a-form-item>

    <a-form-item>
      <a-typography-title :level="5">文章类别</a-typography-title>
      <a-select
        v-model:value="value"
        :options="categoryOptions"
        show-search
        @change="handleChange"
        :filter-option="filterOption"
        placeholder="请选择文章类别"
      >
      </a-select>
    </a-form-item>
    <a-form-item>
      <a-typography-title :level="5">内容</a-typography-title>
      <RichTextEditorVue v-model="article.content" ref="editorRef" />
    </a-form-item>

    <a-form-item>
      <a-button type="primary" html-type="submit" block>提交</a-button>
    </a-form-item>
  </a-form>
</template>

<script setup>
import { message } from 'ant-design-vue'
import { ref, reactive, inject, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import RichTextEditorVue from '../../components/RichTextEditor.vue'

const http = inject('http')
const router = useRouter()

onMounted(() => {
  loadCategory()
})

const article = reactive({
  categoryId: 0,
  title: '',
  content: '',
})

const value = ref(null)
const categoryOptions = ref([])
// 加载Category数据用于选择器
const loadCategory = async () => {
  let res = await http.get('/category/list')
  categoryOptions.value = res.data.results.map((item) => {
    return { value: item.id, label: item.name }
  })
}
// 选择器类别搜索
const filterOption = (input, option) => {
  console.log(input, option)
  return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
}
// 选中后获取categoryId
const handleChange = (value) => {
  article.categoryId = value
}

// 子组件RichTextEditorVue绑定ref
const editorRef = ref(null)
// 添加文章
const addArticle = async () => {
  let res = await http.post('/blog/add', article)
  if (res.data.code == 200) {
    message.success(res.data.msg)
    console.log(article)
    article.title = ''
    article.categoryId = 0
    article.content = ''
    value.value = null
    // 调用子组件RichTextEditorVue中的方法清空编辑器中内容
    editorRef.value.clearHtmlValue()
  } else {
    message.error(res.data.msg)
  }
}
</script>

<style lang="scss" scoped></style>
