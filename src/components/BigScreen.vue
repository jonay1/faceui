<template>
  <div>
    <el-tabs value="first">
      <el-tab-pane label="人员签到" name="first">
        <div class="container">
          <transition-group name="flip-list" tag="div">
            <div v-for="item in data" :key="item.phone" class="item">
              <UserInfo :data="item"/>
              <!--<el-tag :type="item.signed?'danger':'info'">{{item.phone}}-{{item.name}}</el-tag>-->
            </div>

          </transition-group>
        </div>
      </el-tab-pane>
      <el-tab-pane disabled>
        <span slot="label">已签到人数/总人数：<span class="red">{{signedNum}}</span>/{{this.data.length}}</span>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import SockJS from 'sockjs-client'
  import Stomp from 'stompjs'
  import UserInfo from '@/components/UserInfo'
  export default {
    components:{
      UserInfo
    },
    data() {
      return {
        data: [],
      }
    },
    methods: {
      doSign(body) {
        let rs = JSON.parse(body)
        let user = this.data.find(v => v.phone == rs.phone)
        if (!user.signed) {
          user.signed = true
          let i = this.data.indexOf(user);
          this.data.splice(i, 1)
          this.data.unshift(user)
        }
      }
    },
    computed: {
      signedNum() {
        return this.data.filter(v => v.signed).length
      }
    },
    mounted() {
      this.$http.post('/list/' + (this.$route.params.region || 'SH')).then((r) => {
        this.data = r.data || []
      })

      let socket = new SockJS('/stomp');
      let stompClient = Stomp.over(socket);
      stompClient.connect({}, (frame) => {
        stompClient.subscribe('/topic/sign/' + (this.$route.params.region || 'SH'), ({body}) => {
          this.doSign(body)
        });
        console.log('connect to ws')
      })
      this.client = stompClient
    },
    beforeDestroy() {
      this.client && this.client.disconnect()
    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .container > div {
    display: flex;
    flex-wrap: wrap;
  }

  .container .item {
    padding: 10px;
  }

  .flip-list-move {
    transition: transform 1s;
  }

  .red {
    color: red;
  }
</style>
