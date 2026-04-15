<script setup lang="ts">
import { reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/user'

const form = reactive({
  username: 'admin',
  password: '123456',
})

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()

const handleLogin = () => {
  if (!form.username || !form.password) {
    ElMessage.warning('请输入用户名和密码')
    return
  }
  userStore.login(form.username)
  const redirect = typeof route.query.redirect === 'string' ? route.query.redirect : '/dashboard'
  router.push(redirect)
}
</script>

<template>
  <div class="login-page">
    <div class="panel tech-card">
      <h1>舆情智析</h1>
      <p>基于多智能体协同的舆情分析系统</p>
      <el-form :model="form" label-position="top">
        <el-form-item label="用户名">
          <el-input v-model="form.username" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password" type="password" show-password placeholder="请输入密码" />
        </el-form-item>
        <el-button type="primary" class="btn" @click="handleLogin">登录系统</el-button>
      </el-form>
    </div>
  </div>
</template>

<style scoped lang="scss">
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background:
    radial-gradient(circle at 20% 30%, rgba(64, 158, 255, 0.2), transparent 40%),
    radial-gradient(circle at 80% 20%, rgba(0, 240, 255, 0.18), transparent 38%),
    #060b1a;
}

.panel {
  width: 420px;
  padding: 28px;
}

h1 {
  margin: 0;
  color: #00f0ff;
}

p {
  margin: 8px 0 18px;
  color: #b7c7e8;
}

.btn {
  width: 100%;
}
</style>
