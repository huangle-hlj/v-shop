<template>
  <div class="login_container">
    <div class="log_box">
      <!-- 头像 -->
      <div class="log">
        <img src="../assets/logo.png" alt />
      </div>
      <!-- 表单 -->
      <el-form ref="loginFormRef" :model="form" :rules="rules" class="form">
        <!-- 用户名 -->
        <el-form-item prop="name">
          <el-input v-model="form.name" prefix-icon="el-icon-user-solid" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="pass">
          <el-input
            show-password
            v-model="form.pass"
            prefix-icon="el-icon-s-goods"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item class="button">
          <el-button type="primary" @click="loginIn">登陆</el-button>
          <el-button type="info" @click="resetLoginFrom">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <transition name="scal">
      <message v-show="active" :status="status" :class="{active}"></message>
    </transition>
  </div>
</template>
<script>
import message from '../components/Message'
export default {
  components: {
    message
  },
  data() {
    return {
      active: false,
      status: 200,
      form: {
        name: '',
        pass: ''
      },
      rules: {
        name: [
          { required: true, massage: '请输入用户名', trigger: 'blur' },
          { min: 1, max: 5, massage: '用户名应在1-5', trigger: 'blur' }
        ],
        pass: [{ required: true, massage: '请输入密码', trigger: 'blur' }]
      }
    }
  },
  methods: {
    resetLoginFrom() {
      this.$refs.loginFormRef.resetFields()
    },
    loginIn() {
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) return
        var result = await this.$axios.get('users/login', {
          params: {
            username: this.form.name,
            pass: this.form.pass
          }
        })
        if (result.status === 202) {
          this.status = 202
          this.active = !this.active
          setTimeout(() => {
            this.active = !this.active
          }, 2000)
        }
        if (result.status === 200) {
          this.$message.success('登录成功')
          window.sessionStorage.setItem('token', '123')
          this.$router.replace('/home')
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.login_container {
  background-color: #2b4b6b;
  height: 100%;
  .log_box {
    width: 450px;
    height: 300px;
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    .log {
      width: 130px;
      height: 130px;
      border-radius: 50%;
      background-color: #fff;
      position: absolute;
      top: -20%;
      left: 50%;
      transform: translateX(-50%);
      padding: 10px;
      border: 1px solid #eee;
      box-shadow: 0 0 10px #ddd;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: #eee;
      }
    }
    .form {
      margin: 100px auto;
      width: 80%;
      .button {
        position: absolute;
        right: 10%;
        bottom: 20px;
      }
    }
  }
}
.active {
  display: block;
}
.scal-enter {
  transform: scale(0.1);
}
.scal-enter-active {
  transition: all 0.5s linear;
}
.scal-enter-to {
  transform: scale(1);
}
</style>