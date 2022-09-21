<template>
  <div>
    <n-space justify="space-around">
      <n-card title="用户报名信息" class="user-detail-card" hoverable>
        <n-form
            style="text-align: left"
            ref="formRef"
            :model="formValue"
        >
          <n-space justify="space-between">
            <n-form-item label="姓名" path="name">
              <n-text style="min-width: 250px">{{ formValue.name }}</n-text>
            </n-form-item>
            <n-form-item label="性别" path="sex">
              <n-text style="min-width: 250px">{{ formValue.sex }}</n-text>
            </n-form-item>
          </n-space>
          <n-space justify="space-between">
            <n-form-item label="学院/专业" path="major">
              <n-text style="min-width: 250px">{{ formValue.major }}</n-text>
            </n-form-item>
            <n-form-item label="学号" path="studentID">
              <n-text style="min-width: 250px">{{ formValue.studentID }}</n-text>
            </n-form-item>
          </n-space>
          <n-space justify="space-between">
            <n-form-item label="手机" path="telephone">
              <n-text style="min-width: 250px">{{ formValue.telephone }}</n-text>
            </n-form-item>
            <n-form-item label="邮箱" path="email">
              <n-text style="min-width: 250px">{{ formValue.email }}</n-text>
            </n-form-item>
          </n-space>
          <n-space justify="space-between">
            <n-form-item label="昵称" path="nickName">
              <n-text style="min-width: 250px">{{ formValue.nickName }}</n-text>
            </n-form-item>
          </n-space>
          <n-space justify="space-between">
            <n-form-item label="意向部门" path="department">
              <n-text style="min-width: 250px">{{ formValue.department }}</n-text>
            </n-form-item>
            <n-form-item label="学习方向" path="direction">
              <n-text style="min-width: 250px">{{ formValue.direction }}</n-text>
            </n-form-item>
          </n-space>
          <n-form-item label="技术基础">
            <n-text style="min-width: 250px">{{ formValue.learnedTechnique }}</n-text>
          </n-form-item>
          <n-form-item label="学习经历">
            <n-text style="min-width: 250px">{{ formValue.learningExperience }}</n-text>
          </n-form-item>
          <n-form-item label="爱好特长">
            <n-text style="min-width: 250px">{{ formValue.hobbyAndAdvantage }}</n-text>
          </n-form-item>
          <n-space justify="space-between">
            <n-form-item label="MoeCTF信息">
              <a v-bind:href="formValue.href">MoeCTF平台个人页</a>
            </n-form-item>
            <n-form-item label="MoeCTF得分">
              <n-text style="min-width: 250px">{{ formValue.score }}</n-text>
            </n-form-item>
          </n-space>

        </n-form>
      </n-card>
      <n-card title="用户面试记录" class="interview-detail-card" hoverable>
        <n-tabs
            type="card"
            size="large"
            addable
            closable
            tab-style="min-width: 80px;"
            @add="addTabHandler"
            @close="closeTabHandler"
            @update:value="tabChangeHandler"
        >
          <n-tab-pane v-for="panel in panels" :key="panel.tabName" :name="panel.tabName">
            <n-form
                style="text-align: left"
                ref="panelsRef"
                :model="panel.data"
            >
              <n-form-item>
                <n-checkbox v-model:checked="panel.data.pass">通过</n-checkbox>
              </n-form-item>
              <n-form-item label="记录">
                <n-input
                    v-model:value="panel.data.record"
                    type="textarea"
                    size="large"
                    rows="10"
                />
              </n-form-item>
              <n-form-item>
                <n-button @click="updateInterviewHandler">更新面试记录</n-button>
              </n-form-item>
            </n-form>
          </n-tab-pane>
          <template #prefix>
            轮次
          </template>
        </n-tabs>
      </n-card>
    </n-space>
  </div>

</template>

<script lang="ts">
import {FormInst} from 'naive-ui'
import {defineComponent, ref} from 'vue'
import {getUserDetail, getUserGameInfo, UserDetailResponse, UserGameResponse} from "@/api/user";
import {
  createInterview,
  CreateInterviewRequest,
  deleteInterview,
  getInterviewDetailOfUser,
  InterviewDetailResponse, updateInterview, UpdateInterviewRequest
} from '@/api/interview';

