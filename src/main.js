import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// import mammoth  from 'mammoth'

// 图标：
import * as ElementPlusIconsVue from '@element-plus/icons-vue'


import request from './utils/request'
import storage from './utils/storage'
import api from './api'

// 重置css样式
import './assets/style/reset.css'
// 书写全局的css样式
import './assets/style/index.css'

// 查看环境变量：
// console.log('环境变量：', import.meta.env);

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// 全局挂载：
app.config.globalProperties.$request = request
app.config.globalProperties.$storage = storage
app.config.globalProperties.$api = api
// app.config.globalProperties.$mammoth = mammoth

app
  .use(ElementPlus, {size: 'small'})
  .use(router)
  .use(store)
  .mount('#app')