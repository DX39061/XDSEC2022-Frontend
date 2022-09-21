<template>
    <navigation-bar/>
  <div id="pages">
    <n-message-provider>
      <n-notification-provider>
        <n-dialog-provider>
          <wrapped-content/>
        </n-dialog-provider>
      </n-notification-provider>
    </n-message-provider>
  </div>
</template>

<script lang="ts">
import WrappedContent from "@/views/WrappedContent.vue";
import NavigationBar from "@/components/NavigationBar.vue";
import setupWithToken from "@/api/token";
export default {
  components: {NavigationBar, WrappedContent},
  setup() {
    setupWithToken()
  },
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>