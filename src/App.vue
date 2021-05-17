<template>
  <div id="app">
    <peace-header></peace-header>
    <router-view></router-view>
    <peace-footer></peace-footer>
  </div>
</template>
<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
export default {
  components: {
    'peace-header': Header,
    'peace-footer': Footer
  }
}
</script>
<style lang="scss">
@import "assets/layui/css/layui.css";
@import "assets/css/global.css";
@import "assets/layui/css/modules/layer/default/layer.css";
</style>
