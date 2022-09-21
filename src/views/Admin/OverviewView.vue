<template>
  <n-card title="用户信息统计" class="overview-card" hoverable>
    <n-grid cols="7">
      <n-gi>
        <n-tag :bordered="false" size="large" type="success">总数</n-tag>
      </n-gi>
      <n-gi>
        <n-statistic label="总人数" :value="userCount.total"/>
      </n-gi>
      <n-gi>
        <n-statistic label="管理" :value="userCount.admin"/>
      </n-gi>
      <n-gi>
        <n-statistic label="男" :value="userCount.male"/>
      </n-gi>
      <n-gi>
        <n-statistic label="女" :value="userCount.female"/>
      </n-gi>
    </n-grid>
    <n-divider/>
    <n-grid cols="7">
      <n-gi>
        <n-tag :bordered="false" size="large" type="success">部门</n-tag>
      </n-gi>
      <n-gi>
        <n-statistic label="运维部" :value="userCount.devops"/>
      </n-gi>
      <n-gi>
        <n-statistic label="技术部" :value="userCount.technique"/>
      </n-gi>
      <n-gi>
        <n-statistic label="宣传部" :value="userCount.publicity"/>
      </n-gi>
      <n-gi>
        <n-statistic label="秘书部" :value="userCount.secretariat"/>
      </n-gi>
    </n-grid>

    <n-divider/>
    <n-grid cols="7">
      <n-gi>
        <n-tag :bordered="false" size="large" type="success">方向</n-tag>
      </n-gi>
      <n-gi>
        <n-statistic label="Web" :value="userCount.web"/>
      </n-gi>
      <n-gi>
        <n-statistic label="Reverse" :value="userCount.reverse"/>
      </n-gi>
      <n-gi>
        <n-statistic label="Crypto" :value="userCount.crypto"/>
      </n-gi>
      <n-gi>
        <n-statistic label="Pwn" :value="userCount.pwn"/>
      </n-gi>
      <n-gi>
        <n-statistic label="Misc" :value="userCount.misc"/>
      </n-gi>
      <n-gi>
        <n-statistic label="Dev" :value="userCount.dev"/>
      </n-gi>
    </n-grid>
  </n-card>
</template>

<script lang="ts">
import {defineComponent, ref} from "vue";
import {getUserCount, UserCountResponse} from "@/api/user";

export default defineComponent({
  name: 'overview-view',
  setup() {
    return {
      userCount: ref({
        total: '',
        admin: '',
        male: '',
        female: '',
        web: '',
        reverse: '',
        pwn: '',
        crypto: '',
        misc: '',
        dev: '',
        secretariat: '',
        technique: '',
        devops: '',
        publicity: '',
      })
    }
  },
  mounted() {
    getUserCount().then((response: UserCountResponse) => {
      this.userCount.total = response.total.toString()
      this.userCount.admin = response.admin.toString()
      this.userCount.male = response.male.toString()
      this.userCount.female = response.female.toString()
      this.userCount.dev = response.dev.toString()
      this.userCount.web = response.web.toString()
      this.userCount.pwn = response.pwn.toString()
      this.userCount.crypto = response.crypto.toString()
      this.userCount.reverse = response.reverse.toString()
      this.userCount.misc = response.misc.toString()
      this.userCount.devops = response.devops.toString()
      this.userCount.publicity = response.publicity.toString()
      this.userCount.secretariat = response.publicity.toString()
      this.userCount.technique = response.technique.toString()
    })
  }
})

</script>

<style lang="sass">
.overview-card
  font-weight: bold
  max-width: 800px
  margin: 2rem auto
  border: aqua
</style>