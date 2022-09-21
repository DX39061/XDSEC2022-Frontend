<template>
  <n-result status="403" title="403 禁止访问" description="总有些门是对你关闭的">
    <template #footer>
      <n-button @click="clickHandler">放轻松</n-button>
    </template>
  </n-result>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: 'forbiddenView',
  methods: {
    clickHandler() {
      this.$router.push('/')
    }
  }
})
</script>

<style scoped>

</style>