<template>
  <div>
    <n-card title="信息安全协会（XDSEC）2022招新报名表" class="join-card" hoverable>
      <n-form
          style="text-align: left"
          ref="formRef"
          :rules="rules"
          :model="formValue"
          :disabled="isLogin"
      >
        <n-space justify="space-between">
          <n-form-item label="姓名" path="name">
            <n-input v-model:value="formValue.name" placeholder="请输入你的姓名" style="min-width: 250px"/>
          </n-form-item>
          <n-form-item label="性别" path="sex">
            <n-select
                v-model:value="formValue.sex"
                :options="sexOptions"
                style="min-width: 250px"
                clearable
                placeholder="请选择你的性别"
            />
          </n-form-item>
        </n-space>
        <n-space justify="space-between">
          <n-form-item label="学院/专业" path="major">
            <n-input v-model:value="formValue.major" placeholder="请输入你的学院/专业" style="min-width: 250px"/>
          </n-form-item>
          <n-form-item label="学号" path="studentID">
            <n-input v-model:value="formValue.studentID" placeholder="请输入你的学号" style="min-width: 250px"/>
          </n-form-item>
        </n-space>
        <n-space justify="space-between">
          <n-form-item label="手机" path="telephone">
            <n-input v-model:value="formValue.telephone" placeholder="请输入你的手机号" style="min-width: 250px"/>
          </n-form-item>
          <n-form-item label="邮箱" path="email">
            <n-input v-model:value="formValue.email" placeholder="请输入你的邮箱" style="min-width: 250px"/>
          </n-form-item>
        </n-space>

        <n-form-item label="昵称" path="nickName">
          <n-input v-model:value="formValue.nickName" placeholder="请输入你的昵称" style="min-width: 250px"/>
        </n-form-item>
        <n-form-item label="密码" path="password">
          <n-input type="password" show-password-on="click" v-model:value="formValue.password"
                   placeholder="该密码用来登陆此报名系统修改信息"/>
        </n-form-item>
        <n-form-item label="意向部门" path="department">
          <n-select
              v-model:value="formValue.department"
              :options="departmentOptions"
              clearable
              show-arrow
              placeholder="请选择你的意向部门"
          />
        </n-form-item>
        <n-form-item label="学习方向" path="direction">
          <n-select
              placeholder="请选择你喜欢的学习方向"
              v-model:value="formValue.direction"
              :options="directionOptions"
              clearable
          />
        </n-form-item>
        <n-form-item label="技术基础">
          <n-input type="textarea" size="large" v-model:value="formValue.learnedTechnique"
                   placeholder="你已经掌握的编程语言或与网络安全相关的技术知识"/>
        </n-form-item>
        <n-form-item label="学习经历">
          <n-input type="textarea" size="large" v-model:value="formValue.learningExperience"
                   placeholder="如何学习新知识，如何解决学习过程中遇到的问题"/>
        </n-form-item>
        <n-form-item label="爱好特长">
          <n-input type="textarea" size="large" v-model:value="formValue.hobbyAndAdvantage"
                   placeholder="可以是你的才艺，当然也可以是你获得过的荣誉"/>
        </n-form-item>
        <n-space justify="space-between">
          <n-button size="large" @click="joinHandler" :disabled="isLogin">提交报名信息</n-button>
          <n-button size="large" @click="$router.push('/login')" :disabled="isLogin">已报名，去登陆</n-button>
        </n-space>


      </n-form>
    </n-card>
  </div>

</template>

<script lang="ts">
import {FormItemRule, FormInst} from 'naive-ui'
import {defineComponent, ref} from 'vue'
import {join, JoinRequest} from "@/api/account";

