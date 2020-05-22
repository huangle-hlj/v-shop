import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
//导入全局样式表
import './assets/css/global.css'
//引入axios
import axios from 'axios'
//配置请求根路径
axios.defaults.baseURL = 'http://localhost:8088/'
//把axios挂载到全局
Vue.prototype.$axios = axios

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
