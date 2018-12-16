// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

import Element from 'element-ui'
Vue.use(Element)
import 'element-ui/lib/theme-chalk/index.css';

import './assets/public.css'
import { DIYtoast } from './utils/tool'
Vue.prototype.$DIY = DIYtoast
/* eslint-disable no-new */

//注册自定义组件
import jIt from './components/common/tol/jit.js'
Vue.use(jIt)

import { Imgurl } from './utils/env'
Vue.prototype.$logo = Imgurl



import store from './store/store'
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
