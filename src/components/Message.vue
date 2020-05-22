<template>
  <div class="message">{{title}}</div>
</template>
<script>
export default {
  props: {
    status: {
      type: Number,
      default: 200
    }
  },
  data() {
    return {
      title: '登录成功'
    }
  },
  watch: {
    status(val) {
      if (val === 200) {
        this.title = '登录成功'
      }
      if (val === 202) {
        this.title = '登录失败，错误代码202'
      }
    }
  }
}
</script>
<style lang="less" scoped>
.message {
  width: 200px;
  height: 50px;
  position: absolute;
  z-index: 999;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  background-color: aliceblue;
  text-align: center;
  line-height: 50px;
}
</style>