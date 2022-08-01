<template>
  <div>
    <a-card
      title="管理后台登录"
      hoverable
      style="max-width: 500px; margin: 0 auto; margin-top: 150px"
    >
      <a-form :model="admin" @finish="login">
        <a-form-item
          label="账号"
          name="account"
          :rules="[
            { required: true, message: '请输入账号' },
            { min: 3, max: 12, message: '账号长度为3到12个字符' },
          ]"
        >
          <a-input v-model:value="admin.account" placeholder="请输入账号" />
        </a-form-item>

        <a-form-item
          name="password"
          label="密码"
          :rules="[
            { required: true, message: '请输入密码' },
            { min: 3, max: 12, message: '密码长度为6到18个字符' },
          ]"
        >
          <a-input-password
            v-model:value="admin.password"
            placeholder="请输入密码"
          />
        </a-form-item>

        <a-form-item name="remember" :wrapper-col="{ offset: 3 }">
          <a-checkbox v-model:checked="admin.remember">记住密码</a-checkbox>
        </a-form-item>

        <a-form-item>
          <a-button type="primary" html-type="submit" block>登录</a-button>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>

<script setup>
import { ref, reactive, inject } from 'vue'
import { useRouter, useRoute } from 'vue-router'
// import { AdminStore } from '../stores/AdminStore'
import { message } from 'ant-design-vue'
import { setToken } from '../utils/token'

const http = inject('http')
// const adminStore = AdminStore()

const router = useRouter()
const route = useRoute()

const admin = reactive({
  account: localStorage.getItem('account') || '',
  password: localStorage.getItem('password') || '',
  remember: localStorage.getItem('remember') == 1 || false,
})
const login = async () => {
  let resulte = await http.post('/admin/login', {
    account: admin.account,
    password: admin.password,
  })
  let res = resulte.data
  console.log(res)
  if (res.code == 200) {
    setToken(res.data.token)
    // adminStore.account = res.data.account
    // adminStore.id = res.data.id

    // 记住账号密码
    if (admin.remember) {
      localStorage.setItem('account', admin.account)
      localStorage.setItem('password', admin.password)
      localStorage.setItem('remember', admin.remember ? 1 : 0)
    } else {
      localStorage.removeItem('account')
      localStorage.removeItem('password')
      localStorage.removeItem('remember')
    }
    message.success(res.msg)
    // 跳转
    router.push('/dashboard')
  } else {
    message.error(res.msg)
  }
}
</script>

<style lang="scss" scoped></style>
