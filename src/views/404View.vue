<template>
  <n-result status="404" title="404 资源不存在" description="生活总归带点荒谬">
    <template #footer>
      <n-button @click="clickHandler">找点乐子吧</n-button>
    </template>
  </n-result>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: "404View",
  methods: {
    clickHandler() {
      this.$router.push('/')
    }
  }
})
</script>

<style scoped>

</style>