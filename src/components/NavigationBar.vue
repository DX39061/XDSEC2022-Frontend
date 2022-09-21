<template>
  <nav>
    <n-grid :cols="3">
      <n-gi offset="1">
        <router-link to="/">Home</router-link> |
        <router-link to="/login">Login</router-link> |
        <router-link to="/about">About</router-link> |
        <router-link :to="joinRouter">Join</router-link>
      </n-gi>
      <n-gi>
        <n-dropdown v-if="isLogin" size="huge" trigger="hover" :options="adminOptions" @select="dropdownSelect">
          <b>你好，{{userName}}</b>
        </n-dropdown>
      </n-gi>
    </n-grid>
  </nav>
</template>

<script lang="ts">
import {defineComponent, ref} from "vue";
import router from "@/router";
import {logout} from "@/api/account";

export default defineComponent({
  name: "Navigation-bar",
  setup() {
    const joinRouter = ref('/join')
    const isAdmin = ref(false)
    const isLogin = ref(false)
    const userName = ref('')
    return {
      isAdmin,
      isLogin,
      userName,
      joinRouter,
      adminOptions: [
        {
          label: '用户概览',
          key: 'admin/overview',
          show: false
        },
        {
          label: '用户列表',
          key: 'admin/users',
          show: false
        },
        {
          label: '面试列表',
          key: 'admin/interviews',
          show: false
        },
        {
          label: '登出',
          key: 'logout',
        }
      ],
      dropdownSelect (key: string) {
        if (key == 'logout') {
          window.$message.loading('正在登出，请稍候...')
          logout().then(() => {
            window.$message.destroyAll()
            window.$message.success('已登出')
          }).catch((err: Error) => {
            window.$message.destroyAll()
            window.$message.error('登出失败 ' + err.message)
          })
        } else {
          router.push(`/` + key)
        }
      },
    }
  },
  mounted() {
    this.userName = localStorage.getItem('nick-name') || ''
    this.isLogin = localStorage.getItem('login') === 'true'
    this.isAdmin = localStorage.getItem('admin') === 'true'
    this.adminOptions[0].show = this.isAdmin
    this.adminOptions[1].show = this.isAdmin
    this.adminOptions[2].show = this.isAdmin
    this.joinRouter = this.isLogin ? '/profile' : '/join'
    if (location.href.search('/login') != -1 && this.joinRouter == '/profile') {
      router.push('/profile')
    }
    if (location.href.search('/join') != -1 && this.joinRouter == '/profile') {
      router.push('/profile')
    }
    if (location.href.search('/profile') != -1 && this.joinRouter == '/join') {
      router.push('/join')
    }
  },
})

</script>

<style scoped>

</style>