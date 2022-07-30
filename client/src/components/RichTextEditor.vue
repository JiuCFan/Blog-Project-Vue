<template>
  <div style="border: 1px solid #ccc">
    <Toolbar
      style="border-bottom: 1px solid #ccc"
      :editor="editorRef"
      :defaultConfig="toolbarConfig"
      :mode="mode"
    />
    <Editor
      style="height: 500px; overflow-y: hidden"
      v-model="valueHtml"
      :defaultConfig="editorConfig"
      :mode="mode"
      @onCreated="handleCreated"
      @onChange="handleChange"
    />
  </div>
</template>

<script setup>
import '@wangeditor/editor/dist/css/style.css' // 引入 css

import {
  onBeforeUnmount,
  ref,
  shallowRef,
  onMounted,
  inject,
  defineExpose,
} from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'

const http = inject('http')

// 编辑器实例，必须用 shallowRef，重要！
const editorRef = shallowRef()
const server_url = inject('server_url')

const toolbarConfig = { excludeKeys: ['uploadVideo'] }
const editorConfig = { placeholder: '请输入内容...' }
editorConfig.MENU_CONF = {}
editorConfig.MENU_CONF['uploadImage'] = {
  server: `${server_url}/upload/rich_editor_upload`,

  // 小于该值就插入 base64 格式（而不上传），默认为 0
  base64LimitSize: 10 * 1024, // 10kb
}
editorConfig.MENU_CONF['insertImage'] = { parseImageSrc: customParseImageSrc }
function customParseImageSrc(src) {
  if (src.indexOf('http') !== 0) {
    return `${server_url}/${src}`
  }
  return src
}

// 内容 HTML
const valueHtml = ref('')

let mode = 'defalt' // 或 'simple'

const props = defineProps({
  id: { type: String, default: null },
})
const emit = defineEmits(['update:model-value'])

// 模拟 ajax 异步获取内容
onMounted(() => {
  innitValue()
})

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})

const handleCreated = (editor) => {
  editorRef.value = editor // 记录 editor 实例，重要！
}
// 将valueHtml发射传给父组件
const handleChange = () => {
  emit('update:model-value', valueHtml.value)
}

const innitValue = async () => {
  let { data } = await http.get('/blog/detail', {
    params: { id: props.id },
  })
  let res = data.data
  valueHtml.value = res.content
}

// 清空编辑器内容
const clearHtmlValue = () => {
  valueHtml.value = ''
}
// 使用 <script setup> 的组件是默认关闭的，
// 也即通过模板 ref 或者 $parent 链获取到的组件的公开实例，不会暴露任何在 <script setup> 中声明的绑定
// 将方法clearHtmlValue暴露出去，以便父组件调用
defineExpose({ clearHtmlValue })
</script>

<style lang="scss" scoped></style>
