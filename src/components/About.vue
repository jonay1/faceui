<template>
  <div class="container">
    <h1>Hello!</h1>
    <small>人脸应用场景之一：签到</small>
    <hr>
    <div>
      <router-link to="/collect">第一步：人脸信息采集</router-link>
    </div>
    <div>
      <router-link to="/signing">第二步：人脸签到</router-link>
    </div>
    <div>
      <router-link to="/showing">第三步：签到信息展示</router-link>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {}
    },
    methods: {}

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .container {
  }
</style>
