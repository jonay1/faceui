<template>
  <div>

    <div class="container" :class="{highlight:data.signed}">
      <div class="image">
        <img :src="'data:image/jpeg;base64,'+data.image"/>
      </div>
      <div class="info">
        <div class="name">{{data.name}}</div>
        <div class="phone">{{data.phone}}</div>
      </div>
      <label class="check">
        <i class="el-icon-upload-success el-icon-check"></i>
      </label>
    </div>

  </div>
</template>

<script>
  export default {
    name: "UserInfo",
    data() {
      return {}
    },
    props: {
      data: {}
    }
  }
</script>

<style scoped>

  .container {
    display: flex;
    padding: 5px 20px 0px 5px;
    border-radius: 5px;
    box-shadow: 1px 1px 2px gray;
    position: relative;
    overflow: hidden;
  }

  img, .check, .info {
    transition: all 1s;
  }

  .image > img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    filter: grayscale(100%);

  }

  .info {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding-left: 10px;
    color: lightgray;
  }

  .highlight {
    background-color: #F2F6FC;
  }

  .check {
    color: white;
    font-size: 12px;
    position: absolute;
    right: -17px;
    top: -7px;
    width: 46px;
    height: 26px;
    text-align: center;
    transform: rotate(45deg);
    box-shadow: 0 1px 1px #ccc;
    background: #13ce66;
    opacity: 0;
  }

  .check i {
    margin-top: 12px;
    transform: rotate(-45deg);

  }

  .highlight .check {
    opacity: 1;
  }

  .highlight img {
    filter: none;
  }

  .highlight .info {
    color: #000000;
  }

</style>
