<template>
  <div class="table-planel">
    <a-button type="primary" style="margin: 8px" @click="handleAdd"
      >添加分类</a-button
    >
    <a-modal
      v-model:visible="addFormVisible"
      title="添加分类"
      @ok="addCategory(newName)"
    >
      <a-input v-model:value="newName" placeholder="请输入分类名称" />
    </a-modal>
    <a-modal
      v-model:visible="editFormVisible"
      title="修改分类"
      @ok="editCategory(editedId, editedName)"
    >
      <a-input v-model:value="editedName" />
    </a-modal>
    <a-table
      :columns="columns"
      :data-source="categoryList.values.length > 0 ? categoryList.values : []"
      bordered
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'operation'">
          <a-space>
            <a-button type="primary" @click="handleEdit(record.id, record.name)"
              >编辑</a-button
            >
            <a-popconfirm
              title="确定删除吗？"
              @confirm="deleteCategory(record.id)"
            >
              <a-button type="primary" danger>删除</a-button>
            </a-popconfirm>
          </a-space>
        </template>
      </template>
    </a-table>
  </div>
</template>
<script setup>
import { reactive, ref, inject, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const http = inject('http')

const categoryList = reactive([])
const columns = [
  {
    title: '编号',
    dataIndex: 'id',
    width: '15%',
  },
  {
    title: '名称',
    dataIndex: 'name',
    width: '25%',
  },
  {
    title: '操作',
    dataIndex: 'operation',
    width: '15%',
  },
]

const addFormVisible = ref(false)
const editFormVisible = ref(false)
const handleAdd = () => {
  addFormVisible.value = !addFormVisible.value
}
const handleEdit = (id, name) => {
  editedName.value = name
  editedId.value = id
  editFormVisible.value = !editFormVisible.value
}

onMounted(() => {
  loadData()
})

const loadData = async () => {
  let resulte = await http.get('/category/list')
  let res = resulte.data
  categoryList.values = res.results
  console.log(categoryList.values)
}

const newName = ref('')
const addCategory = async (name) => {
  await http.post('/category/add', { name })
  addFormVisible.value = !addFormVisible.value
  newName.value = ''
  loadData()
}

const editedName = ref('')
const editedId = ref()
const editCategory = async (id, name) => {
  await http.put('/category/update', { id, name })
  editFormVisible.value = !editFormVisible.value
  loadData()
}

const deleteCategory = async (id) => {
  let resulte = await http.delete('/category/delete', { params: { id } })
  loadData()
}
</script>
<style scoped>
.table-planel {
  margin: 0px auto;
  width: 90%;
}
</style>
