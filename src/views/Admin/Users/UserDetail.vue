<template>
  <div>
    <n-card title="用户报名信息" class="user-detail-card" hoverable>
      <n-form
          style="text-align: left"
          ref="formRef"
          :model="formValue"
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
        <n-space justify="space-between">
          <n-form-item label="昵称" path="nickName">
            <n-input v-model:value="formValue.nickName" placeholder="请输入你的昵称" style="min-width: 250px"/>
          </n-form-item>
          <n-form-item label="QQ" path="qq">
            <n-input v-model:value="formValue.qq" placeholder="请输入你的QQ号" style="min-width: 250px"/>
          </n-form-item>
          <n-form-item label="admin" path="admin">
            <n-checkbox v-model:checked="formValue.admin"/>
          </n-form-item>
        </n-space>
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
          <n-form-item label="MoeCTF信息">
            <a v-bind:href="formValue.href">MoeCTF平台个人页</a>
          </n-form-item>
          <n-form-item label="MoeCTF得分">
            <n-text style="min-width: 250px">{{ formValue.score }}</n-text>
          </n-form-item>
        </n-space>
        <n-space justify="space-between">
          <n-button size="large" @click="updateUserProfileHandler">更新信息</n-button>
        </n-space>


      </n-form>
    </n-card>
  </div>

</template>

<script lang="ts">
import {FormInst} from 'naive-ui'
import {defineComponent, ref} from 'vue'
import {
  getUserDetail,
  getUserGameInfo,
  updateUserProfile,
  UpdateUserProfileRequest,
  UserDetailResponse, UserGameResponse
} from "@/api/user";
import router from "@/router";

export default defineComponent({
  name: 'user-detail-view',
  methods: {
    updateUserProfileHandler() {
      window.$message.loading('正在更新，请稍候...')
      const updateUserProfileRequest: UpdateUserProfileRequest = {
        admin: this.formValue.admin,
        'nick-name': this.formValue.nickName,
        name: this.formValue.name,
        sex: this.formValue.sex,
        major: this.formValue.major,
        'student-id': this.formValue.studentID,
        telephone: this.formValue.telephone,
        qq: this.formValue.qq,
        email: this.formValue.email,
        department: this.formValue.department,
        direction: this.formValue.direction,
        'learned-technique': this.formValue.learnedTechnique,
        'learning-experience': this.formValue.learningExperience,
        'hobby-and-advantage': this.formValue.hobbyAndAdvantage
      }
      // console.log(updateUserProfileRequest)
      updateUserProfile(this.formValue.id, updateUserProfileRequest).then(() => {
        window.$message.destroyAll()
        window.$message.success('更新成功')
      }).catch((err: Error) => {
        window.$message.destroyAll()
        window.$message.error('更新失败' + err.message)
      }).finally(() => {
        router.push('/admin/users/' + this.formValue.id)
      })
    },
  },
  setup() {
    const formRef = ref<FormInst | null>(null)
    return {
      formRef,
      formValue: ref({
            id: 0,
            admin: false,
            nickName: '',
            name: '',
            sex: '',
            major: '',
            studentID: '',
            telephone: '',
            qq: '',
            email: '',
            department: '',
            direction: '',
            learnedTechnique: '',
            learningExperience: '',
            hobbyAndAdvantage: '',
            'game-id': 0,
            href: '',
            score: -1
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
          label: '开发与运维（Dev）',
          value: 'dev'
        }
      ],

    }
  },
  mounted() {
    //window.$message.loading('正在获取报名信息，请稍候...')
    const userID = this.$route.params.id
    if (typeof userID === 'string') {
      getUserDetail(parseInt(userID)).then((resp: UserDetailResponse) => {
        this.formValue.id = resp.id
        this.formValue.admin = resp.admin
        this.formValue.nickName = resp["nick-name"]
        this.formValue.name = resp.name
        this.formValue.sex = resp.sex
        this.formValue.major = resp.major
        this.formValue.studentID = resp["student-id"]
        this.formValue.telephone = resp.telephone
        this.formValue.qq = resp.qq
        this.formValue.email = resp.email
        this.formValue.direction = resp.direction
        this.formValue.department = resp.department
        this.formValue.learnedTechnique = resp["learned-technique"]
        this.formValue.learningExperience = resp["learning-experience"]
        this.formValue.hobbyAndAdvantage = resp["hobby-and-advantage"]
        //window.$message.destroyAll()
        window.$message.success('获取报名信息成功')
      }).catch((err: Error) => {
        //window.$message.destroyAll()
        window.$message.error('获取报名信息失败 ' + err.message)
      })
      getUserGameInfo(parseInt(userID)).then((resp: UserGameResponse) => {
        //window.$message.destroyAll()
        window.$message.success('获取MoeCTF信息成功')
        this.formValue["game-id"] = resp.id
        this.formValue.href = `https://ctf.xidian.edu.cn/admin/users/${resp.id}`
        this.formValue.score = resp.score
      }).catch((err: Error) => {
        //window.$message.destroyAll()
        window.$message.error('未获取到用户MoeCTF信息 ' + err.message)
      })
    }

  }
})
</script>

<style lang="sass">
.user-detail-card
  max-width: 650px
  margin: 2rem auto

</style>