<template>
  <div>
    <div class="container">
      <h2>人脸信息采集</h2>
    </div>
    <div class="container">
      <img :src="imageBase64" class="image">
    </div>
    <div class="container">
      <el-alert
        title="恭喜您信息上传成功~"
        type="success"
        class="tip"
        :closable="false"
        show-icon>
      </el-alert>
    </div>
    <div class="container">
      <!--<el-button type="danger" plain @click="reset" size="mini">重置</el-button>-->
    </div>

  </div>
</template>

<script>


  export default {
    data() {
      return {
        user: {},
      }
    },
    computed: {
      imageBase64() {
        return this.user.image ? 'data:image/jpeg;base64,' + this.user.image : ''
      }
    },
    methods: {
      reset() {
        this.$confirm('此操作将删除该用户上传的人脸信息, 是否继续?', '确认重置').then(() => {
          this.$http.post('/face/reset/' + this.$route.query.region + '/' + this.$route.params.userid).then(() => {
            this.$message.success('重置成功,请重新上传')

          })
        }).catch(console.log)
      },
    },
    mounted() {
      this.$http.post('/users/' + this.$route.params.userid).then((r) => {
        this.user = r.data
      })
    },

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .container {
    display: flex;
    justify-content: center;
    margin: 20px 0;
  }
  .center{
  }
  .container .el-alert--success {
    background-color: transparent;
  }

  .image {
    border-radius: 50%;
    width: 100px;
    height: 100px;
  }

  .tip {
    width: 200px;
  }
</style>
