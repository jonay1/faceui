<template>
  <div>
    <div class="container">
      <h2>人脸信息采集</h2>
    </div>
    <el-form ref="form" :model="form" :rules="rules" class="form">
      <el-form-item required prop="phone">
        <el-input v-model="form.phone" minlength="11" maxlength="11" placeholder="手机号" autofocus></el-input>
      </el-form-item>
      <el-form-item required prop="name">
        <el-input v-model="form.name" placeholder="姓名"></el-input>
      </el-form-item>
      <el-form-item required prop="region">
        <el-select v-model="form.region" placeholder="请选择年会区域">
          <el-option-group label="年会区域">
            <el-option label="上海" value="SH"></el-option>
            <!--<el-option label="北京" value="BJ"></el-option>-->
          </el-option-group>
        </el-select>
      </el-form-item>
      <el-form-item required prop="image">
        <el-upload
          ref="upload"
          action="/backend/upload"
          list-type="picture-card"
          :limit="1"
          :data="form"
          :auto-upload="false"
          :on-change="onFileChange"
          :on-remove="onFileRemove"
          :on-success="onUploadSuccess">
          <i class="el-icon-plus"></i>
        </el-upload>
        <!--{{form}}-->
      </el-form-item>
      <div class="btn-bar">
        <el-button type="primary" @click="onSubmit" :loading="loading">提&nbsp;&nbsp;&nbsp;&nbsp;交</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: "Collect",
    data() {
      return {
        loading: false,
        form: {
          region: 'SH',
          image: undefined
        },
        rules: {
          phone: [{
            required: true, message: '请输入手机号',
            validator: (rule, value, callback) => {
              /^1[34578]\d{9}$/.test(value) ? callback() : callback(new Error('手机格式不正确'))
            }
          }],
          name: [{
            required: true, message: '请输入姓名',
            validator: (rule, value, callback) => {
              /^[^\x00-\xff]{2,5}/.test(value) ? callback() : callback(new Error('姓名不合法'))
            }
          }],
          region: [{
            required: true, message: '请选择区域'
          }],
          image: [{
            required: true, message: '请上传图片'
          }]
        }
      }
    },
    methods: {
      onFileChange() {
        this.form.image = true
      },
      onFileRemove() {
        this.form.image = undefined
      },
      onUploadSuccess(response, file, fileList) {
        if (response == -1) {
          this.$message.warning('提交失败,请确图片中存在头像')
        } else {
          if (response == 1) {
            // this.$message.warning('不要重复提交')
          } else {
            // this.$message.success('恭喜您信息上传成功')
          }
          this.form.image = file.url;
          this.$router.push({path: '/collect-result/' + this.form.phone, query: {region: this.form.region}})
        }
        this.loading = false
      },
      onSubmit() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.loading = true
            this.$refs.upload.submit()
          } else {
            return false;
          }
        })

      }
    }
  }
</script>

<style scoped>
  .container {
    display: flex;
    justify-content: center;
    margin: 20px 0;
  }

  .form {
    padding: 20px;
  }

  .btn-bar {
    text-align: center;
  }

  .btn-bar button {
    width: 100%;
  }
</style>
