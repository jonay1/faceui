<template>
  <div class="container">
    <div class="login">
      <el-input placeholder="员工号" prefix-icon="el-icon-message" v-model="user.username" maxlength="5"
                autofocus="true"></el-input>
      <el-input placeholder="密码" prefix-icon="el-icon-star-off" v-model="user.password" maxlength="20"
                type="password"></el-input>
      <div>
        <el-button type="primary" @click="doLogin" :loading="logining">登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        user: {},
        logining: false
      }
    },
    methods: {
      doLogin() {
        this.logining = true
        this.$http.post('/login', this.user).then(rs => {
          if (rs.data) {
            sessionStorage.userid = rs.data.userid
            let r = this.$route.query.redirect
            this.$router.push(r || '/collect')
          } else {
            this.$message.error('用户名或密码不正确')
            this.user.password = ''
            this.logining = false
          }
        })
      }
    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .container {
    display: flex;
    justify-content: center;
  }

  .login {
    margin-top: 100px;
    width: 300px;
  }

  .login > div {
    margin: 10px 0;
  }

  .login button {
    width: 100%;
  }

</style>
