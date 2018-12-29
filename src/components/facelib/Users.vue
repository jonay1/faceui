<template>
  <div class="container">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/web/groups' }">组</el-breadcrumb-item>
      <el-breadcrumb-item>用户</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="line"></div>
    <el-table :data="data2">

      <el-table-column type="index" width="50">
      </el-table-column>
      <el-table-column label="手机号" prop="uid" width="200">
      </el-table-column>
      <el-table-column>
        <template slot="header" slot-scope="scope">
          <el-input v-model="q" placeholder="输入关键字搜索"/>
        </template>
        <template slot-scope="scope">
          <el-button
            size="mini" icon="el-icon-edit"
            @click="handleEdit(scope.$index, scope.row)">Edit
          </el-button>
          <el-button
            size="mini"
            type="danger" icon="el-icon-delete"
            @click="handleDelete(scope.$index, scope.row)">Delete
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>

  export default {
    name: "Groups",
    data() {
      return {
        data: [],
        q: ''
      }
    },
    methods: {
      handleEdit(i, data) {

      },
      handleDelete(i, data) {
        this.$confirm('此操作将永久删除该用户及人脸数据, 是否继续?', '确认删除').then(() => {
          this.$http.post('/api/deluser', data).then((r) => {
            this.data2.splice(i, 1) && this.$message.success('删除[' + data.uid + ']成功')
          })
        }).catch(console.log)

      }
    },
    computed: {
      data2() {
        let q = this.q;
        if (q) {
          let filtered = this.data.filter((item) => {
            return item.uid.indexOf(q) > -1
          })
          return filtered;
        } else {
          return this.data
        }
      }
    },
    mounted() {
      this.$http.post('/api/groups/' + this.$route.params.id).then((r) => {
        this.data = r.data.sort().map((uid) => {
          return {gid: this.$route.params.id, uid}
        })
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
