<template>
  <div class="container">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>组</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="line"></div>
    <el-button v-for="(g,index) in groups" :key="index" type="primary" plain @click="showUser(g)">{{g}}</el-button>
  </div>
</template>

<script>
  export default {
    name: "Groups",
    data() {
      return {
        groups: []
      }
    },
    methods: {
      showUser(g) {
        this.$router.push('/admin/groups/' + g)
      }
    },
    mounted() {
      this.$http.get('/api/groups').then((r) => {
        this.groups = r.data
      })
    }
  }
</script>

<style scoped>
  .container {
    padding: 10px;
  }

  .line {
    border-top: 1px solid #409EFF;
    margin: 10px 0;
  }
</style>