export default defineComponent({
  name: 'interview-detail-view',
  methods: {
    addTabHandler() {
      if (this.panels.length >= 4) {
        return {disabled: true}
      }
      const createInterviewRequest: CreateInterviewRequest = {
        round: this.panels.length + 1,
        pass: false,
        record: '',
        'interviewer-id': this.interviewInfo.interviewerID,
        'interviewee-id': this.interviewInfo.intervieweeID
      }
      //window.$message.loading('正在新建面试信息，请稍候...')
      createInterview(createInterviewRequest).then(() => {
        //window.$message.destroyAll()
        window.$message.success('已新建面试信息')
        location.reload()
      }).catch((err: Error) => {
        //window.$message.destroyAll()
        window.$message.error('新建面试信息失败 ' + err.message)
      })
    },
    closeTabHandler(value: number) {
      window.$dialog.warning({
        title: '确定要删除这个面试记录吗？',
        content: '删除本记录后，请把序号大于它的记录都删除再重新添加，不然轮次记录会出错',
        positiveText: '删就完了',
        negativeText: '还是算了',
        onPositiveClick: () => {
          //window.$message.loading('正在删除面试信息')
          deleteInterview(this.panels[value-1].data.id).then(() => {
            //window.$message.destroyAll()
            window.$message.success('删除面试信息成功')
            location.reload()
          }).catch((err: Error) => {
            //window.$message.destroyAll()
            window.$message.error('删除面试记录失败 ' + err.message)
          })
          return true
        },
        onNegativeClick: () => {
          window.$message.info('取消删除面试信息')
          return false
        }
      })
    },
    updateInterviewHandler() {
      //window.$message.loading('正在更新面试信息，请稍候...')
      const updateInterviewRequest: UpdateInterviewRequest = {
        pass: this.panels[this.nowTab].data.pass,
        record: this.panels[this.nowTab].data.record
      }
      updateInterview(this.panels[this.nowTab].data.id, updateInterviewRequest).then(() => {
        //window.$message.destroyAll()
        window.$message.success('更新面试信息成功')
      }).catch((err: Error) => {
        window.$message.error('更新面试信息失败 ' + err.message)
      })
    },
    tabChangeHandler(value: number) {
      this.nowTab = value - 1
      //window.$message.success(value.toString())
    }
  },
  setup() {
    const formRef = ref<FormInst | null>(null)
    const panelsRef = ref<FormInst | null>(null)
    const tabCount = 0
    const nowTab = 0
    const interviewInfo = {
      interviewerID: 0,
      intervieweeID: 0,
    }
    return {
      tabCount,
      nowTab,
      interviewInfo,
      showModel: ref(true),
      panelsRef,
      panels: ref([{
        tabName: 0,
        data: {
          id: 0,
          round: 0,
          "updated-at": new Date(),
          pass: false,
          record: '',
          interviewer: '',
          interviewee: ''
        }
      }]),
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
    }
  },
  mounted() {
    //window.$message.loading('正在获取报名信息，请稍候...')
    const userID = this.$route.params.user
    const x = localStorage.getItem('user-id')
    if (x != null) {
      this.interviewInfo.interviewerID = parseInt(x)
    }
    if (typeof userID === 'string') {
      this.interviewInfo.intervieweeID = parseInt(userID)
      getUserDetail(parseInt(userID)).then((resp: UserDetailResponse) => {
        this.formValue.id = resp.id
        this.formValue.admin = resp.admin
        this.formValue.nickName = resp["nick-name"]
        this.formValue.name = resp.name
        this.formValue.sex = resp.sex
        this.formValue.major = resp.major
        this.formValue.studentID = resp["student-id"]
        this.formValue.telephone = resp.telephone
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
      //window.$message.loading('正在获取面试信息，请稍候...')
      getInterviewDetailOfUser(parseInt(userID)).then((resp: InterviewDetailResponse[]) => {
        //window.$message.destroyAll()
        window.$message.success('获取面试信息成功')
        this.panels.length = 0
        for (const interview of resp) {
          this.panels.push({
            tabName: this.panels.length + 1,
            data: interview,
          })
        }
      }).catch((err: Error) => {
        //window.$message.destroyAll()
        window.$message.error('获取面试信息失败 ' + err.message)
        this.panels.length = 0
      })
    }

  }
})
</script>

<style lang="sass">
.user-detail-card
  max-width: 650px
  margin: 2rem auto

.interview-detail-card
  min-width: 800px
  margin: 2rem auto
</style>