<template>
  <div>
    <div class="container">
      <h2>人员签到</h2>
    </div>
    <div class="container">
      <div class="facewin">
        <video ref="video" muted width="400" height="300"></video>
        <canvas ref="canvas" width="400" height="300"></canvas>
      </div>
    </div>
    <div class="container">
      <div class="bar"><i class="el-icon-loading"></i>{{tip}}</div>
      <!--<el-button @click="test">test</el-button>-->
    </div>
    <div class="container" v-for="item in data" :key="item.phone">
      <el-alert :title="'恭喜 '+item.name+' 签到成功'"
                type="success"
                class="alert"
                :closable="false"
                show-icon>
      </el-alert>
    </div>
  </div>
</template>

<script>
  import 'tracking'
  import 'tracking/build/data/eye'
  import SockJS from 'sockjs-client'
  import Stomp from 'stompjs'
  import _ from '../lib/util'

  function testing(v) {
    v.tip = "识别中......"
    v.context.drawImage(v.$refs.video, 0, 0, 400, 300);
    v.$http.post('/sign/' + (v.$route.params.region || 'SH'), {
      image: v.canvas.toDataURL('image/jpeg')
    }).then((r) => {
      let data = r.data
      if (data) {
        v.tip = "识别成功:" + data.name
      }
    })
  }

  export default {
    data() {
      return {
        data: [],
        user: {},
        tip: '准备中...'
      }
    },
    methods: {
      test() {
        this.doSign('{"name":"test' + Math.random() + '"}')
      },
      initTracker() {
        let video = this.$refs.video
        let canvas = this.$refs.canvas
        let context = canvas.getContext('2d')
        let tracker = new tracking.ObjectTracker('eye');
        // tracker.setInitialScale(1);
        // tracker.setStepSize(2);
        // tracker.setEdgesDensity(0.1);
        let trackTask = tracking.track(video, tracker);
        this.tip = '识别中...'

        let that = this
        tracker.on('track', function (event) {
          context.clearRect(0, 0, canvas.width, canvas.height);
          _.loop(function () {
            testing(that)
          }, 2000)
        });
        this.canvas = canvas
        this.context = context
        this.tracker = tracker
      },
      doSign(body) {
        let user = JSON.parse(body)
        if (this.data.findIndex(v => v.phone == user.phone) == -1) {
          this.data.push(user)
          this.data.length > 5 && this.data.shift()
        }
      }
    },
    mounted() {

      let socket = new SockJS('/stomp');
      let stompClient = Stomp.over(socket);
      stompClient.connect({}, (frame) => {
        stompClient.subscribe('/topic/sign/' + (this.$route.params.region || 'SH'), ({body}) => {
          this.doSign(body)
        });
        console.log('connect to ws')
      })
      this.client = stompClient

      _.initMedia(this.$refs.video)
      this.initTracker()

    },
    beforeDestroy() {
      console.log('beforeDestroy')
      this._t && cancelAnimationFrame(this._t)
      this.tracker.removeAllListeners()
      _.destroyMedia(this.$refs.video)
    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .container {
    display: flex;
    justify-content: center;
  }

  .facewin {
    width: 400px;
    height: 300px;
    position: relative;
    box-sizing: border-box;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
    border-radius: 5px;
  }

  .facewin > video, .facewin > canvas {
    position: absolute;
    left: 0;
    top: 0;
  }

  .bar {
    font-size: 12px;
    color: #409EFF;
    padding-top: 10px;
  }

  .alert {
    width: 400px;
  }

  .alert.el-alert--success {
    background-color: transparent !important;
  }
</style>