export default defineComponent({
  name: 'join-view',
  methods: {
    joinHandler() {
      window.$message.loading('提交中，请稍候...')
      if (!this.formRef) {
        window.$message.destroyAll()
        window.$message.error('表单错误')
        return
      }
      this.formRef.validate((errors) => {
        if (errors) {
          window.$message.destroyAll()
          window.$message.error('请正确填写表单后再提交')
          return
        }
        const joinRequest: JoinRequest = {
          'nick-name': this.formValue.nickName,
          name: this.formValue.name,
          sex: this.formValue.sex,
          major: this.formValue.major,
          'student-id': this.formValue.studentID,
          telephone: this.formValue.telephone,
          email: this.formValue.email,
          password: this.formValue.password,
          department: this.formValue.department,
          direction: this.formValue.direction,
          'learned-technique': this.formValue.learnedTechnique,
          'learning-experience': this.formValue.learningExperience,
          'hobby-and-advantage': this.formValue.hobbyAndAdvantage
        }
        join(joinRequest).then(() => {
          window.$message.destroyAll()
          window.$message.success('提交成功！')
          setTimeout(() => {
            location.reload()
          }, 2000)
          location.reload()
        }).catch((err: Error) => {
          window.$message.destroyAll()
          window.$message.error('提交失败 ' + err.message)
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
            nickName: '',
            name: '',
            sex: '',
            major: '',
            studentID: '',
            telephone: '',
            email: '',
            password: '',
            department: '',
            direction: '',
            learnedTechnique: '',
            learningExperience: '',
            hobbyAndAdvantage: ''
          }
      ),
      sexOptions: [
        {
          label: "男",
          value: "男"
        },
        {
          label: "女",
          value: "女"
        }
      ],
      departmentOptions: [
        {
          label: '运维部',
          value: 'devops'
        },
        {
          label: '秘书部',
          value: 'Secretariat'
        },
        {
          label: '技术部',
          value: 'technique'
        },
        {
          label: '宣传部',
          value: 'publicity'
        }
      ],
      directionOptions: [
        {
          label: 'Web安全与渗透测试（Web）',
          value: 'web'
        },
        {
          label: '逆向工程（Reverse）',
          value: 'reverse'
        },
        {
          label: '二进制漏洞审计（Pwn）',
          value: 'pwn'
        },
        {
          label: '密码学（Cryptography）',
          value: 'crypto'
        },
        {
          label: '安全杂项（Misc）',
          value: 'misc'
        },
        {
          label: '开发与运维（DevOps）',
          value: 'dev'
        }
      ],
      rules: {
        name: {
          required: true,
          trigger: ['input', 'blur'],
          validator: (rule: FormItemRule, value: string) => {
            if (!value) {
              return new Error('请输入你的姓名')
            } else if (value.length < 2 || value.length > 10) {
              return new Error('姓名应在2-10位之间')
            }
            return true
          }
        },
        sex: {
          message: '请选择你的性别',
          required: true,
        },
        major: {
          message: '请输入你的学院/专业',
          required: true
        },
        studentID: {
          required: true,
          trigger: ['input', 'blur'],
          validator: (rule: FormItemRule, value: string) => {
            if (!value) {
              return new Error('请输入你的学号');
            } else {
              const reg = /^\d{11}$/;
              if (!reg.test(value)) {
                return new Error('请输入有效的学号');
              }
            }
            return true;
          },
        },
        telephone: {
          required: true,
          trigger: ['input', 'blur'],
          validator: (rule: FormItemRule, value: string) => {
            if (!value) {
              return new Error('请输入你的手机号');
            } else {
              const reg = /^1(3\d|4[5-9]|5[0-35-9]|6[2567]|7[0-8]|8\d|9[0-35-9])\d{8}$/;
              if (!reg.test(value)) {
                return new Error('请输入有效的手机号码');
              }
            }
            return true;
          },
        },
        email: {
          required: true,
          trigger: ['input', 'blur'],
          validator: (rule: FormItemRule, value: string) => {
            if (!value) {
              return new Error('请输入你的邮箱');
            } else {
              const reg = /^[a-zA-Z\d.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z\d](?:[a-zA-Z\d-]{0,61}[a-zA-Z\d])?(?:\.[a-zA-Z\d](?:[a-zA-Z\d-]{0,61}[a-zA-Z\d])?)*$/;
              if (!reg.test(value)) {
                return new Error('请输入有效的邮箱地址');
              }
            }
            return true;
          },
        },
        nickName: {
          message: '给自己起一个别具一格的昵称吧',
          required: true,
        },
        password: {
          required: true,
          trigger: ['input', 'blur'],
          validator: (rule: FormItemRule, value: string) => {
            if (!value) {
              return new Error('请输入你的密码')
            }
            const reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,40}$/;
            if (!reg.test(value)) {
              return new Error('密码需要8-40位，并至少包含大写字母、小写字母、数字各一个')
            }
            return true
          }
        },
        department: {
          message: '请选择你的意向部门',
          required: true
        },
        direction: {
          message: '请选择你喜欢的学习方向',
          required: true
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
.join-card
  max-width: 650px
  margin: 2rem auto

</style>