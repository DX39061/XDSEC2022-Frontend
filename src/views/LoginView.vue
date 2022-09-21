<template>
  <div>
    <n-card title="登录报名系统" class="login-card" hoverable>
      <n-form
          style="text-align: left"
          ref="formRef"
          :model="formValue"
          :rules="rules"
          :disabled="isLogin"
          @click="disableLogin"
      >
        <n-space vertical>
          <n-form-item label="学号/手机/邮箱" path="account">
            <n-input v-model:value="formValue.account" placeholder="请输入你的学号/手机/邮箱" style="min-width: 250px"/>
          </n-form-item>
          <n-form-item label="密码" path="password">
            <n-input type="password" show-password-on="click" v-model:value="formValue.password"
                     placeholder="请输入你报名时设置的密码"/>
          </n-form-item>
        </n-space>
        <n-space justify="space-between">
          <n-button :disabled="isLogin" @click="loginHandler">登录</n-button>
          <n-button @click="$router.push('/join')">去报名</n-button>
        </n-space>
      </n-form>
    </n-card>
    <h4>注：请先在Join页面填写报名信息注册帐号</h4>
  </div>

</template>

<script lang="ts">
import {defineComponent, ref} from 'vue'
import {FormInst} from "naive-ui";
import {login, LoginRequest} from "@/api/account";

export default defineComponent({
  methods: {
    disableLogin() {
      if(this.isLogin) {
        window.$message.destroyAll()
        window.$message.info('您已登录帐号')
      }
    },
    loginHandler() {
      window.$message.loading('登录中，请稍候...')
      if (!this.formRef) {
        window.$message.destroyAll()
        window.$message.error('表单错误')
        return
      }
      this.formRef.validate((errors) => {
        if (errors) {
          window.$message.destroyAll()
          window.$message.error('请正确填写表单后再点击登录')
          return
        }
        const loginRequest: LoginRequest = {
          account: this.formValue.account,
          password: this.formValue.password
        }
        login(loginRequest).then(() => {
          window.$message.destroyAll()
          window.$message.success('登录成功')
          // this.$router.push('/profile')
          location.reload()
        }).catch((err: Error) => {
          window.$message.destroyAll()
          window.$message.error('登录失败 ' + err.message)
        })
      })

    }
  },
  setup() {
    const formRef = ref<FormInst | null>(null)
    const isLogin = ref(false)
    return {
      isLogin,
      formRef,
      formValue: ref({
        account: '',
        password: ''
      }),
      rules: {
        account: {
          required: true,
          message: '请输入你的帐号'
        },
        password: {
          required: true,
          message: '请输入你的密码'
        }
      }
    }
  },
  mounted() {
    this.isLogin = localStorage.getItem('login') === 'true'
  }
})
</script>

<style lang="sass">
.login-card
  max-width: 400px
  margin: 2rem auto

</style>