import Vue from 'vue'
import Router from 'vue-router'
import routes from './router/index.js'
import store from './store/' // 引入index
import { routerMode } from './config/env'
// ajax
import Axios from './plugins/axios.js';
// import Vuex from 'vuex';
// 移动端click屏幕产生200-300 ms的延迟响应
import FastClick from 'fastclick'
if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function () {
    FastClick.attach(document.body);
  }, false);
}
// 适配 两种实现方式：
//1.js resize  clientWidth  
//2. sass media
import './config/rem'

Vue.config.productionTip = false

// 安装插件
import { Swipe, SwipeItem } from 'mint-ui';

Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.use(Axios);
// Vue.use(Vuex);
Vue.use(Router);

// 原始的写法
// const store = new Vuex.Store({
//   state: {
//     count: 0
//   },
//   mutations: {
//     increment (state) {
//       state.count++
//     }
//   }
// })
// modules 的写法
// const store = new Vuex.Store({
//   // modules:{
//   //     shopCart
//   // }
// })

const router = new Router({
  routes, // routes:routes es6属性赋值简写 
  //默认值: "hash" (浏览器环境) | "abstract" (Node.js 环境)
	//可选值: "hash" | "history" | "abstract"
  mode: routerMode,
  // 严格模式会深度监测状态树来检测不合规的状态变更——
  //确保在发布环境下关闭严格模式，以避免性能损失。
  strict: process.env.NODE_ENV !== 'production',
  // 默认当匹配路由以后，外部a标签所添加的类名
  // linkActiveClass: 'active',
})

// 添加路由规则
// router.addRoutes([
//   { path: '/', component:App },
//   { path: '/home', component: home },
// ])


new Vue({
  router,
  store,
  // render: c => c(App)
}).$mount('#app')

